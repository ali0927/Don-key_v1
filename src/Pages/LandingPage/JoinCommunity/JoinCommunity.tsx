import * as React from "react";
import { Container } from "react-bootstrap";
import styled from "styled-components";

const CommunityRoot = styled.div`
  background: #222222;
  display: flex;
  align-items: center;
  justify-content: center;
  & h4 {
    font-family: ObjectSans-Bold;
    font-weight: bold;
    font-size: 45px;
    line-height: 48px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #ffca00;

    /* media queries */
    @media (max-width: 767px) {
      font-size: 26px;
      line-height: 36px;
    }
  }
  & p {
    font-weight: normal;
    font-size: 20px;
    line-height: 31px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #a8a8a8;
  }
  & ul {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  & ul li {
    list-style-type: none;
    margin: 20px;
  }
`;

export const JoinCommunity: React.FC = () => {
  return (
    <>
      <CommunityRoot className="pt-5 pb-5 text-center">
        <Container>
          <h4 className="mt-4 pt-3">Join the Don-key Community</h4>
          <p className="mt-5">Follow us on Social Media</p>
          <ul className="pl-0 mt-3 pb-3">
            <li>
              <a href="https://medium.com/@don-key.finance">
                <svg
                  width={25}
                  height={24}
                  viewBox="0 0 25 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clipPath="url(#prefix__medium)">
                    <path
                      d="M22.587 4.853l1.915-1.802v-.395h-6.634L13.14 14.231 7.76 2.656H.806v.395L3.042 5.7a.915.915 0 01.303.77v10.41c.069.374-.055.76-.323 1.032l-2.52 3.004v.39h7.145v-.395l-2.52-2.999a1.211 1.211 0 01-.347-1.033V7.875l6.272 13.435h.729l5.393-13.435v10.703c0 .282 0 .34-.188.525l-1.94 1.846v.396h9.412v-.395l-1.87-1.8a.543.543 0 01-.214-.526V5.378a.54.54 0 01.213-.525z"
                      fill="#fff"
                    />
                  </g>
                  <defs>
                    <clipPath id="prefix__medium">
                      <path
                        fill="#fff"
                        transform="translate(.502 .195)"
                        d="M0 0h24v23.607H0z"
                      />
                    </clipPath>
                  </defs>
                </svg>
              </a>
            </li>
            <li>
              <a href="https://t.me/don_key_finance">
                <svg
                  width={25}
                  height={24}
                  viewBox="0 0 25 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clipPath="url(#prefix__clip0__telgram)">
                    <path
                      d="M9.92 15.13l-.398 5.492c.568 0 .814-.24 1.11-.528l2.662-2.504 5.518 3.975c1.012.555 1.725.263 1.998-.916l3.622-16.693.001-.001c.321-1.472-.54-2.047-1.527-1.686l-21.29 8.017C.163 10.841.186 11.638 1.37 12l5.443 1.665 12.643-7.782c.595-.387 1.136-.173.691.215L9.92 15.129z"
                      fill="#fff"
                    />
                  </g>
                  <defs>
                    <clipPath id="prefix__clip0__telgram">
                      <path
                        fill="#fff"
                        transform="translate(.502 .195)"
                        d="M0 0h24v23.607H0z"
                      />
                    </clipPath>
                  </defs>
                </svg>
              </a>
            </li>
            <li>
              <a href="https://twitter.com/Don_key_finance">
                <svg
                  width={25}
                  height={24}
                  viewBox="0 0 25 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clipPath="url(#prefix__clip0_twitter)">
                    <path
                      d="M22.036 7.113a9.822 9.822 0 002.466-2.554v-.001c-.893.391-1.843.651-2.835.777a4.894 4.894 0 002.165-2.719 9.845 9.845 0 01-3.12 1.191 4.919 4.919 0 00-8.511 3.364c0 .39.033.765.114 1.122-4.09-.2-7.71-2.16-10.142-5.147a4.962 4.962 0 00-.674 2.487c0 1.704.877 3.214 2.186 4.089a4.863 4.863 0 01-2.223-.606v.054a4.943 4.943 0 003.942 4.835c-.401.11-.837.162-1.29.162-.315 0-.633-.018-.931-.084.637 1.948 2.447 3.381 4.597 3.428a9.89 9.89 0 01-6.101 2.098c-.403 0-.79-.018-1.177-.067A13.856 13.856 0 008.05 21.75c8.683 0 14.342-7.244 13.986-14.637z"
                      fill="#fff"
                    />
                  </g>
                  <defs>
                    <clipPath id="prefix__clip0_twitter">
                      <path
                        fill="#fff"
                        transform="translate(.502)"
                        d="M0 0h24v24H0z"
                      />
                    </clipPath>
                  </defs>
                </svg>
              </a>
            </li>
          </ul>
        </Container>
      </CommunityRoot>
    </>
  );
};
