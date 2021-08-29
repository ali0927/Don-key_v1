import { ContainedButton } from "components/Button";
import { DonCommonmodal } from "components/DonModal";
import React, { useState } from "react";
import styled from "styled-components";
import { Column } from "../Column/Column";

const CardWrapper = styled.div`
  min-height: 250px;
  background: #171717;
  border-radius: 10px;
`;

const CardInnerInfo = styled.div`
  min-height: 160px;
`;

const CardLabel = styled.p`
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 19px;
  letter-spacing: 0em;
  text-align: center;
  color: #fff;
`;

const CardValue = styled.p`
  font-size: 18px;
  font-style: normal;
  font-weight: 700;
  line-height: 21px;
  letter-spacing: 0em;
  text-align: center;
  color: #fff;
`;

const CutomButton = styled(ContainedButton)`
  background: #f5f290;
  width: 119px;
  height: 30px;
  :hover {
    background: #f5f290;
  }
`;

const FooterLinkSection = styled.p`
  font-size: 12px;
  margin: 0px;
  text-align: center;
`;

const AnchorElement = styled.a`
   color: #fff;
   :hover {
    color: #fff;
   }
`;


export const BlackBoxCard: React.FC = () => {
  const [openLock, setOpenLock] = useState(false);

  return (
    <>
      <CardWrapper className="p-2">
        <CardInnerInfo className="d-flex justify-content-center align-items-center">
          <div>
            <div className="d-flex justify-content-around">
              <div>
                <CardLabel> Total LP Tokens </CardLabel>
                <CardValue>16</CardValue>
              </div>
              <div>
                <CardLabel> User LP Tokens </CardLabel>
                <CardValue>16</CardValue>
              </div>
            </div>
            <div className="d-flex mt-2 mb-2">
              <CutomButton type="button" onClick={() => {}}>
                Harvest
              </CutomButton>
              <CutomButton
                type="button"
                onClick={() => setOpenLock(true)}
                className="ml-2"
              >
                Lock
              </CutomButton>
            </div>
          </div>
        </CardInnerInfo>
        <div className="row">
          <Column label="Available rewards" value={10} />
          <Column label="Monthly rewards" value={10} />
          <Column label="Annual APY" value={10} />
          <Column label="Current Network" value={10} />
        </div>

        <FooterLinkSection className="pt-2 pb-2">
          <AnchorElement
            className="mr-3"
            href="https://app.uniswap.org/#/swap?inputCurrency=0x217ddead61a42369a266f1fb754eb5d3ebadc88a&outputCurrency=0xdac17f958d2ee523a2206206994597c13d831ec7&use=V2"
            target="_blank"
          >
            Uniswap pool
          </AnchorElement>
          <AnchorElement
            href="https://pancakeswap.finance/swap?inputCurrency=0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c&outputCurrency=0x86B3F23B6e90F5bbfac59b5b2661134Ef8Ffd255"
            target="_blank"
          >
            pancakeswap pool
          </AnchorElement>
        </FooterLinkSection>
      </CardWrapper>

      {openLock && (
        <DonCommonmodal
          isOpen={openLock}
          title="Lock"
          size="xs"
          variant="common"
          onClose={() => setOpenLock(false)}
        >
          <div>
            <div className="row">
              <div className="col-lg-6">
                <ContainedButton>Approve</ContainedButton>
              </div>
              <div className="col-lg-6">
                <ContainedButton onClick={() => setOpenLock(false)}>
                  Cancel
                </ContainedButton>
              </div>
            </div>
          </div>
        </DonCommonmodal>
      )}
    </>
  );
};
