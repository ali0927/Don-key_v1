/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import Linkify from "react-linkify";

export const ShowMoreContent = ({
  content,
  length,
  showAllContent = false,
  onShowMoreClick = () => {},
  onShowLessClick = () => {},
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
        {!isShowLinks && content + " "}
        <a
          href="#"
          className="text-dark p-0 font-weight-bold"
          onClick={(e) => {
            e.preventDefault();
            setShowMore(false);
            onShowLessClick();
          }}
        >
          Show less
        </a>
      </>
    );
  } else {
    return (
      <>
        {content.slice(0, length) + "... "}
        <a
          href="#"
          className="text-dark p-0 font-weight-bold"
          onClick={(e) => {
            e.preventDefault();
            setShowMore(true);
            onShowMoreClick();
          }}
        >
          Show more
        </a>
      </>
    );
  }
};
