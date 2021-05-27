import { Col, Container, Row } from "react-bootstrap";
import { EditIcon } from "icons/EditIcon";
import { DetailTable } from "./DetailTable";
import styled from "styled-components";
import { capitalize } from "lodash";
import { ShowMoreContent } from "components/ShowmoreContent";
import { FarmerModal } from "components/FarmerModal/FarmerModal";
import { useMemo, useState } from "react";
import { IFarmerInter } from "interfaces";
import { TwitterIcon } from "components/TwitterIcon";
import { TelegramIcon } from "components/TelegramIcon";
import { DotsIcon } from "icons";
import BigNumber from "bignumber.js";

const StyledFarmerImage = styled.img`
  border-radius: 15px;
  object-fit: cover;
  width: 100px;
  height: 100px;
`;

const OutlinedButton = styled.button`
  background-color: transparent;
  border: 1px solid rgba(128, 118, 2, 1);
  border-radius: 5px;
  font-size: 16px;
  color: rgba(54, 53, 44, 1);
  display: flex;
  align-items: center;
  padding: 5px 20px 5px 15px;
  transition: all 0.3s linear;
  &:hover {
    background-color: #fff;
    border-color: #fff;
  }
`;

const Title = styled.h2`
  font-family: "ObjectSans-Bold";
  font-weight: 900;
`;

const ImageWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  @media screen and (min-width: 400px) {
    width: initial;
    display: inline-flex;
  }
`;

export const FarmerBio = ({
  farmer: {
    description,
    last_signin,
    name,
    picture,
    poolAddress,
    telegram,
    strategies,
    twitter,
  },
  isInvestor,
  investorCount,
}: {
  farmer: IFarmerInter;
  isInvestor?: boolean;
  investorCount?: number;
  telegram?: string;
  twitter?: string;
}) => {
  const [modalShow, setModalShow] = useState(false);

  // const lastActive = useMemo(() => {
  //   return moment.duration(moment().diff(moment(last_signin))).humanize();
  // }, [last_signin]);

  // const diff = useMemo(() => {
  //   const Current = moment(new Date());
  //   const LastDateTime = moment(last_signin);
  //   return Current.diff(LastDateTime, "minute") >= 2 ? "offline" : "online";
  // }, [last_signin]);

  return (
    <>
      <Container>
        <Row>
          <Col lg={12} className="mt-3">
            <div className="d-flex flex-column flex-md-row align-items-center flex-wrap mb-3">
              <Title className="mb-2 mb-md-0">
                DON - {capitalize(name || "")}
              </Title>
              {!isInvestor && (
                <div className="d-flex align-items-center justify-content-center">
                  <OutlinedButton
                    className="ml-3"
                    onClick={() => setModalShow(true)}
                  >
                    <EditIcon className="mr-2" />
                    Edit bio page
                  </OutlinedButton>
                  {modalShow && (
                    <FarmerModal
                      isOpen={modalShow}
                      onClose={() => setModalShow(false)}
                    />
                  )}
                </div>
              )}
            </div>
          </Col>
        </Row>

        <Row className="mt-0 mt-sm-3 mb-4">
          <div className="col-lg-6">
            <div className="row">
              <ImageWrapper className="pl-4">
                <StyledFarmerImage
                  src={picture}
                  className="img-fluid "
                  alt="farmer"
                  style={{ borderRadius: 0 }}
                />{" "}
              </ImageWrapper>

              <Col lg={9} className="pl-4 mt-4 mt-md-0">
                {description.length > 0 && (
                  <>
                    <div className="d-flex justify-content-between">
                      <h4 className="font-weight-bolder">{strategies && strategies.length > 0 ? strategies[0].strategyName : "Description"}</h4>
                      <div className="d-flex">
                        <div className="mr-3">
                          <TwitterIcon
                            fill={"#000"}
                            handle={twitter || "#"}
                          ></TwitterIcon>
                        </div>
                        <div>
                          <TelegramIcon
                            fill={"#000"}
                            handle={telegram || "#"}
                          ></TelegramIcon>
                        </div>
                      </div>
                    </div>

                    <p style={{ fontSize: 15 }}>
                      <ShowMoreContent length={150} content={description} />
                    </p>
                  </>
                )}
              </Col>
            </div>
          </div>

          <Col
            lg={6}
            className="d-flex justify-content-lg-end justify-content-sm-center justify-content-center justify-content-md-center"
          >
            <DotsIcon />
          </Col>
        </Row>

        <Row className="mt-5">
          <DetailTable
            apy={
              strategies && strategies.length > 0
                ? new BigNumber(strategies![0].apy)
                    .multipliedBy(100)
                    .toFixed(0) + "%"
                : "100%"
            }
            poolAddress={poolAddress}
            investorCount={investorCount !== undefined ? investorCount : 0}
          />
        </Row>
      </Container>
    </>
  );
};
