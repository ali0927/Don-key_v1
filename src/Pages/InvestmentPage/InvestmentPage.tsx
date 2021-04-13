import { NavBar2 } from "components/Navbar/NavBar";
import MyAccountDetail from "JsonData/MyAccountDetail";
import React, { useEffect, useRef, useState } from "react";
import {
  Container,
  Row,
  Col,
  Button,
  Overlay,
  Popover,
  Table,
  Spinner,
} from "react-bootstrap";
import { BsArrowRight } from "react-icons/bs";
import { Footer } from "components/Footer/Footer";
import { PostsIcon, StrategiesIcon, WithDrawalIcon } from "components/Icons";
import { MyAccountNewGraph } from "components/MyAccountNewGraph";
import { TabSection } from "components/TabSection";
import { DepositsTab } from "Pages/MyAccountNew/Tabs/DepositsTab";
import { PostTab } from "Pages/MyAccountNew/Tabs/PostTab";
import { StratgiesTab } from "Pages/MyAccountNew/Tabs/StratgiesTab";
import { ShowMoreContent } from "components/ShowmoreContent";
import Web3 from "web3";
import PoolAbi from "./PoolAbi.json";
import "./InvestmentPage.scss";
import { InvestmentPopup } from "components/InvestmentPopup/InvestmentPopup";
import ButtonComponent from "components/Button/Button";
import { getWeb3 } from "don-utils";
export const tabs = [
  { text: "Posts", comp: <PostTab />, icon: <PostsIcon /> },
  { text: "Strategies", comp: <StratgiesTab />, icon: <StrategiesIcon /> },
  {
    text: "Deposits",
    comp: <DepositsTab title="Deposits" />,
    icon: <BsArrowRight size={20} />,
  },
  {
    text: "WithDrawal",
    comp: <DepositsTab title="Withdrawal" />,
    icon: <WithDrawalIcon />,
  },
];

const FirstLetter = () => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [show, setShow] = useState(false);
  const [target, setTarget] = useState<EventTarget | null>(null);
  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    setShow(!show);
    setTarget(event.target);
  };
  return (
    <div className="firstLetter">
      <div ref={ref}>
        <Button onClick={handleClick}>
          {MyAccountDetail.name.substring(0, 3).toLocaleUpperCase()}
        </Button>

        <Overlay
          show={show}
          target={target as any}
          placement="bottom"
          container={ref.current}
          containerPadding={20}
        >
          <Popover id="popover-contained">
            <Popover.Content>
              <Row>
                <Col md={7} sm={7} xs={7}>
                  <p className="d-inline-block">Budget now</p>
                </Col>

                <Col md={5} sm={5} xs={5} className="text-left">
                  <span> $ 50,000</span>
                </Col>
              </Row>

              <Row>
                <Col md={7} sm={7} xs={7}>
                  <p className="d-inline-block">Next level</p>
                </Col>

                <Col md={5} sm={5} xs={5} className="text-left">
                  <span> $ 100,000</span>
                </Col>
              </Row>
            </Popover.Content>
          </Popover>
        </Overlay>
      </div>

      <img
        src="/assets/images/pattern.png"
        className="d-inline-block align-top pattern"
        alt="Image"
      />
      <img
        src="/assets/images/borderyellowstar.png"
        className="d-inline-block align-top star1"
        alt="Image"
      />
    </div>
  );
};

const DetailTable = () => {
  return (
    <div className="bannerDetail" style={{ background: "transparent" }}>
      <Table responsive className="m-0">
        <thead>
          <tr>
            <th>AUM</th>
            <th>Daily</th>
            <th>Weekly</th>
            <th>To Date</th>
          </tr>
        </thead>

        <tbody>
          {MyAccountDetail.array.map((item) => {
            return (
              <tr>
                <td>${item.aum}</td>
                <td>
                  <img
                    src="/assets/images/triangle.png"
                    className="d-inline-block pr-1"
                    alt="Image"
                  />
                  {item.daily.toString().replace(/\B(?=(\d{2})+(?!\d))/g, ",")}%
                  ${item.daily_}
                </td>
                <td>
                  <img
                    src="/assets/images/triangle.png"
                    className="d-inline-block pr-1"
                    alt="Image"
                  />
                  {item.weekly.toString().replace(/\B(?=(\d{2})+(?!\d))/g, ",")}
                  % ${item.weekly_}
                </td>

                <td>
                  <img
                    src="/assets/images/triangle.png"
                    className="d-inline-block pr-1"
                    alt="Image"
                  />
                  {item.to_date
                    .toString()
                    .replace(/\B(?=(\d{2})+(?!\d))/g, ",")}
                  % ${item.to_date_}
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
};

const InvestCard = ({
  balance,
}: {
  balance: string | number;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const [loading, setloading] = useState(false);

  const renderButtonContent = () => {
    if (loading) {
      return <Spinner animation="border" size={"sm"} color="#fff" />;
    }

    return "Invest";
  };

  const handleButtonClick = async () => {
    setIsOpen(true);
  };

  return (
    <div className="invest_card">
      <p>Your investment Balance</p>
      <h5 className="mb-3">{balance} BUSD</h5>
      <div className="row">
        <div className="col">
          <button onClick={handleButtonClick} className="invest_card_btn">
            {renderButtonContent()}
          </button>
        </div>
        <div className="col">
          <button disabled className="invest_card_btn">
            Exit
          </button>
        </div>
      </div>
      {isOpen && (
        <InvestmentPopup balance={balance} onClose={() => setIsOpen(false)} />
      )}
    </div>
  );
};

const poolAddress = "0x921E8B9185Fe180Eb2a1770A1137F6e6E22E9B37";


async function fetchBalance() {
  const web3 = (await getWeb3()) as Web3;
  const accounts = await web3.eth.getAccounts();

  const WBNB = new web3.eth.Contract(PoolAbi as any, poolAddress);
  console.log(WBNB.methods)
  const balance = await WBNB.methods.gettInvested().call();
  console.log(balance)
  // var fBalance = parseFloat(
  //   parseFloat(web3.utils.fromWei(balance, "ether")).toFixed(5)
  // );
  // console.log()
  return 0;
}

export const InvestmentPage = () => {
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
    <>
      <NavBar2 variant="loggedin" />
      <section className="bg-buru">
        <div className="navbanHead rounded-0 pt-5 pb-5">
          <Container>
            <Row>
              <Col sm={8}>
                <h2 className="firstHeading mb-3">Saly Strategies WOW</h2>
                <Row>
                  <Col sm={2}>
                    <FirstLetter />
                  </Col>
                  <Col sm={10}>
                    <DetailTable />
                  </Col>
                </Row>
              </Col>
              <Col sm={4}>
                {isReady && (
                  <InvestCard
                 
                    balance={balance}
                  />
                )}
              </Col>
            </Row>
          </Container>
        </div>

        <Container>
          <Row>
            <Col md={8} lg={7}>
              <h4 className="investment_title font-weight-bolder">
                {" "}
                Description
              </h4>
              <p style={{ fontSize: 15 }}>
                <ShowMoreContent
                  length={300}
                  content=" We will run 2 main strategies:1) a long and short algo on BTC,
                    w/ a Sortino of 5.5 (will post new backtest chart shortly, but
                    it performs better). 2) Active discretionary trading both long /
                    short across all synthetic assets combining fundamental,
                    technical, quantitative and cross asset analysis (will post new
                    backtest chart shortly, but it performs better). Any changes to
                    strategy will be noted here"
                />
              </p>
            </Col>
            <Col sm={12}>
              <hr />
            </Col>
          </Row>
        </Container>
        <MyAccountNewGraph />
      </section>
      <TabSection tabs={tabs} />
      <Footer />
    </>
  );
};
