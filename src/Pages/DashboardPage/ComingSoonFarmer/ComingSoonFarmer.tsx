import { ContainedButton } from "components/Button";
import { ShowMoreContent } from "components/ShowmoreContent";
import { DonKeyLeftToRightFace } from "icons";
import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import styled from "styled-components";
import { Timer } from "./Timer";
import { theme } from "theme";

const Papper = styled.div`
  box-shadow: 0px 5px 20px rgba(0, 18, 80, 0.1);
  border-radius: 10px;
  /* width: 374px; */
`;

const PapperTop = styled.div`
  background: #ffffff;
  border-radius: 10px;
  border-bottom-left-radius: 0px;
  border-bottom-right-radius: 0px;
`;

const PapperBottom = styled.div`
  background: #fbfbfb;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
`;

const ImageWrapper = styled.div`
  width: 51px;
  height: 51px;
  background-color: #FFF251;
  border-radius: 5px;
`;

const Title = styled.p`
  font-family: Roboto;
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  text-align: left;
  color: #000000;
  margin-bottom: 0px;
`;

const CustomRow = styled.div`
  margin-top: 77px;
  margin-bottom: 87px;
`;

const Heading = styled.p`
  font-family: Roboto;
  font-size: 17px;
  font-style: normal;
  font-weight: 700;
  text-align: left;
`;

const DescriptionContent = styled.div`
  font-family: Roboto;
  font-size: 13px;
  font-style: normal;
  font-weight: 300;
  text-align: left;
`;

const ComingSoonButton = styled(ContainedButton)`
  background: #000000;
  color: ${theme.palette.background.yellow};
  font-family: Roboto;
  font-size: 16px;
  font-style: italic;
  font-weight: 700;

  :hover {
    background: #000000;
    color: ${theme.palette.background.yellow};
  }
`;

const DonKeyIcon = styled(DonKeyLeftToRightFace)`
  height: 51px;
  width: 51px;
`;

export const ComingSoonFarmer = (props: { timerDate: string }) => {
  return (
    <>
      <Papper>
        <PapperTop className="p-3">
          <Row>
            <Col lg={12} className="d-flex align-items-center">
              <ImageWrapper>
                <DonKeyIcon />
              </ImageWrapper>
              <Title className="ml-2">New Farmer</Title>
            </Col>
          </Row>
          <CustomRow className="row justify-content-center">
            <Timer timerDate={props.timerDate} />
          </CustomRow>
        </PapperTop>
        <PapperBottom className="p-3">
          <Row>
            <Col lg={12}>
              <Heading className="mt-1">New Farmer</Heading>
              <DescriptionContent>
                <ShowMoreContent
                  content={
                    "All Don-key's are farmers, but not all farmers are Don-key's. We are screening the best of the best for you to follow soon"
                  }
                  length={85}
                />
              </DescriptionContent>

              <ComingSoonButton className="mt-4" disabled>COMING SOON</ComingSoonButton>
            </Col>
          </Row>
        </PapperBottom>
      </Papper>
    </>
  );
};
