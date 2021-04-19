import { NavBar } from "components/Navbar/NavBar";
import React, { useEffect, useRef, useState } from "react";
import {
  Container,
  Row,
  Button,
  Col,
} from "react-bootstrap";
import { Footer } from "components/Footer/Footer";
import Web3 from "web3";
import PoolAbi from "./PoolAbi.json";
import "./InvestmentsPage.scss";
import { getWeb3 } from "don-utils";
import { TotalInvestedMoney } from "./TotalInvestedMoney";
import { useAxios } from "hooks/useAxios";
import { IFarmer } from "./interfaces";
import { DetailsTable } from "./DetailsTable";
import { IMyInvestments } from "./interfaces/IMyInvestments";
import _ from "lodash";
import { ShowMoreContent } from "components/ShowmoreContent";
import { useNotification } from "components/Notification";
import { LoadingPage } from "Pages/LoadingPage";
import styled from "styled-components";
import { Table, TableBody, TableData, TableHead, TableHeading, TableResponsive, TableRow } from "components/Table";

const HeadingTitle = styled.p({
  fontFamily: "Roboto",
  fontSize: "45px",
  fontStyle: "normal",
  fontWeight: 800,
  letterSpacing: "0em",
  textAlign: "left",
  color: "#070602",
});


const poolAddress = "0x9276BD1ca27DDaB5881642f0BF7B1a0C43542d16";

async function fetchBalance() {
  const web3 = (await getWeb3()) as Web3;
  const accounts = await web3.eth.getAccounts();

  const WBNB = new web3.eth.Contract(PoolAbi as any, poolAddress);
  const balance = await WBNB.methods.gettInvested().call();
  // var fBalance = parseFloat(
  //   parseFloat(web3.utils.fromWei(balance, "ether")).toFixed(5)
  // );
  // console.log()
  return 0;
}

export const InvestmentsPage = () => {
  const [balance, setBalance] = useState(0);

  const [isReady, setIsReady] = useState(false);

  const [{ data }] = useAxios({ method: "GET", url: "/api/v1/farmer" });

  const [{ data: farmesInvestmentData, loading }] = useAxios(
    { method: "GET", url: "/api/v1/farmerinvestments" },
    { useCache: false }
  );

  const [{ }, executeDelete] = useAxios(
    { method: "DELETE", url: "/api/v1/farmerinvestments" },
    { manual: true }
  );

  const farmer: IFarmer = data
    ? { ...data.data }
    : {
      name: "",
      description: "",
      picture: "",
      amountInPool: "907000.45",
      poolAddress: "",
    };

  const [myInvestments, setMyInvestments] = useState<IMyInvestments[]>([]);

  const { showNotification } = useNotification();

  useEffect(() => {
    (async () => {
      const balance = await fetchBalance();
      setBalance(balance);

      setIsReady(true);
    })();
  }, []);

  useEffect(() => {
    if (farmesInvestmentData) {
      setMyInvestments(farmesInvestmentData.data);
    }
  }, [farmesInvestmentData]);

  const handleWithDraw = (
    farmerName: string,
    poolAddress: string
  ) => async () => {
    const updatedList = myInvestments.filter(
      (x) => x.poolAddress !== poolAddress
    );
    setMyInvestments(updatedList);
    try {
      await executeDelete({
        data: {
          poolAddress: poolAddress,
        },
      });
      showNotification({
        msg: (
          <>
            <p className="text-center">{`Money Withdraw into Farmer ${farmerName} Successfully.`}</p>
          </>
        ),
      });
    } catch (err) {
      let errorMessage = "Could not withdraw Money. An error occurred";
      if (err && err.response && err.response.status === 404) {
        errorMessage =
          "You have already withdraw form this pull or not invested into this pool.";
      }

      showNotification({
        msg: (
          <>
            <p className="text-center">{errorMessage}</p>
          </>
        ),
      });
    }
  };

  if (!data) {
    return <LoadingPage />
  }


  return (
    <div className="bgColor investment_header_container">
      <NavBar variant="loggedin" />
      <section className="bg-buru">
        <div className="navbanHead rounded-0 pt-5 pb-5">
          <Container>
            <Row>
              <Col>
                <HeadingTitle>My Investments</HeadingTitle>
              </Col>
              {/* <div className="firstLetter image-col mr-4">
                 <img
                  className="img-fluid farmer-image"
                  src={
                    ""
                  }
                  alt={"investment"}
                />
              </div> */}

              {/* <div className="firstHeading_container col-lg-6 mr-4">
                <div className="firstHeading investment-heading mb-3">
                  {farmer.name}
                </div>
                <span className="description_title">Description</span>
                <span className="description_content description-width">
                  <ShowMoreContent content={farmer.description || ""} length={140} />
                </span>
              </div>

              <TotalInvestedMoney className="col-lg-4" balance={balance} /> */}
            </Row>
            {/* <div className="header_separator" />
            <DetailsTable farmer={farmer} /> */}
          </Container>
        </div>
      </section>
      <section>
        <div className="mt-4 mb-5 tablebgHead">
          <Container>

            <TableResponsive>
              <Table>
                <TableHead>
                  <TableRow isHoverOnRow={false}>
                    <TableHeading>SERIAL NO</TableHeading>
                    <TableHeading>NAME OF FARMER</TableHeading>
                    <TableHeading>BUSD INVESTED</TableHeading>
                    <TableHeading>TOTAL PROFIT</TableHeading>
                    <TableHeading>WITHDRAW WBNB</TableHeading>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {myInvestments.map((investment, index) => {
                    return (
                      <>
                        <TableRow key={index}>
                          <TableData>A25382</TableData>
                          <TableData className="bold">{investment.name}</TableData>
                          <TableData>$258 000.50</TableData>
                          <TableData className="bold">$876 200.50</TableData>
                          <TableData className="investment_table_btn">
                            <Button
                              variant="outline-secondary"
                              onClick={handleWithDraw(
                                investment.name,
                                investment.poolAddress
                              )}
                            >
                              Withdraw
                            </Button>
                          </TableData>
                        </TableRow>
                      </>
                    );
                  })}
                </TableBody>
              </Table>
            </TableResponsive>
            {/* <div className="mt-4 pagePosition">
                <p className="pageTable">Showing 1-10 of 120</p>
                <div className="paginationTable">
                  <Pagination>
                    <Pagination.Prev />
                    <Pagination.Item active>{1}</Pagination.Item>
                    <Pagination.Item>{2}</Pagination.Item>
                    <Pagination.Item>{3}</Pagination.Item>
                    <Pagination.Item>{4}</Pagination.Item>
                    <Pagination.Ellipsis />

                    <Pagination.Item>{120}</Pagination.Item>

                    <Pagination.Next />
                  </Pagination>
                </div>
                <div className="dropTable">
                  Show rows
                  <span>
                    <img
                      src="/assets/images/selectdrop.png"
                      className="d-inline-block align-top mr-3 ml-2 ml-md-0 mr-md-4"
                      alt="Logo"
                    />
                  </span>
                  <Form.Group>
                    <Form.Control as="select">
                      <option>100</option>
                      <option>200</option>
                      <option>300</option>
                    </Form.Control>
                  </Form.Group>
                </div>
              </div> */}
            {/* {InvestmentListData.length !== 0 && (
                <div className="investment_no_data">
                  <Button className="btnYellow">
                    Find some Farmers to Invest
                  </Button>
                </div>
              )} */}

          </Container>
        </div>
      </section>
      <Footer />
    </div>
  );
};
