import { IFarmer } from "../interfaces";
import * as React from "react";
import {
    Row,
} from "react-bootstrap";
import { shortenAddress } from "don-utils";


export const DetailsTable: React.FC<{ farmer: IFarmer }> = (props) => {
    const { farmer } = props;

    return (
        <>
            <Row className="detail_container">
                <div className="detail_box">
                    <div className="detail_box_header">Pool Address</div>
                    <div className="detail_box_content">{shortenAddress(farmer.poolAddress)}</div>
                </div>
                <div className="detail_box">
                    <div className="detail_box_header">Amount In Pool</div>
                    <div className="detail_box_content">$ 907 000.45</div>
                </div>
                <div className="detail_box">
                    <div className="detail_box_header">Don Tokens</div>
                    <div className="detail_box_content">1 580</div>
                </div>
            </Row>
        </>
    )
}