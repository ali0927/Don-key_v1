import * as React from "react";
import { Container } from "react-bootstrap";
import { FaReddit } from "react-icons/fa";
import styled from "styled-components";
import { theme } from "theme";

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
    color:${theme.palette.background.yellow};

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
  .coinGeckocls-1 {
    fill: #8dc63f;
  }
  .coinGeckocls-2 {
    fill: #f9e988;
  }
  .coinGeckocls-3 {
    fill: #fff;
  }
  .coinGeckocls-4 {
    fill: #8bc53f;
  }
  .coinGeckocls-5 {
    fill: #009345;
  }
  .coinGeckocls-6 {
    fill: #58595b;
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
              <a
                href="https://don-key-finance.medium.com/"
                target="_blank"
                rel="noreferrer"
              >
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
              <a
                href="https://t.me/don_key_finance"
                target="_blank"
                rel="noreferrer"
              >
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
              <a
                href="https://www.coingecko.com/en/coins/don-key"
                target="_blank"
                rel="noreferrer"
              >
                <svg
                  id="Layer_1"
                  width={25}
                  height={24}
                  data-name="Layer 1"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 276 276"
                >
                  <defs></defs>
                  <title>CoinGecko</title>
                  <g id="Coin_Gecko_AI" data-name="Coin Gecko AI">
                    <path
                      className="coinGeckocls-1"
                      fill="#fff"
                      d="M276,137.39A138,138,0,1,1,137.39,0h0A138,138,0,0,1,276,137.39Z"
                      transform="translate(0 0)"
                    />
                    <path
                      className="coinGeckocls-2"
                      fill="#fff"
                      d="M265.65,137.44a127.63,127.63,0,1,1-128.21-127h0A127.65,127.65,0,0,1,265.65,137.44Z"
                      transform="translate(0 0)"
                    />
                    <path
                      className="coinGeckocls-3"
                      fill="#fff"
                      d="M140.35,18.66a70.18,70.18,0,0,1,24.53,0,74.75,74.75,0,0,1,23.43,7.85c7.28,4,13.57,9.43,19.83,14.52s12.49,10.3,18.42,16a93.32,93.32,0,0,1,15.71,19,108.28,108.28,0,0,1,11,22.17c5.33,15.66,7.18,32.53,4.52,48.62H257c-2.67-15.95-6.29-31.15-12-45.61A177.51,177.51,0,0,0,235.56,80,209.1,209.1,0,0,0,223.14,60a72.31,72.31,0,0,0-16.64-16.8c-6.48-4.62-13.93-7.61-21.14-10.45S171,27,163.48,24.84s-15.16-3.78-23.14-5.35Z"
                      transform="translate(0 0)"
                    />
                    <path
                      className="coinGeckocls-4"
                      fill="#fff"
                      d="M202.74,92.39c-9.26-2.68-18.86-6.48-28.58-10.32-.56-2.44-2.72-5.48-7.09-9.19-6.35-5.51-18.28-5.37-28.59-2.93-11.38-2.68-22.62-3.63-33.41-1C16.82,93.26,66.86,152.57,34.46,212.19c4.61,9.78,54.3,66.84,126.2,51.53,0,0-24.59-59.09,30.9-87.45C236.57,153.18,269.09,110.46,202.74,92.39Z"
                      transform="translate(0 0)"
                    />
                    <path
                      className="coinGeckocls-3"
                      fill="#fff"
                      d="M213.64,131.2a5.35,5.35,0,1,1-5.38-5.32A5.36,5.36,0,0,1,213.64,131.2Z"
                      transform="translate(0 0)"
                    />
                    <path
                      className="coinGeckocls-5"
                      fill="#fff"
                      d="M138.48,69.91c6.43.46,29.68,8,35.68,12.12-5-14.5-21.83-16.43-35.68-12.12Z"
                      transform="translate(0 0)"
                    />
                    <path
                      className="coinGeckocls-3"
                      fill="#fff"
                      d="M144.6,106.58a24.68,24.68,0,1,1-24.69-24.67h0a24.68,24.68,0,0,1,24.68,24.66Z"
                      transform="translate(0 0)"
                    />
                    <path
                      className="coinGeckocls-6"
                      fill="#fff"
                      d="M137.28,106.8a17.36,17.36,0,1,1-17.36-17.36h0A17.36,17.36,0,0,1,137.28,106.8Z"
                      transform="translate(0 0)"
                    />
                    <path
                      className="coinGeckocls-4"
                      fill="#fff"
                      d="M233.63,142.08c-20,14.09-42.74,24.78-75,24.78-15.1,0-18.16-16-28.14-8.18-5.15,4.06-23.31,13.14-37.72,12.45S55,162,48.49,131.23C45.91,162,44.59,184.65,33,210.62c23,36.83,77.84,65.24,127.62,53C155.31,226.27,188,189.69,206.34,171c7-7.09,20.3-18.66,27.29-28.91Z"
                      transform="translate(0 0)"
                    />
                    <path
                      className="coinGeckocls-6"
                      fill="#fff"
                      d="M232.85,143c-6.21,5.66-13.6,9.85-21.12,13.55a134.9,134.9,0,0,1-23.7,8.63c-8.16,2.11-16.67,3.7-25.29,2.92s-17.43-3.71-23.14-10.17l.27-.31c7,4.54,15.08,6.14,23.12,6.37a108.27,108.27,0,0,0,24.3-2,132.71,132.71,0,0,0,23.61-7.3c7.63-3.15,15.18-6.8,21.68-12Z"
                      transform="translate(0 0)"
                    />
                  </g>
                </svg>
              </a>
            </li>
            <li>
              <a
                href="https://twitter.com/Don_key_finance"
                target="_blank"
                rel="noreferrer"
              >
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
            <li>
              <a
                href="https://www.reddit.com/r/don_key_finance/"
                target="_blank"
                rel="noreferrer"
              >
                <FaReddit size={24} color="#fff" />
              </a>
            </li>
            <li>
              <a
                href="https://coinmarketcap.com/currencies/don-key/ico/"
                target="_blank"
                rel="noreferrer"
              >
                <svg
                  width={25}
                  height={24}
                  viewBox="0 0 76.52 77.67"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="m66.54 46.41a4.09 4.09 0 0 1 -4.17.28c-1.54-.87-2.37-2.91-2.37-5.69v-8.52c0-4.09-1.62-7-4.33-7.79-4.58-1.34-8 4.27-9.32 6.38l-8.1 13.11v-16c-.09-3.69-1.29-5.9-3.56-6.56-1.5-.44-3.75-.26-5.94 3.08l-18.11 29.07a32 32 0 0 1 -3.64-14.94c0-17.52 14-31.77 31.25-31.77s31.3 14.25 31.3 31.77v.09s0 .06 0 .09c.17 3.39-.93 6.09-3 7.4zm10-7.57v-.17c-.14-21.35-17.26-38.67-38.29-38.67s-38.25 17.42-38.25 38.83 17.16 38.84 38.25 38.84a37.81 37.81 0 0 0 26-10.36 3.56 3.56 0 0 0 .18-5 3.43 3.43 0 0 0 -4.86-.23 30.93 30.93 0 0 1 -44.57-2.08l16.3-26.2v12.09c0 5.81 2.25 7.69 4.14 8.24s4.78.17 7.81-4.75l9-14.57c.28-.47.55-.87.79-1.22v7.41c0 5.43 2.18 9.77 6 11.91a11 11 0 0 0 11.21-.45c4.2-2.73 6.49-7.67 6.25-13.62z"
                    fill="#fff"
                  />
                </svg>
              </a>
            </li>
          </ul>
        </Container>
      </CommunityRoot>
    </>
  );
};
