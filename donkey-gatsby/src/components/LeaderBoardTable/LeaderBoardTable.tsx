import { useState } from "react";
import { ILeaderBoardTableProps } from "./interfaces";
import {
  Table,
  TableHead,
  TableHeading,
  TableBody,
  TableData,
  TableRow,
  TableResponsive,
} from "components/Table";
import { ButtonWidget } from "components/Button";
import { InvestmentPopup } from "components/InvestmentPopup/InvestmentPopup";
import styled from "styled-components";
import comingsoon from "images/comingsoon.svg";
import { leaderBoardData } from "./leaderboardjson";
import { breakPoints } from "breakponts";
import { navigate } from "gatsby-link";

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
  font-family: "Work Sans", -apple-system, BlinkMacSystemFont, "Segoe UI",
    Roboto, "Helvetica Neue", Arial, "Noto Sans", "Liberation Sans", sans-serif,
    "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
  font-style: normal;
  font-weight: 700;
  font-size: 24px;
  line-height: 116%;
  display: -webkit-flex;
  display: flex;
  -webkit-align-items: center;
  align-items: center;
  color: #070602;
  @media only screen and (min-width: ${breakPoints.lg}) {
    font-size: 30px;
  }
`;

const JoinButton = styled(ButtonWidget)`
  height: 40px;
  @media only screen and (min-width: ${breakPoints.lg}) {
    height: 50px;
  }
`;

const CommingSoon = styled.img`
  position: absolute;
  top: -10px;
  right: -65%;
  @media only screen and (min-width: ${breakPoints.lg}) {
    top: -5px;
    right: -53%;
  }
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
  background-color: #f4f4f4;
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
  const { isDisable = false } = props;
  const [openInvestment, setOpenInvestment] = useState(false);
  const [state, setState] = useState({
    farmerName: "",
    poolAddress: "",
    poolVersion: 1,
  });


  const handleLeaderClick = (id: string) => () => {
    if (!isDisable) {
     navigate(`/dashboard/farmer/${id}`);
    }
  };
  const handleJoinUseClick = () => {
    if (isDisable) {
     navigate("/farmers");
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
      poolVersion: 1,
    });
    setOpenInvestment(false);
  };

  return (
    <>
      <HeadingWrapper className="position-relative mt-2 mt-lg-5 mb-3 mb-lg-5">
        <Heading>Leaderboard</Heading>
        <CommingSoon src={comingsoon} />
      </HeadingWrapper>
      <div className="position-relative">
        {isDisable && (
          <>
            <Overlay />
            <JoinUsWrapper className="row pt-4 pb-4">
              <div className="col d-flex flex-column  justify-content-center  flex-md-row justify-content-center align-items-center">
                <div className="mr-md-3">
                  <Heading>Join our farmers team</Heading>
                </div>
                <div className="ml-md-3">
                  <JoinButton
                    varaint="contained"
                    containedVariantColor="yellow"
                    height="50px"
                    width="206px"
                    onClick={handleJoinUseClick}
                  >
                    Become a farmer
                  </JoinButton>
                </div>
              </div>
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
                        {/* <PoolAmount poolAddress={item.poolAddress} /> */}
                      </TableData>
                      <TableData>{item.profit24hours}</TableData>
                      <TableData>{item.profit7days}</TableData>
                      <TableData>{item.profit}</TableData>
                      <TableData>
                        -{" "}
                        {/* <MyInvestment poolAddress={item.poolAddress} /> */}
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
          poolVersion={state.poolVersion}
          poolAddress={state.poolAddress}
          onClose={closeInvestmentDialog}
        />
      )}

      {/* <Pagination rowscount={100} /> */}
    </>
  );
};
