/* eslint-disable jsx-a11y/anchor-is-valid */
import { useState } from "react";

export const ShowMoreContent = ({
    content,
    length,
}: {
    content: string;
    length: number;
}) => {
    const [showMore, setShowMore] = useState(false);

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
                    }}
                >
                    Show more
                </a>
            </>
        );
    }
};