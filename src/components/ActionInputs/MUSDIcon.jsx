import React from "react";

export const MUSDIcon = (props) => {
    return (
        <svg
            width={30}
            height={30}
            viewBox="0 0 30 30"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            {...props}
        >
            <path fill="url(#musdpat)" d="M0 0h30v30H0z" />
            <defs>
                <pattern
                    id="musdpat"
                    patternContentUnits="objectBoundingBox"
                    width={1}
                    height={1}
                >
                    <use xlinkHref="#musdicon" transform="scale(.005)" />
                </pattern>
                <image
                    id="musdicon"
                    width={200}
                    height={200}
                    xlinkHref="data:image/png;base64,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" />
            </defs>
        </svg>
    );
};
