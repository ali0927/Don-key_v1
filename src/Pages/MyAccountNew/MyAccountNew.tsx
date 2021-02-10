import { NavBar2 } from "components/Navbar/NavBar";
import MyAccountDetail from "JsonData/MyAccountDetail";
import React, { useRef, useState } from "react";
import {
    Container,
    Row,
    Col,
    Button,
    Overlay,
    Popover,
    Table,
} from "react-bootstrap";
import { AiOutlineQuestionCircle } from "react-icons/ai";
import "./MyAccountNew.scss";
import graph from "./graph.svg";
import { BsArrowUp, BsArrowDown, BsArrowRight } from "react-icons/bs";
import clsx from "clsx";

const GraphItem = ({
    direction = "up",
    value,
    title,
}: {
    direction?: "up" | "down";
    value: string;
    title: string;
}) => {
    return (
        <div className="d-flex">
            <div style={{ fontSize: 18 }}>
                {direction === "up" ? (
                    <BsArrowUp style={{ position: "relative", top: -4 }} />
                ) : (
                    <BsArrowDown style={{ position: "relative", top: -4 }} />
                )}
            </div>
            <div>
                <p className="font-weight-bold graph_date">{title}</p>
                <p>{value}</p>
            </div>
        </div>
    );
};

const MyaccountNewGraph = () => {
    return (
        <Container className="py-2">
            <Row className="justify-content-between">
                <Col md={3}>
                    <h4 className="investment_title">Total Pool Value</h4>
                    <p className="pool_value">$907.45</p>
                </Col>
                <Col md={3}>
                    <p className="performance_title">
                        TOTAL PERFORMANCE{" "}
                        <AiOutlineQuestionCircle
                            className="ml-1 cursor-pointer performance_title_icon"
                            size={16}
                        />
                    </p>
                    <p className="pool_value text-right">+83.67%</p>
                </Col>
                <Col md={12}>
                    <img className="img-fluid" src={graph} />
                    <Row>
                        <Col md={3} lg={2}>
                            <div className="d-flex justify-content-between">
                                <div className="graph_duration">1D</div>
                                <div className="graph_duration active">1W</div>
                                <div className="graph_duration">1M</div>
                                <div className="graph_duration">3M</div>
                            </div>
                        </Col>
                    </Row>
                </Col>
            </Row>
            <Row className="mt-4">
                <Col md={5}>
                    <p className="graph_date">OCT 26, 2020</p>
                    <p className="graph_date_sub">Creation Date</p>
                </Col>
                <Col className="d-flex justify-content-between" md={7}>
                    {[
                        { title: "5,56%", value: "1D" },
                        { title: "5,56%", value: "1W" },
                        {
                            title: "5,56%",
                            value: "1M",
                            direction: "down" as const,
                        },
                        { title: "5,56%", value: "3M" },
                        { title: "5,56%", value: "6M" },
                    ].map((item) => {
                        return <GraphItem {...item} />;
                    })}
                </Col>
            </Row>
            <Row>
                <Col sm={12}>
                    <hr />
                </Col>
            </Row>
        </Container>
    );
};

const TabItem = ({
    icon,
    text,
    active,
}: {
    icon: any;
    text: string;
    active?: boolean;
}) => {
    return (
        <div className={clsx("tab_item", { active })}>
            <span className="tab_item_icon">{icon}</span>
            <span className="tab_item_text">{text}</span>
        </div>
    );
};

const TabsSection = () => {
    return (
        <section>
            <div className="bg-buru">
                <Container>
                    <Row>
                        <Col sm={12}>
                            <div className="d-flex">
                                <TabItem
                                    active
                                    icon={
                                        <svg
                                            width={20}
                                            height={15}
                                            viewBox="0 0 20 15"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                clipRule="evenodd"
                                                d="M3.5 1.7h13.286a1.3 1.3 0 011.296 1.205.846.846 0 00-.376.138l-7.564 5.043-7.564-5.043a.846.846 0 00-.375-.138A1.3 1.3 0 013.5 1.7zM2.2 4.834V12a1.3 1.3 0 001.3 1.3h13.286a1.3 1.3 0 001.3-1.3V4.833l-7.473 4.981a.85.85 0 01-.943 0L2.2 4.834zM.5 3a3 3 0 013-3h13.286a3 3 0 013 3v9a3 3 0 01-3 3H3.5a3 3 0 01-3-3V3z"
                                                fill="#222"
                                            />
                                        </svg>
                                    }
                                    text="Posts"
                                />
                                <TabItem
                                    icon={
                                        <svg
                                            width={21}
                                            height={21}
                                            viewBox="0 0 21 21"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <rect
                                                x={10.5}
                                                y={0.202}
                                                width={14.3}
                                                height={14.3}
                                                rx={2.15}
                                                transform="rotate(45 10.5 .202)"
                                                stroke="#222"
                                                strokeWidth={1.7}
                                            />
                                        </svg>
                                    }
                                    text="Strategies"
                                />
                                <TabItem
                                    icon={<BsArrowRight size={20} />}
                                    text="Deposits"
                                />
                                <TabItem
                                    icon={
                                        <svg
                                            width={19}
                                            height={20}
                                            viewBox="0 0 19 20"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M18.5 18H.5v2h18v-2zM18.32 6.94l.024-.039c.007-.01.014-.02.02-.032l.023-.044.016-.032.018-.045.014-.036.014-.044.012-.04.01-.044.008-.042a.895.895 0 00.007-.052l.004-.036a1.06 1.06 0 000-.18c0-.013-.003-.024-.004-.036a.895.895 0 00-.007-.052l-.008-.042-.01-.045-.012-.04-.014-.044-.014-.036c-.006-.015-.011-.03-.018-.044l-.016-.033c-.007-.014-.014-.03-.023-.044l-.02-.032-.024-.039-.036-.046-.015-.02L13.654.266a.774.774 0 00-.25-.197.668.668 0 00-.589 0 .774.774 0 00-.25.197.934.934 0 00-.166.295 1.053 1.053 0 000 .696c.039.11.095.21.167.295l3.302 3.903H12.34c-2.217-.002-4.373.868-6.126 2.473-1.753 1.604-3.005 3.853-3.559 6.39a1.069 1.069 0 00.079.695c.05.104.119.195.2.267a.727.727 0 00.272.156c.099.03.202.036.302.019a.697.697 0 00.285-.12.833.833 0 00.224-.24.99.99 0 00.128-.323c.469-2.147 1.528-4.05 3.012-5.407C8.64 8.007 10.464 7.27 12.34 7.273h3.528l-3.302 3.902a.999.999 0 00-.226.643c0 .241.081.473.226.643.144.17.34.266.544.266.204 0 .4-.095.543-.266l4.616-5.455.015-.02.036-.046z"
                                                fill="#070602"
                                            />
                                        </svg>
                                    }
                                    text="Withdrawal"
                                />
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>

            <div className="py-5">
                <Container>
                    <Row>
                        <Col sm={11}>
                            <h2>Posts</h2>
                            
                        </Col>
                    </Row>
                </Container>
            </div>
        </section>
    );
};

export const MyAccountNew = () => {
    const ref = useRef<HTMLDivElement | null>(null);
    const [show, setShow] = useState(false);
    const [target, setTarget] = useState<EventTarget | null>(null);
    const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
        setShow(!show);
        setTarget(event.target);
    };
    return (
        <>
            <NavBar2 />
            <section className="bg-buru">
                <div className="navbanHead rounded-0 pt-5 pb-5">
                    <Container>
                        <Row>
                            <Col
                                className="pr-md-0 pl-md-0 ml-md-3 pr-sm-2 pr-0"
                                xl={12}
                                lg={12}
                                md={12}
                                sm={12}
                                xs={8}
                            >
                                <h2 className="firstHeading mb-3">
                                    {MyAccountDetail.name}
                                </h2>
                            </Col>

                            <Col
                                className="pr-md-0 pl-md-0 ml-md-3 pr-sm-2"
                                xl={1}
                                lg={1}
                                md={2}
                                sm={3}
                                xs={4}
                            >
                                <div className="firstLetter">
                                    <div ref={ref}>
                                        <Button onClick={handleClick}>
                                            {MyAccountDetail.name
                                                .substring(0, 3)
                                                .toLocaleUpperCase()}
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
                                                        <Col
                                                            md={7}
                                                            sm={7}
                                                            xs={7}
                                                        >
                                                            <p className="d-inline-block">
                                                                Budget now
                                                            </p>
                                                        </Col>

                                                        <Col
                                                            md={5}
                                                            sm={5}
                                                            xs={5}
                                                            className="text-left"
                                                        >
                                                            <span>
                                                                {" "}
                                                                $ 50,000
                                                            </span>
                                                        </Col>
                                                    </Row>

                                                    <Row>
                                                        <Col
                                                            md={7}
                                                            sm={7}
                                                            xs={7}
                                                        >
                                                            <p className="d-inline-block">
                                                                Next level
                                                            </p>
                                                        </Col>

                                                        <Col
                                                            md={5}
                                                            sm={5}
                                                            xs={5}
                                                            className="text-left"
                                                        >
                                                            <span>
                                                                {" "}
                                                                $ 100,000
                                                            </span>
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
                            </Col>

                            <Col xl={6} lg={6} md={9} sm={9} xs={12}>
                                <div className="bannerDetail">
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
                                            {MyAccountDetail.array.map(
                                                (item, index) => {
                                                    return (
                                                        <tr>
                                                            <td>${item.aum}</td>
                                                            <td>
                                                                <img
                                                                    src="/assets/images/triangle.png"
                                                                    className="d-inline-block pr-1"
                                                                    alt="Image"
                                                                />
                                                                {item.daily
                                                                    .toString()
                                                                    .replace(
                                                                        /\B(?=(\d{2})+(?!\d))/g,
                                                                        ","
                                                                    )}
                                                                % ${item.daily_}
                                                            </td>
                                                            <td>
                                                                <img
                                                                    src="/assets/images/triangle.png"
                                                                    className="d-inline-block pr-1"
                                                                    alt="Image"
                                                                />
                                                                {item.weekly
                                                                    .toString()
                                                                    .replace(
                                                                        /\B(?=(\d{2})+(?!\d))/g,
                                                                        ","
                                                                    )}
                                                                % $
                                                                {item.weekly_}
                                                            </td>

                                                            <td>
                                                                <img
                                                                    src="/assets/images/triangle.png"
                                                                    className="d-inline-block pr-1"
                                                                    alt="Image"
                                                                />
                                                                {item.to_date
                                                                    .toString()
                                                                    .replace(
                                                                        /\B(?=(\d{2})+(?!\d))/g,
                                                                        ","
                                                                    )}
                                                                % $
                                                                {item.to_date_}
                                                            </td>
                                                        </tr>
                                                    );
                                                }
                                            )}
                                        </tbody>
                                    </Table>
                                </div>
                            </Col>

                            <Col xl={4} lg={4} md={11} sm={12} xs={12}>
                                <div className="bannerrightCol">
                                    <Row>
                                        <Col
                                            md={9}
                                            sm={9}
                                            xs={9}
                                            className="text-left"
                                        >
                                            <h6>
                                                BURU tokens
                                                <img
                                                    src="/assets/images/center.png"
                                                    className="d-inline-block pl-2"
                                                    alt="iamge"
                                                />
                                            </h6>
                                            <p>For end of the month</p>
                                        </Col>

                                        <Col
                                            md={3}
                                            sm={3}
                                            xs={3}
                                            className="text-right"
                                        >
                                            <span>
                                                {
                                                    MyAccountDetail.buru_token_minted
                                                }
                                            </span>
                                        </Col>
                                    </Row>
                                </div>
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
                                We will run 2 main strategies:1) a long and
                                short algo on BTC, w/ a Sortino of 5.5 (will
                                post new backtest chart shortly, but it performs
                                better). 2) Active discretionary trading both
                                long / short across all synthetic assets
                                combining fundamental, technical, quantitative
                                and cross asset analysis (will post new backtest
                                chart shortly, but it performs better). Any
                                changes to strategy will be noted here...
                                <a
                                    href="#"
                                    className=" text-dark font-weight-bold p-0"
                                >
                                    See more
                                </a>
                            </p>
                        </Col>
                        <Col sm={12}>
                            <hr />
                        </Col>
                    </Row>
                </Container>
                <MyaccountNewGraph />
            </section>
            <TabsSection />
        </>
    );
};
