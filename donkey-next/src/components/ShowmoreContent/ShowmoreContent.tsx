/* eslint-disable jsx-a11y/anchor-is-valid */
import { useEffect, useState } from "react";

export const ShowMoreContent = ({
    content,
    length,
    showAllContent=false,
    onShowMoreClick=()=>{},
    onShowLessClick=()=>{},
}: {
    content: string;
    length: number;
    showAllContent?: boolean;
    onShowMoreClick?: () => void;
    onShowLessClick?: () => void;
    
}) => {
    const [showMore, setShowMore] = useState(false);

    useEffect(()=>{
        setShowMore(showAllContent);
    },[showAllContent])


    const hasMore = content.length > length;

    if (!hasMore) {
        return <>{content}</>;
    }
    if (showMore) {
        return (
            <>
                {content + " "}
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