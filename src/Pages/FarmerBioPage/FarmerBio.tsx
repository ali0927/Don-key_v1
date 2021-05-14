import { Col, Container, Row } from "react-bootstrap";
import { EditIcon } from "icons/EditIcon";
import { DetailTable } from "./DetailTable";
import styled from "styled-components";
import { capitalize } from "lodash";
import { ShowMoreContent } from "components/ShowmoreContent";
import { FarmerModal } from "components/FarmerModal/FarmerModal";
import { useMemo, useState } from "react";
import moment from "moment";
import { IFarmerInter } from "interfaces";
import { TwitterIcon } from "components/TwitterIcon";
import { TelegramIcon } from "components/TelegramIcon";

const StyledFarmerImage = styled.img`
  object-fit: cover;
  width: 120px;
  height: 120px;
  max-width: 160px;
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

const LastLoginText = styled.div`
  font-size: 12px;
  display: flex;
  align-items: center;
`;

const InvestorCountText = styled.div`
  font-size: 12px;
  display: flex;
  align-items: center;
`;

const Online = styled.span`
  width: 10px;
  height: 10px;
  background: #448124;
  border-radius: 100%;
`;

export const FarmerBio = ({
  farmer: { description, last_signin, name, picture, poolAddress, telegram, twitter },
  isInvestor,
  investorCount
}: {
  farmer: IFarmerInter;
  isInvestor?: boolean;
  investorCount?: number;
  telegram?: string;
  twitter?: string;
}) => {
  const [modalShow, setModalShow] = useState(false);

  const lastActive = useMemo(() => {
    return moment.duration(moment().diff(moment(last_signin))).humanize();
  }, [last_signin]);

  const diff = useMemo(() => {
    const Current = moment(new Date());
    const LastDateTime = moment(last_signin);
    return Current.diff(LastDateTime, "minute") >= 2 ? "offline" : "online";
  }, [last_signin]);


  return (
    <>
      <Container>
        <Row>
          <Col sm={12}>
            <div className="d-flex flex-column flex-md-row align-items-center flex-wrap mb-3">
              <h2 className="mb-2 mb-md-0">Don - {capitalize(name || "")}</h2>
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
            <Row className="justify-content-between">
              <Col md={1} className="mr-5">
                <div className="d-flex align-items-center justify-content-center justify-content-lg-start h-100">
                  <StyledFarmerImage
                    src={picture}
                    className="img-fluid"
                    alt="farmer"
                  />
                </div>
              </Col>
              <DetailTable poolAddress={poolAddress} />
            </Row>
          </Col>
          <Col sm={2}>
            {/* {(!isInvestor || diff === "online") && (
              <LastLoginText>
                <Online className="mr-1" />
                Online
              </LastLoginText>
            )} */}
          <div style={{display:'flex', maxWidth:'50%', justifyContent:'space-around'}}>
            {twitter &&
            <TwitterIcon fill={'#000'} handle={twitter}></TwitterIcon>
          }
            {telegram &&
            <TelegramIcon fill={'#000'} handle={telegram}></TelegramIcon>
          }
          </div>
          <InvestorCountText>Investor Count: {investorCount !== undefined ? investorCount : 0}</InvestorCountText>
          </Col>
        </Row>
      </Container>

      {description.length > 0 &&
      <Container className="mt-2">
        <Row>
          <Col md={8} lg={7}>
            <h4 className="">Description</h4>
            
            <p style={{ fontSize: 15 }}>
              <ShowMoreContent length={100} content={description} />
            </p>
          
          </Col>
        </Row>
      </Container>
       }
    </>
  );
};
