import * as React from "react";
import { ITeamBoardProps } from "./interfaces";
import styled from "styled-components";
import { FaLinkedin, FaTwitter } from "react-icons/fa";
import { breakPoints } from "breakponts";

const Column = styled.div`
  margin-bottom: 140px;
  padding-left: 18px;
  padding-right: 18px;
  margin-bottom: 98px;
  @media only screen and (min-width: ${breakPoints.md}) {
    margin-bottom: 140px;
  }
`;

const CardWarpper = styled.div`
  background: #fff;
  border-radius: 20px;
  min-height: 237px;
`;

const CardContent = styled.div`
  position: absolute;
  top: -25%;
  width: 100%;
  display: flex;
  justify-content: center;
`;

const NextImage = styled.img`
  border-radius: 50%;
  overflow: hidden;
  object-fit: cover;
  object-position: center;
  width: 174px;
  height: 174px !important;
  filter: grayscale(1);
  &:hover {
    filter: grayscale(0);
  }
  transition: all 0.2s ease-in-out;
`;

const Heading3 = styled.h3`
  font-family: "Poppins";
  font-size: 21px;
  font-weight: 500;
  margin-bottom: 8px;
`;

const SubTitle = styled.p`
  font-size: 14px;
  color: #8b8b8b;
  margin-bottom: 5px;
  text-align: center;
`;

const IconsRoot = styled.div`
  width: 25%;
  & svg {
    font-size: 22px;
    & path {
      fill: #8b8b8b;
    }
  }
`;

export const TeamBoard: React.FC<ITeamBoardProps> = (props) => {
  const { name, designation, image, twitterlink, linkedLink } = props;

  return (
    <>
      <Column className="col-md-4 col-lg-3">
        <CardWarpper className="position-relative">
          <CardContent className="flex-column align-items-center">
            <NextImage className="img-fluid" src={image} alt={name} />
            <Heading3 className="mt-4 text-center">{name}</Heading3>
            <SubTitle>{designation}</SubTitle>
            <IconsRoot className="d-flex justify-content-around">
              {twitterlink && (
                <a href={twitterlink}>
                  <FaTwitter />
                </a>
              )}
              {linkedLink && (
                <a href={linkedLink}>
                  <FaLinkedin />
                </a>
              )}
            </IconsRoot>
          </CardContent>
        </CardWarpper>
      </Column>
    </>
  );
};
