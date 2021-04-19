import ButtonComponent from "components/Button/Button";
import { Loader } from "don-components";
import { IFarmer } from "interfaces";
import { useLayoutEffect, useState } from "react";

import { Link, useHistory } from "react-router-dom";
import { ILeaderBoardTableProps } from "./interfaces";
import "./LeaderBoardTable.scss";
import { Form } from "react-bootstrap";
import { LeftArrow, RightArrowIcon } from "icons";
import { Pagination } from "../../../components/Pagnination";
import { Table, TableHead, TableHeading, TableBody, TableData, TableRow, TableResponsive } from "../../../components/Table";
import { LightGrayButton } from "components/Button";
import { InvestmentPopup } from "components/InvestmentPopup/InvestmentPopup";



const PoolAmount = ({ poolAddress }: { poolAddress: string }) => {
    const [isReady, setIsReady] = useState(false);
    const [poolAmount, setPoolAmount] = useState(0);

    useLayoutEffect(() => { }, []);
    if (!isReady) {
        return <>-</>;
    }
    return <>{poolAmount} BUSD</>;
};

export const LeaderBoardTable: React.FC<ILeaderBoardTableProps> = (props) => {

    const { leaders, isReady } = props;
    const [openInvestment, setOpenInvestment] = useState(false);
    const history = useHistory();

    const handleLeaderClick = (id: string) => () => {
        history.push(`/dashboard/farmer/${id}`)
    }

    const openInvestmentDialog = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation()
        setOpenInvestment(true);
    }

    const closeInvestmentDialog = () => {
        setOpenInvestment(false);
    }


    if (!isReady) {
        return (
            <div style={{ minHeight: 400, background: "#fff" }}>
                <Loader />
            </div>
        );
    }

    return (
        <>
            <TableResponsive>
                <Table>
                    <TableHead>
                        <TableRow isHoverOnRow={false}>
                            <TableHeading>#</TableHeading>
                            <TableHeading></TableHeading>
                            <TableHeading>FARMER NAME</TableHeading>
                            <TableHeading>STRATEGY NAME</TableHeading>
                            <TableHeading>TOTAL VALUE</TableHeading>
                            <TableHeading>24h PROFIT</TableHeading>
                            <TableHeading>7 DAYS PROFIT</TableHeading>
                            <TableHeading>INITIAL PROFIT</TableHeading>
                            <TableHeading>MY INVESTMENT</TableHeading>
                            <TableHeading>ACTION</TableHeading>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {" "}
                        <>
                            {leaders.map((item, index) => {
                                return (
                                    <TableRow isHoverOnRow key={item.id} onClick={handleLeaderClick(item.id)}>
                                        <TableData>{index + 1}</TableData>
                                        <TableData><img src={item.icon} /></TableData>
                                        <TableData>
                                            {item.farmerName}
                                        </TableData>
                                        <TableData>
                                            {item.strategyName}
                                        </TableData>
                                        <TableData>
                                            {item.totalValue}
                                        </TableData>
                                        <TableData>
                                            {item.profit24}
                                        </TableData>
                                        <TableData>
                                            {item.days7proft}
                                        </TableData>
                                        <TableData>
                                            {item.initialProfit}
                                        </TableData>
                                        <TableData>
                                            {item.myInvestment}
                                        </TableData>
                                        <TableData>
                                            <LightGrayButton type="submit" onClick={openInvestmentDialog}>
                                                Invest
                                       </LightGrayButton>
                                        </TableData>
                                        {/* <td>
                                    <span>
                                        <PoolAmount poolAddress={item.poolAddress} />
                                    </span>
                                </td>
                                <td>
                                    <span className="fontlight">{item.profit24 || "-"}</span>
                                </td>
                                <td>{item.profit7 || "-"}</td>
                                <td>{item.profitTotal || "-"}</td> */}
                                    </TableRow>
                                );
                            })}
                        </>
                    </TableBody>
                </Table>
            </TableResponsive>
            {openInvestment &&
                <InvestmentPopup balance={10000} onClose={closeInvestmentDialog} />
            }

            <Pagination rowscount={100} />

        </>

    );
};
