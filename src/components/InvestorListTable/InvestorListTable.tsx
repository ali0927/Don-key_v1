import BigNumber from "bignumber.js";
import {
  TableResponsive,
  Table,
  TableHead,
  TableRow,
  TableHeading,
  TableBody,
  TableData,
} from "components/Table";
import { getAmount, getPoolContract } from "helpers";
import { useIsomorphicEffect } from "hooks";
import { useAxios } from "hooks/useAxios";
import { DollarView } from "Pages/FarmerBioPage/DollarView";
import { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import { useWeb3 } from "don-components";
import { useInitialInvestment } from "hooks/useInitialInvestment";
import { formatNum } from "Pages/FarmerBioPage/DetailTable";
import { USDViewProvider, useUSDViewBool } from "contexts/USDViewContext";
import { TotalProfitLoss } from "components/TotalProfitLoss";

const ShowUserClaimableAmount = ({
  poolAddress,
  address,
}: {
  poolAddress: string;
  address: string;
}) => {
  const [isReady, setIsReady] = useState(false);
  const [amount, setAmount] = useState("0");
  const web3 = useWeb3();
  useIsomorphicEffect(() => {
    (async () => {
      try {
        const claimedAmount = await getAmount(web3, poolAddress, address);
        console.log(claimedAmount, "claimedAmount");
        setAmount(claimedAmount);
      } finally {
        setIsReady(true);
      }
    })();
  }, [poolAddress, address]);

  if (!isReady) {
    return <>-</>;
  }
  return <DollarView poolAddress={poolAddress} tokenAmount={amount} />;
};

const InitialInvestment = ({
  poolAddress,
  address,
}: {
  poolAddress: string;
  address: string;
}) => {
  const { isReady, initialInvestment, initialInvestmentInUSD } =
    useInitialInvestment(poolAddress, false, address);
  const { isUSD } = useUSDViewBool();

  if (!isReady) {
    return <>-</>;
  }
  return (
    <>
      {isUSD ? (
        `$${formatNum(initialInvestmentInUSD)}`
      ) : (
        <DollarView poolAddress={poolAddress} tokenAmount={initialInvestment} />
      )}
    </>
  );
};

const hideAddress = (item: string) => {
  return (
    item.slice(0, 10) +
    "xxxxxxxxxxxxxxxxxxxxx" +
    item.slice(item.length - 10, item.length)
  );
};

export const InvestorListTable = ({ poolAddress }: { poolAddress: string }) => {
  const [loading, setLoading] = useState(true);
  const [investments, setInvestments] = useState<string[]>([]);
  const [{ data }] = useAxios(`/api/v2/investments/${poolAddress}`);
  const web3 = useWeb3();
  useEffect(() => {
    (async () => {
      if (data) {
        setLoading(true);
        const investmentList: string[] = [];
        try {
          const investors = data.data;

          const pool = await getPoolContract(web3, poolAddress, 2);
          await Promise.all(
            investors.map(async (investor: any) => {
              const address = investor.from_walletaddress;
              const isInvested = await pool.methods.isInvestor(address).call();
              if (isInvested) {
                investmentList.push(address);
              }
            })
          );
          setInvestments(investmentList);
        } catch (e) {
        } finally {
          setLoading(false);
        }
      }
    })();
  }, [data]);

  if (loading) {
    return (
      <div
        className="d-flex align-items-center justify-content-center"
        style={{ minHeight: 400 }}
      >
        <Spinner animation="border" color="dark" />
      </div>
    );
  }
  if (investments.length === 0) {
    return null;
  }
  return (
    <TableResponsive>
      <Table>
        <TableHead>
          <TableRow>
            <TableHeading style={{ textAlign: "center" }}>
              Investor
            </TableHeading>
            <TableHeading style={{ textAlign: "center" }}>
              Invested Amount
            </TableHeading>
            <TableHeading style={{ textAlign: "center" }}>
              Claimable Amount
            </TableHeading>
            <TableHeading style={{ textAlign: "center" }}>
              Profit/Loss
            </TableHeading>
          </TableRow>
        </TableHead>
        <TableBody>
          {investments.map((item, i) => {
            return (
              <TableRow key={item}>
                <TableData style={{ textAlign: "center" }}>
                  {hideAddress(item)}
                </TableData>
                <TableData style={{ textAlign: "center" }}>
                  <InitialInvestment poolAddress={poolAddress} address={item} />
                </TableData>

                <TableData style={{ textAlign: "center" }}>
                  <ShowUserClaimableAmount
                    poolAddress={poolAddress}
                    address={item}
                  />
                </TableData>
                <TableData style={{ textAlign: "center" }}>
                  <TotalProfitLoss poolAddress={poolAddress} address={item} />
                </TableData>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableResponsive>
  );
};
