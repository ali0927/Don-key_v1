import { NavBar } from "components/Navbar/NavBar";
import React, { useEffect, useRef, useState } from "react";
import {
  Container,
  Row,
  Button,
  Table,
  // Pagination,
  // Form,
} from "react-bootstrap";
import { Footer } from "components/Footer/Footer";
import Web3 from "web3";
import PoolAbi from "./PoolAbi.json";
import "./InvestmentsPage.scss";
import { InvestmentPopup } from "components/InvestmentPopup/InvestmentPopup";
import { getWeb3 } from "don-utils";
import { InvestmentListData } from "./dummyInvestmentData";

const FirstLetter = () => {
  const ref = useRef<HTMLDivElement | null>(null);
  return (
    <div className="firstLetter">
      <div ref={ref}>
        <div>
          <img src="/assets/images/investment.png" alt={"investment"} />
        </div>
      </div>
    </div>
  );
};

const DetailTable = () => {
  return (
    <>
      <Row className="detail_container">
        <div className="detail_box">
          <div className="detail_box_header">Pool Address</div>
          <div className="detail_box_content">7777@gmail.com</div>
        </div>
        <div className="detail_box">
          <div className="detail_box_header">Amount In Pool</div>
          <div className="detail_box_content">$907 000.45</div>
        </div>
        <div className="detail_box">
          <div className="detail_box_header">Tokin Don - key</div>
          <div className="detail_box_content">1 580</div>
        </div>
      </Row>
    </>
  );
};

const InvestCard = ({ balance }: { balance: string | number }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="invest_card">
      <div className="invest_card_title">Total Invested Money</div>
      <div className="invest_card_amount">140 000$</div>
      {isOpen && (
        <InvestmentPopup balance={balance} onClose={() => setIsOpen(false)} />
      )}
    </div>
  );
};

const poolAddress = "0x9276BD1ca27DDaB5881642f0BF7B1a0C43542d16";

async function fetchBalance() {
  const web3 = (await getWeb3()) as Web3;
  const accounts = await web3.eth.getAccounts();

  const WBNB = new web3.eth.Contract(PoolAbi as any, poolAddress);
  console.log(WBNB.methods);
  const balance = await WBNB.methods.gettInvested().call();
  console.log(balance);
  // var fBalance = parseFloat(
  //   parseFloat(web3.utils.fromWei(balance, "ether")).toFixed(5)
  // );
  // console.log()
  return 0;
}

export const InvestmentsPage = () => {
  const [balance, setBalance] = useState(0);

  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    (async () => {
      const balance = await fetchBalance();
      setBalance(balance);

      setIsReady(true);
    })();
  }, []);

  return (
    <div className="bgColor investment_header_container">
      <NavBar variant="loggedin" />
      <section className="bg-buru">
        <div className="navbanHead rounded-0 pt-5 pb-5">
          <Container>
            <Row>
              <FirstLetter />
              <div className="firstHeading_container">
                <div className="firstHeading mb-3">Guttastemning</div>
                <span className="description_title">Description</span>
                <span className="description_content">
                  We will run 2 main strategies:1) a long and short algo on BTC,
                  w/ a Sortino of 5.5 (will post new backtest chart shortly, but
                  it performs better...
                </span>
              </div>
              <InvestCard balance={balance} />
            </Row>
            <div className="header_separator"/>
            <DetailTable />
          </Container>
        </div>
      </section>
      <section>
        <div className="mt-4 mb-5 tablebgHead">
          <Container>
            <h5 className="d-inline-block mt-4 mb-5">My Investments</h5>
            <div className="tablebg tablebgAuto">
              <Table responsive className="table">
                <thead>
                  <tr>
                    <th>SERIAL NO</th>
                    <th>NAME OF STRATEGY</th>
                    <th>WBNB INVESTED</th>
                    <th>TOTAL PROFIT</th>
                    <th>WITHDRAW WBNB</th>
                  </tr>
                </thead>
                <tbody>
                  {InvestmentListData.length > 0 &&
                    InvestmentListData.map((item, index) => {
                      return (
                        <>
                          <tr key={index}>
                            <td>{item.serialNo}</td>
                            <td className="bold">{item.nameOfStrategy}</td>
                            <td>{item.wbnb}</td>
                            <td className="bold">{item.totalProfit}</td>
                            <td className="investment_table_btn">
                              <Button
                                variant="outline-secondary"
                                onClick={() => {}}
                              >
                                Withdraw
                              </Button>
                            </td>
                          </tr>
                        </>
                      );
                    })}
                </tbody>
              </Table>
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
            </div>
          </Container>
        </div>
      </section>
      <Footer />
    </div>
  );
};
