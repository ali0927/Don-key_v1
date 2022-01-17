import React from "react";
import YellowBack from "./images/yellow_background.png";
import { BackImage, TitleSection, Title } from "./EarningPage";
import styled from "styled-components";
import { navigate } from "gatsby";
import { DonPartnerIcon } from "icons";



const BecomeAPartnerButton = styled.button`
  border-radius: 35px;
  border: 10px solid #fff;
  background: #f7f5f5;
  padding: 10px 20px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  position: relative;
  padding-left: 60px;
`;

export const HeaderSection = ({ hideButton }: { hideButton?: boolean }) => {
  const gotoPartner = () => {
    navigate("/partner");
  };
  return (
    <>
      {" "}
      <BackImage src={YellowBack} alt="yellow_back" />
      <TitleSection className="container">
        <div className="row">
          <div className="col-md-6 mt-3 mb-4">
            <Title className="mb-4">Mule Pool</Title>
            <p>
              Discover Don-key’s upcoming partners and more DeFi protocols by
              staking $DON and earning bonus tokens. Selected projects will be
              integrated in our Copyfarms for you to utilize in order to make
              even more APY.
            </p>
          </div>
          <div className="offset-md-3"></div>
          <div className="col-md-3 d-flex flex-column justify-content-center">
            {!hideButton && (
              <BecomeAPartnerButton onClick={gotoPartner}>
                <span style={{ position: "absolute", left: -30, top: -15 }}>
                  <DonPartnerIcon />
                </span>{" "}
                Become a Partner
              </BecomeAPartnerButton>
            )}
          </div>
        </div>
      </TitleSection>
    </>
  );
};
