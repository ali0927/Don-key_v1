import ButtonComponent from "components/Button/Button";
import { Loader } from "don-components";
import { IFarmer } from "interfaces";
import { useLayoutEffect, useState } from "react";

import { Link, useHistory } from "react-router-dom";
import { ILeaderBoardTableProps } from "./interfaces";
import "./LeaderBoardTable.scss";
import {
  Table,
  TableHead,
  TableHeading,
  TableBody,
  TableData,
  TableRow,
} from "../../../components/Table";
import { LightGrayButton } from "components/Button";
import { InvestmentPopup } from "components/InvestmentPopup/InvestmentPopup";
import { useNotification } from "components/Notification";
import styled from "styled-components";
const PoolAmount = ({ poolAddress }: { poolAddress: string }) => {
  const [isReady, setIsReady] = useState(false);
  const [poolAmount, setPoolAmount] = useState(0);

  useLayoutEffect(() => {}, []);
  if (!isReady) {
    return <>-</>;
  }
  return <>{poolAmount} BUSD</>;
};

const MyInvestment = ({ poolAddress }: { poolAddress: string }) => {
  const [isReady, setIsReady] = useState(false);
  const [poolAmount, setPoolAmount] = useState(0);

  useLayoutEffect(() => {}, []);
  if (!isReady) {
    return <>-</>;
  }
  return <>{poolAmount} BUSD</>;
};


const StyledImage = styled.img`
width: 45px;
height: 45px;
`


export const LeaderBoardTable: React.FC<ILeaderBoardTableProps> = (props) => {
  const { leaders, isReady } = props;
  const [openInvestment, setOpenInvestment] = useState(false);
  const history = useHistory();

  const handleLeaderClick = (id: string) => () => {
    history.push(`/dashboard/farmer/${id}`);
  };

  const openInvestmentDialog = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setOpenInvestment(true);
  };

  const closeInvestmentDialog = () => {
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
      <Table className="text-center">
        <TableHead>
          <TableRow style={{height: 75}}>
            <TableHeading>#</TableHeading>
            <TableHeading></TableHeading>
            <TableHeading>FARMER NAME</TableHeading>
            <TableHeading>TOTAL VALUE</TableHeading>
            <TableHeading>24h PROFIT</TableHeading>
            <TableHeading>7 DAYS PROFIT</TableHeading>
            <TableHeading>Total PROFIT</TableHeading>
            <TableHeading>MY INVESTMENT</TableHeading>
            <TableHeading>ACTION</TableHeading>
          </TableRow>
        </TableHead>
        <TableBody>
          {" "}
          <>
            {leaders.map((item, index) => {
              return (
                <TableRow
                  isHoverOnRow
                  key={item.GUID}
                  onClick={handleLeaderClick(item.GUID)}
                >
                  <TableData>{index + 1}</TableData>
                  <TableData>
                    <StyledImage  src={item.picture} />
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
                    <LightGrayButton
                      type="submit"
                      onClick={openInvestmentDialog}
                    >
                      Invest
                    </LightGrayButton>
                  </TableData>
                </TableRow>
              );
            })}
          </>
        </TableBody>
      </Table>

      {openInvestment && (
        <InvestmentPopup
          poolAddress=""
          balance={10000}
          onClose={closeInvestmentDialog}
        />
      )}

      {/* <Pagination rowscount={100} /> */}
    </>
  );
};
