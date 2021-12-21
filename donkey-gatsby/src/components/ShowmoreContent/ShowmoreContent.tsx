/* eslint-disable jsx-a11y/anchor-is-valid */
import { addDots } from "helpers";
import React, { useEffect, useState } from "react";
import Linkify from "react-linkify";
import styled from "styled-components";

const P = styled.span` 
span {
  animation-name: example;
  animation-duration: 1s;
}

@keyframes example {
  0% {opacity:0}
  100% {opacity: 1;}
}`
export const ShowMoreContent = ({
  content,
  length,
  showAllContent = false,
  onShowMoreClick = () => { },
  onShowLessClick = () => { },
  isShowLinks = false,
}: {
  content: string;
  length: number;
  showAllContent?: boolean;
  onShowMoreClick?: () => void;
  onShowLessClick?: () => void;
  isShowLinks?: boolean;
}) => {
  const [showMore, setShowMore] = useState(false);

  useEffect(() => {
    setShowMore(showAllContent);
  }, [showAllContent]);

  const hasMore = content.length > length;

  if (!hasMore) {
    if (isShowLinks) {
      return <Linkify>{content}</Linkify>;
    }
    return <>{content}</>;
  }
  if (showMore) {
    return (
      <>
        {isShowLinks && <Linkify>{content}</Linkify>}
        {!isShowLinks && content.substring(0, length)}
        <P >
          <span >{content.substring(length,)}</span>
          <a
            href="#"
            className="text-dark p-0 font-weight-bold"
            onClick={(e) => {
              e.preventDefault();
              setShowMore(false);
              onShowLessClick();
            }}
          >
            <span>Show less</span>
          </a>
        </P>
      </>
    );
  } else {
    return (
      < >
        {addDots(content, length)}
        <a
          href="#"
          className="text-dark p-0 font-weight-bold "
          onClick={(e) => {
            e.preventDefault();
            setShowMore(true);
            onShowMoreClick();
          }}
        >
          Show more
        </a>
      </ >
    );
  }
};
