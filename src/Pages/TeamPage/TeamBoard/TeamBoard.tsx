import * as React from "react";
import { ITeamBoardProps } from "./interfaces";
import styled from "styled-components";
import { FaLinkedin, FaTwitter } from "react-icons/fa";

const UserBoard = styled.div``;

const UserRoot = styled.div`
  background: #fff;
  borderradius: 4px;
`;

const Thumb = styled.div`
  border-radius: 50%;
  overflow: hidden;
  width: 100px;
  height: 100px;
`;

export const TeamBoard: React.FC<ITeamBoardProps> = (props) => {
  const { name, designation, image, twitterlink, linkedLink } = props;

  return (
    <>
      <UserBoard className="col-md-3 mb-5">
        <UserRoot className="shadow-sm py-5 p-3 d-flex flex-column justify-content-between align-items-center h-100">
          <Thumb>
            <img className="img-fluid" src={image} />
          </Thumb>
          <h3 className="mt-4 text-center">{name}</h3>
          <p>{designation}</p>

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
        </UserRoot>
      </UserBoard>
    </>
  );
};
