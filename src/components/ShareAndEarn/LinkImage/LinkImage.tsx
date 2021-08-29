import React from "react";
import styled from "styled-components";
import Lines from "../images/Lines.png";
import DonkeyImg from "../images/Donkey.png";
import { ILinkImageProps } from "./interfaces";
import ReactDOM from "react-dom";

const RootRender = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: -1;
`;

const Root = styled.div`
  position: relative;
  background: #222222;
  min-height: 348px;
  width: 621px;
`;

const Board = styled.div`
  min-height: 166px;
  background: #fff;
  border-radius: 10px;
  height: inherit;
  position: relative;
`;

const Heading = styled.h2`
  color: #fff;
  font-weight: 800;
`;

const Content = styled.p`
  color: #fff;
  font-weight: 400;
  font-size: 22px;
`;

const Mark = styled.mark`
  background: #fdd700;
`;

const Image = styled.img`
  position: absolute;
  height: 215px;
  bottom: 0;
  left: 0;
`;

const Donkey = styled.img`
  position: absolute;
  right: 0px;
  height: 99px;
  width: 99px;
`;
const CardHeading = styled.div`
  font-size: 12px;
  font-weight: 700;
`;

const UserImage = styled.div`
  height: 25px;
  width: 25px;
  overflow: hidden;
  border-radius: 5px;
  border: 1px solid #919191;
`;

const Columns = styled.div`
  border-right: 1px solid #b4b4b4;
  height: 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  :last-child {
    border-right: none;
  }
`;

const ColumnTitle = styled.div`
  font-size: 12px;
  color: #b4b4b4;
`;

export const LinkImage: React.FC<ILinkImageProps> = (props) => {
  const { imageUrl, farmerName, strategyName } = props.farmerData;
  const { tvl, apy } = props;
  return (
    <>
      {ReactDOM.createPortal(
        <RootRender>
          <Root
            id="shareEarnImage"
            className="d-flex align-items-center justify-content-center"
          >
            <Image src={Lines} alt="Lines image not found" />
            <div className="row">
              <div className="col-6 pr-0">
                <Heading className="mt-2">Don-Key</Heading>

                <Content className="mt-4">
                  Invest in <Mark>strategies</Mark> and get best profit
                </Content>
              </div>

              <div className="col-6">
                <Board className="p-3">
                  <Donkey src={DonkeyImg} alt="Image" />
                  <div className="d-flex align-items-center">
                    <UserImage className="mr-2">
                      <img
                        src={imageUrl}
                        className="d-block img-fluid"
                        alt="Farmer image "
                      />
                    </UserImage>
                    <CardHeading>Don - {farmerName}</CardHeading>
                  </div>
                  <CardHeading className="mt-4">
                    Strategy: {strategyName}
                  </CardHeading>

                  <div className="row mt-4">
                    <Columns className="col-6">
                      <ColumnTitle>TVL</ColumnTitle>
                      <CardHeading>{tvl}</CardHeading>
                    </Columns>

                    <Columns className="col-6">
                      <ColumnTitle>APY</ColumnTitle>
                      <CardHeading>{apy}</CardHeading>
                    </Columns>
                  </div>
                </Board>
              </div>
            </div>
          </Root>
        </RootRender>,
        document.getElementById("root") as HTMLElement
      )}
    </>
  );
};
