import { SearchIcon } from "icons/SearchIcon";
import * as React from "react";
import { Col, Row } from "react-bootstrap";
import { ILeaderBoardSearchProps } from "./interfaces";
import "./LeaderBoardSearch.scss";


export const LeaderBoardSearch: React.FC<ILeaderBoardSearchProps> = (props) => {

    return (
        <>
            <Row className="mt-5">
                <Col className="d-flex justify-content-between">
                    <p className="best-farmer-title">Become the best farmer</p>

                    {/* <div >
                        <SearchIcon/>
                    </div> */}
                </Col>
            </Row>
        </>
    )
}