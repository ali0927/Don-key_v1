import BigNumber from "bignumber.js";
import {
  BINANCE_CHAIN_ID,
  POLYGON_CHAIN_ID,
  useWeb3Context,
} from "don-components";
import { waitFor } from "don-utils";
import { useDidUpdate, useIsomorphicEffect } from "hooks";
import { createContext, useContext, useRef, useState } from "react";

type GetQuote = (quote: {
  productId: number;
  amount: string;
  period: number;
  currency: string;
  name: string;
}) => Promise<any>;
export type IBrightUnion = {
  status: "ready" | "initial";
  activeCovers: {
    contractName: string;
    coverAmount: string;
    coverAsset: string;
    coverType: string;
    endTime: string;
    logo?: string;
    net: number;
    rawData: any;
    risk_protocol: "insurace";
    status: string;
  }[];
};

type IBrightContext = IBrightUnion & {
  initialize: () => Promise<void>;
  brightClient: any;
  buyQuote: (quote: any) => Promise<any>;
  getQuoteFrom: GetQuote;
  refetch: () => Promise<void>;
};

const BrightUnionContext = createContext<IBrightContext | null>(null);

const filterCovers = (covers: IBrightUnion["activeCovers"]) => {
  return covers.reduce((prev, next) => {
    const index = prev.findIndex(
      (item) => item.contractName === next.contractName
    );
    if (index > -1) {
      prev[index] = {
        ...prev[index],
        coverAmount: new BigNumber(prev[index].coverAmount)
          .plus(next.coverAmount)
          .toFixed(0),
      };
      return prev;
    }
    return [...prev, next];
  }, [] as IBrightUnion["activeCovers"]);
};

export const BrightSdkProvider: React.FC = (props) => {
  const [{ status, activeCovers }, setState] = useState<IBrightUnion>({
    status: "initial",
    activeCovers: [],
  });
  const brightClientRef = useRef<any>(null);
  const { getConnectedWeb3, address, chainId, connected } = useWeb3Context();

  const setBrightClient = (brightClient: any) => {
    brightClientRef.current = brightClient;
  };
  const getBrightClient = () => {
    return brightClientRef.current;
  };

  const initializeSDk = async () => {
    const web3 = getConnectedWeb3();
    //@ts-ignore
    const sdk = await import("@brightunion/sdk");
    // console.log(sdk.default);
    const brightClient = new sdk.default({ web3 });
    await brightClient.initialize();
    await waitFor(2000);
    setBrightClient(brightClient);
    await refetch();

    setState((old) => ({ ...old, status: "ready" }));
  };

  const refetch = async () => {
    console.log("Refetching");
    try {
      const covers: IBrightUnion["activeCovers"] =
        await getBrightClient().getAllCovers();
      console.log("Refetched", covers);
      setState((old) => ({ ...old, activeCovers: filterCovers(covers) }));
    } catch (e) {
      console.log(e, "Error In Fetching");
    }
  };

  const getQuoteFrom = async ({
    productId,
    amount,
    period,
    currency,
    name,
  }: {
    productId: number;
    amount: string; // 25%
    period: number;
    currency: string;
    name: string;
  }) => {
    if (status !== "ready") {
      throw new Error("Bright Client Not Initialized");
    }
    const updatedQuote = {
      productId,
      amount, // 50%
      period,
      asset: currency,
      name,
    };
    const brightClient = getBrightClient();
    const insuraceQuote = await brightClient.getQuoteFrom(
      "insurace",
      updatedQuote.amount,
      updatedQuote.asset,
      updatedQuote.period,
      updatedQuote
    );
    return insuraceQuote;
  };

  const buyQuote = async (quote: any) => {
    const brightClient = getBrightClient();

    const result = await brightClient.buyQuote(quote);
    return result;
  };
  const allowedChainId =
    chainId === BINANCE_CHAIN_ID || chainId === POLYGON_CHAIN_ID;


   
  useIsomorphicEffect(() => {
    if(connected && status === "initial" && allowedChainId && chainId && allowedChainId){
      initializeSDk()
    }
  }, [connected, address, chainId])

  return (
    <BrightUnionContext.Provider
      value={{
        status,
        getQuoteFrom: getQuoteFrom,
        brightClient: getBrightClient(),
        activeCovers,
        initialize: initializeSDk,
        buyQuote,
        refetch,
      }}
    >
      {props.children}
    </BrightUnionContext.Provider>
  );
};

export const useBrightClient = () => {
  const { initialize, ...rest } = useContext(
    BrightUnionContext
  ) as IBrightContext;


  return rest;
};
