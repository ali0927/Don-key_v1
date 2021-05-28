import { Loader } from "don-components";
import { useState } from "react";

import { useHistory } from "react-router-dom";
import { ILeaderBoardTableProps } from "./interfaces";
import "./LeaderBoardTable.scss";
import {
  Table,
  TableHead,
  TableHeading,
  TableBody,
  TableData,
  TableRow,
  TableResponsive,
} from "../../../components/Table";
import { ButtonWidget } from "components/Button";
import { InvestmentPopup } from "components/InvestmentPopup/InvestmentPopup";
import styled from "styled-components";
import { PoolAmount } from "components/PoolAmount";
import { MyInvestment } from "components/MyInvestment";
import comingsoon from "images/comingsoon.svg";
import { leaderBoardData } from "./leaderboardjson";

const StyledImage = styled.img`
  width: 45px;
  height: 45px;
`;

const EmptyTableHeading = styled(TableHeading)`
  min-width: 75px;
`;

const HeadingWrapper = styled.div`
  width: fit-content;
`;

const Heading = styled.h1`
  font-family: "ObjectSans-Bold";
  font-style: normal;
  font-weight: 700;
  font-size: 30px;
  line-height: 116%;
  display: -webkit-flex;
  display: flex;
  -webkit-align-items: center;
  align-items: center;
  color: #070602;
`;

const CommingSoon = styled.img`
  position: absolute;
  top: -5px;
  right: -53%;
`;

const BlurTable = styled(TableResponsive)`
  filter: ${(props: { disable: boolean }) =>
    props.disable ? "blur(4px)" : "unset"};
  width: 100%;
`;

const JoinUsWrapper = styled.div`
  display: flex;
  position: absolute;
  left: 0;
  right: 0;
  width: 100% !important;
  background-color: #F4F4F4;
  top: 50%;
  align-items: center;
  transform: translateY(-50%);
  justify-content: center;
  z-index: 3;
`;


const Overlay = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 1;
`;

export const LeaderBoardTable: React.FC<ILeaderBoardTableProps> = (props) => {
  const { isReady, isDisable = false } = props;
  const [openInvestment, setOpenInvestment] = useState(false);
  const [state, setState] = useState({
    farmerName: "",
    poolAddress: "",
  });
  const history = useHistory();

  const handleLeaderClick = (id: string) => () => {
    if (!isDisable) {
      history.push(`/dashboard/farmer/${id}`);
    }
  };
  const handleJoinUseClick = () => {
    if (isDisable) {
      history.push("/dashboard/farmer/signup");
    }
  };

  // const openInvestmentDialog = (farmerName: string, poolAddress: string) => (
  //   e: React.MouseEvent<HTMLButtonElement>
  // ) => {
  //   e.stopPropagation();
  //   if (!isDisable) {
  //     setState({
  //       farmerName: farmerName,
  //       poolAddress: poolAddress,
  //     });
  //     setOpenInvestment(true);
  //   }
  // };

  const closeInvestmentDialog = () => {
    setState({
      farmerName: "",
      poolAddress: "",
    });
    setOpenInvestment(false);
  };

  if (!isReady) {
    return (
      <div style={{ minHeight: 400, background: "#fff" }}>
        <Loader />
      </div>
    );
  }

  return (
    <>
      <HeadingWrapper className="position-relative mt-5 mb-5">
        <Heading>Leaderboard</Heading>
        <CommingSoon src={comingsoon} />
      </HeadingWrapper>
      <div className="position-relative">
        {isDisable && (
          <>
          <Overlay/>
          <JoinUsWrapper className="pt-4 pb-4">
            <Heading>Join our farmers team</Heading>
            <ButtonWidget varaint="contained" containedVariantColor="yellow" height="50px" width="206px" className="ml-5" onClick={handleJoinUseClick}>
              Become a farmer
            </ButtonWidget>
          </JoinUsWrapper>
          </>
        )}
        <BlurTable disable={isDisable}>
          <Table className="text-center">
            <TableHead>
              <TableRow style={{ height: 75 }}>
                <TableHeading>#</TableHeading>
                <EmptyTableHeading></EmptyTableHeading>
                <TableHeading>FARMER NAME</TableHeading>
                <TableHeading>TOTAL VALUE</TableHeading>
                <TableHeading>24h PROFIT</TableHeading>
                <TableHeading>7 DAYS PROFIT</TableHeading>
                <TableHeading> Total PROFIT</TableHeading>
                <TableHeading>MY INVESTMENT</TableHeading>
                <TableHeading>ACTION</TableHeading>
              </TableRow>
            </TableHead>
            <TableBody>
              <>
                {leaderBoardData.map((item, index) => {
                  return (
                    <TableRow
                      isHoverOnRow
                      key={index}
                      onClick={handleLeaderClick(item.GUID)}
                    >
                      <TableData>{index + 1}</TableData>
                      <TableData>
                        <StyledImage src={item.picture} />
                      </TableData>
                      <TableData>{item.name}</TableData>

                      <TableData>
                        <PoolAmount poolAddress={item.poolAddress} />
                      </TableData>
                      <TableData>{item.profit24hours}</TableData>
                      <TableData>{item.profit7days}</TableData>
                      <TableData>{item.profit}</TableData>
                      <TableData>
                        <MyInvestment poolAddress={item.poolAddress} />
                      </TableData>
                      <TableData>
                        <ButtonWidget varaint="outlined" disabled>
                           Invest
                        </ButtonWidget>
                      </TableData>
                    </TableRow>
                  );
                })}
              </>
            </TableBody>
          </Table>
        </BlurTable>
      </div>
      {openInvestment && (
        <InvestmentPopup
          poolAddress={state.poolAddress}
          onClose={closeInvestmentDialog}
        />
      )}

      {/* <Pagination rowscount={100} /> */}
    </>
  );
};
