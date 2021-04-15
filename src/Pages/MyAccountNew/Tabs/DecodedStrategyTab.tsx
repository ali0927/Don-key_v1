import React from "react";
import { Container, Row, Col, Table } from "react-bootstrap";

import './DecodedStrategyTab.scss'

const deposits = [
  {
    date: '/assets/images/year-finance.png',
    tokens: "Yearn Finance",
    txHash: {icon: '/assets/images/add.png', name: 'Add Liquidity'},
  },
  {
    date: '/assets/images/compound.png',
    tokens: "Compound",
    txHash: {icon: '/assets/images/swap.png', name: 'Swap'},
  },
  {
    date: '/assets/images/1inch.png',
    tokens: "1inch",
    txHash: {icon: '/assets/images/withdraw.png', name: 'Withdrawal'},
  },
  {
    date: '/assets/images/pancakeswap.png',
    tokens: "Pancakeswap",
    txHash: {icon: '/assets/images/borrow.png', name: 'Borrow'},
  },
  {
    date: '/assets/images/balancer.png',
    tokens: "Balancer",
    txHash: {icon: '/assets/images/generate.png', name: 'Generate'},
  },
];

export const DecodedStrategyTab = ({title}: {title:string}) => {
  return (
    <Container>
      <Row>
        <Col
          className="d-flex align-items-center justify-content-between mb-5"
          sm={8}
        >
          <h2 className="font-weight-bold">{title}</h2>
        </Col>
        <Col
          className="d-flex align-items-center justify-content-between mb-5"
          sm={4}
        >
        </Col>
        <Col sm={12}>
          <div className="tablebg tablebgAuto">
            <Table responsive className="table">
              <thead>
              <tr>
                <th className="tab_head_wrap">Icon</th>
                <th className="tab_head_wrap">Protocol Name</th>
                <th></th>
                <th>Function</th>
              </tr>
              </thead>

              <tbody>
              {deposits.map((item, index) => {
                return (
                  <>
                    <tr className="deposit-row">
                      <td><img src={item.date} alt={'imageData'}/></td>

                      <td>{item.tokens}</td>
                      <td/>
                      <td>
                        <span>
                          <img src={item.txHash.icon} alt={item.txHash.name}/><span style={{ marginLeft: '8px'}}>{item.txHash.name}</span>
                        </span>
                      </td>
                    </tr>
                  </>
                );
              })}
              </tbody>
            </Table>
          </div>
        </Col>
      </Row>
    </Container>
  )
};
