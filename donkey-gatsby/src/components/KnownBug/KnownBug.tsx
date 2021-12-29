import { IoMdClose } from "react-icons/io";
import React, { useState } from "react";
import styled from "styled-components";

const ContentHolder = styled.div`
  position: relative;
  background: #000000;
  border-radius: 15px;
  padding: 20px 70px 20px 40px;
  display: flex;
  justify-content: flex-end;
  margin-bottom: 50px;
  min-height: 132px;
`;

const Title = styled.h4`
  color: #fff;
  font-weight: 700;
`;

const Content = styled.p`
  color: #fff;
  font-size: 14px;
  font-weight: 400;
  margin: 0;
`;

const Exclamation = (props: React.SVGProps<any>) => {
  return (
    <svg
      width={78}
      height={78}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M39 68.64c-18.954 0-34.32-15.366-34.32-34.32S20.046 0 39 0c18.955 0 34.32 15.366 34.32 34.32 0 8.923-3.405 17.05-8.987 23.154-.719.787-1.153 1.8-1.153 2.867v12.846c0 2.95-3.083 4.885-5.739 3.602l-16.856-8.137a.013.013 0 0 1 0-.023c.013-.006.009-.025-.005-.025a34.91 34.91 0 0 1-1.58.036Z"
        fill="#FFC406"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M42.129 36.565a3 3 0 0 1-3 3h-.261a3 3 0 0 1-3-3V23.087a3 3 0 0 1 3-3h.26a3 3 0 0 1 3 3v13.478Zm-3.13 11.348a3.13 3.13 0 1 1 0-6.26 3.13 3.13 0 0 1 0 6.26Z"
        fill="#fff"
      />
    </svg>
  );
};

const Bubbles = (props: React.SVGProps<any>) => {
  return (
    <svg
      width={104}
      height={82}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <circle cx={93} cy={14} r={11} fill="#464645" />
      <circle cx={63.203} cy={39.119} r={4.16} fill="#464645" />
      <circle cx={11.992} cy={2.773} r={2.773} fill="#464645" />
      <path
        d="M78.87 69.138c31.061 27.818 33.689 75.55 5.87 106.61-27.819 31.061-75.55 33.689-106.61 5.87-31.061-27.819-33.689-75.551-5.87-106.611C-14.398 60.11 3.526 51.753 21.993 50.159c4.298-.371 7.842-3.812 7.833-8.126l-.003-1.692c-.004-2.068-1.327-3.853-2.887-5.21-4.48-3.9-4.952-10.694-1.052-15.175 3.9-4.48 10.693-4.951 15.174-1.052 4.48 3.9 4.952 10.694 1.052 15.174-.332.382-.685.734-1.056 1.058-2.649 2.308-5.48 5.127-5.473 8.641.006 3.646 2.793 6.654 6.38 7.3 13.294 2.396 26.11 8.388 36.91 18.06Z"
        fill="#464645"
      />
    </svg>
  );
};

export const KnownBug = (props: { title: string; content: string }) => {
  const [isShown, setIsShown] = useState(true);
  if (!isShown) {
    return null;
  }
  return (
    <ContentHolder>
      <Exclamation style={{ position: "absolute", top: -45, left: 0 }} />
      <div
        style={{
          position: "absolute",
          overflow: "hidden",
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          borderRadius: 15,
        }}
      >
        <Bubbles
          style={{ position: "absolute", bottom: -2, opacity: 0.6, left: 0 }}
        />
      </div>
      <div style={{ maxWidth: "85%" }}>
        <Title>{props.title}</Title>
        <Content>{props.content}</Content>
      </div>
      <IoMdClose
        style={{ position: "absolute", cursor: "pointer", top: 20, right: 20 }}
        size={32}
        onClick={() => setIsShown(false)}
        color="#fff"
      />
    </ContentHolder>
  );
};
