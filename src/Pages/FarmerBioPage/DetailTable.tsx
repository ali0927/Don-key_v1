import { Row, Col, Button } from "react-bootstrap";
import { useNotification } from "components/Notification";
import { useAxios } from "hooks/useAxios";
import styled from "styled-components";
import { useState } from "react";
import { InvestmentPopup } from "components/InvestmentPopup/InvestmentPopup";

const Poolinfo = styled.div`
  font-size: 16px;
  border-radius: 5px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2.2rem;
  margin-bottom: 30px;
`;

const InvestmentDisplay = styled.div`
  background: #000;
  color: #fff;
  display: flex;
  padding: 1.5rem;
  justify-content: space-between;
  border-radius: 4px;
`;

const InvestCardButton = styled.button`
  padding: 0.5rem 2rem;
  width: 100%;
  font-size: 14px;
  text-align: center;
  border-radius: 4px;
  border: 0;
  background-color: rgba(245, 242, 144, 1);
  transition: all 0.3s linear;
  color: #000;
  &:hover {
    opacity: 0.8;
  }
  &:focus {
    outline: none;
  }
`;

export const DetailTable = ({
  poolAddress,

}: {
  poolAddress: string;
 
}) => {

  const [showInvestmentPopup, setShowInvestmentPopup] = useState(false);



  return (
    <Row>
      <Col md={7}>
        <Poolinfo className="bg-white">
          <div className="list-box">
            <h5 className="heading-title">Pool address</h5>
            <div>{poolAddress}</div>
          </div>
        </Poolinfo>
      </Col>
      <Col md={5}>
        <InvestmentDisplay>
          <div>
            <div>Total Pool Value</div>{" "}
            <h5 className="heading-title">100BUSD</h5>
          </div>
          <div>
            {showInvestmentPopup && (
              <InvestmentPopup
                poolAddress={poolAddress}
                balance={1000}
                onClose={() => setShowInvestmentPopup(false)}
              />
            )}
            <InvestCardButton
              className="mb-3"
            
              onClick={() => setShowInvestmentPopup(true)}
            >
              Invest
            </InvestCardButton>
          </div>
        </InvestmentDisplay>
      </Col>
    </Row>
  );
};
