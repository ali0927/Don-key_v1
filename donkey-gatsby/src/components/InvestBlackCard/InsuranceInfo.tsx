import { IBrightUnion, useBrightClient } from "contexts/BrightUnionContext";
import {
  calculateInitialInvestment,
  getTokenPrice,
  toEther,
} from "../../helpers/contractHelpers";
import { IInsurance, IInsuranceProps } from "interfaces";
import React, { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import brightInsurance from "../../images/insurancebtn.svg";
import BigNumber from "bignumber.js";
import { usePopper } from "react-popper";
import { createPortal } from "react-dom";
import clsx from "clsx";
import { ClickAwayListener } from "@material-ui/core";
import {
  BINANCE_CHAIN_ID,
  getWeb3,
  POLYGON_CHAIN_ID,
  useWeb3Context,
} from "don-components";
import { usePoolSymbol } from "hooks/usePoolSymbol";
import { useIsInvested } from "hooks/useIsInvested";
import { Spinner } from "react-bootstrap";

export const TokenImage = styled.img`
  max-width: 30px;
  margin-right: 10px;
`;

const StyledImage = styled.img`
  cursor: pointer;
`;
const PopupContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 10px 20px;
  border-radius: 15px;
  background-color: #fff;
  max-width: 400px;
`;

const Popper = styled.div`
  opacity: 0;
  transition: opacity 0.3s linear;
  &.open {
    opacity: 1;
  }
  position: absolute;
`;

export const factor = 1;
const PopperWrapper = ({
  children,
  popperContent,
}: {
  children: (args: {
    onMouseOver: React.MouseEventHandler;
    onMouseLeave: React.MouseEventHandler;
  }) => React.ReactNode;
  popperContent: React.ReactNode;
}) => {
  const [popperElement, setPopperElement] = useState<HTMLDivElement | null>(
    null
  );
  const [anchorEl, setAnchorEl] = useState<HTMLDivElement | null>(null);
  const [shouldClose, setShouldClose] = useState(false);
  const openPopover = (e: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(e.currentTarget as any);
    setShouldClose(false);
  };

  const closePopover = () => {
    setAnchorEl(null);
    setShouldClose(false);
  };

  const { styles, attributes } = usePopper(anchorEl, popperElement, {
    placement: "top",
  });
  const body = typeof document !== "undefined" ? document.body : null;

  useEffect(() => {
    if (shouldClose) {
      const timer = setTimeout(() => {
        closePopover();
      }, 500);
      return () => {
        clearTimeout(timer);
      };
    }
  }, [shouldClose]);

  return (
    <ClickAwayListener onClickAway={closePopover}>
      <div>
        {body &&
          createPortal(
            <Popper
              onMouseEnter={() => setShouldClose(false)}
              onMouseLeave={() => setAnchorEl(null)}
              ref={(ref) => setPopperElement(ref)}
              style={styles.popper}
              className={clsx({ open: !!anchorEl })}
              {...attributes.popper}
            >
              {popperContent}
            </Popper>,
            body
          )}
        {children({
          onMouseOver: openPopover,
          onMouseLeave: () => setShouldClose(true),
        })}
      </div>
    </ClickAwayListener>
  );
};

export const InsuranceInfo = ({
  Insurance = [],
  openInsurance,
  poolChainId,
  poolAddress,
}: IInsuranceProps & {
  poolChainId: number;
  poolAddress: string;
  //   isInvested: boolean
  openInsurance: (args: { isOpen: boolean; value: string }) => void;
}) => {
  const { activeCovers, status } = useBrightClient();
  const { chainId, switchNetwork, address } = useWeb3Context();
  const { symbol } = usePoolSymbol(poolAddress, getWeb3(poolChainId));
  let [{ investment, isReady }, setInvestment] = useState({
    isReady: false,
    investment: "0",
  });

  const { isInvested } = useIsInvested(poolAddress, getWeb3(poolChainId));
  Insurance = Insurance.filter((item) => !!item.protocol);
  const token = Insurance[0]?.token;
  const tokenSymbol = token?.symbol || symbol;

  const active = useMemo(() => {
    return activeCovers.reduce((prev, next) => {
      const activeFound = Insurance.find(
        (insur) =>
          insur.protocol.name.toLowerCase() === next.contractName.toLowerCase()
      );
      if (!activeFound) {
        return prev;
      }
      return [
        ...prev,
        {
          ...next,
          ...activeFound,
        },
      ];
    }, [] as (typeof activeCovers[0] & IInsurance)[]);
  }, [activeCovers, Insurance]);
  const coveredInvestment = useMemo(() => {
    const cover = active[0];
    if (active.length === 0) {
      return new BigNumber(0);
    }

    // return new BigNumber(0);
    const insuranceFin = Insurance.find((item) => {
      return (
        active.findIndex(
          (cover) =>
            cover.contractName.toLowerCase() ===
            item.protocol.name.toLowerCase()
        ) > -1
      );
    });

    if (insuranceFin) {
      const coveredInvestment = new BigNumber(toEther(cover.coverAmount))
        .multipliedBy(100)
        .dividedBy(insuranceFin.percent);

      return coveredInvestment;
    }
    return new BigNumber(0);
  }, [active, Insurance]);

  const hasFullyCovered = useMemo(() => {
    return coveredInvestment.gte(investment);
  }, [coveredInvestment, investment]);

  const handleInsurance = (e: React.MouseEvent) => {
    e.preventDefault();

    const value = coveredInvestment
      .minus(investment)
      .dividedBy(factor)
      .abs()
      .toString();

    openInsurance({
      isOpen: true,

      value,
    });
  };

  const fetchInitialInvestment = async () => {
    const web3 = getWeb3(poolChainId);
    const initialInvestment = await calculateInitialInvestment(
      web3,
      poolAddress,
      address
    );
    let tokenPrice = "1";
    if (token) {
      tokenPrice = await getTokenPrice(web3, poolAddress);
    }

    setInvestment({
      investment: new BigNumber(initialInvestment)
        .multipliedBy(factor)
        .multipliedBy(tokenPrice)
        .toString(),
      isReady: true,
    });
  };

  useEffect(() => {
    if (address) {
      fetchInitialInvestment();
    }
  }, [address]);

  const renderPopupContent = () => {
    if (chainId === BINANCE_CHAIN_ID || chainId === POLYGON_CHAIN_ID) {
      if (status !== "ready") {
        return (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Spinner size="sm" animation="border" />
          </div>
        );
      } else {
        if (active.length === 0) {
          return (
            <a href="#" onClick={handleInsurance}>
              Buy Now
            </a>
          );
        } else {
          return (
            <>
              <div className="mb-3 font-weight-bold">
                {" "}
                You have insurance on the following <br /> Protocols:
              </div>
              <ul className="list-unstyled mb-0">
                {active.map((item) => {
                  return (
                    <li
                      className="mb-1"
                      style={{ display: "flex", alignItems: "center" }}
                    >
                      <TokenImage src={item.protocol.icon.url} />
                      {item.protocol.name}:{" "}
                      <div
                        className="ml-1"
                        style={{ fontSize: 14, fontWeight: "bold" }}
                      >
                        {toEther(item.coverAmount)} {tokenSymbol}
                      </div>
                    </li>
                  );
                })}
              </ul>
              {!hasFullyCovered && (
                <a href="#" onClick={handleInsurance}>
                  Buy More
                </a>
              )}
              <div style={{ fontSize: 12 }} className="w-100">
                For more details go to: <br />
                <a target="_blank" href="https://app.brightunion.io/portfolio">
                  Bright Union
                </a>
              </div>
            </>
          );
        }
      }
    } else {
      return (
        <>
          Your insurance coverage can be shown directly on{" "}
          <a target="_blank" href="https://app.brightunion.io/portfolio">
            BrightUnion
          </a>{" "}
          web site. In order to buy or view insurance please remember to switch
          network to BSC.{" "}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              switchNetwork(BINANCE_CHAIN_ID);
            }}
          >
            Click here
          </a>
        </>
      );
    }
  };

  const PopperCont = (
    <PopupContent>
      <div>{renderPopupContent()}</div>
    </PopupContent>
  );

  if (!isReady || !isInvested) {
    return null;
  }
  return (
    <div className="d-flex justify-content-center mb-3">
      <div style={{ cursor: "pointer" }}>
        <PopperWrapper popperContent={PopperCont}>
          {({ onMouseOver, onMouseLeave }) => {
            return (
              <StyledImage
                // onMouseLeave={closePopover}
                onMouseLeave={onMouseLeave}
                onMouseOver={onMouseOver}
                src={brightInsurance}
                alt="Bright Insurance"
              />
            );
          }}
        </PopperWrapper>
      </div>
    </div>
  );
};
