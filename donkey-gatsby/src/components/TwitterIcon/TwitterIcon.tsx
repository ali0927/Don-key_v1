/* eslint-disable jsx-a11y/anchor-is-valid */

export const TwitterIcon = ({fill, handle, width = 24, height = 24}: {fill: string | undefined, handle: string | undefined, width?: number | undefined, height?: number | undefined}) => {
    return (
        <>
         <a href={"https://twitter.com/" + handle} target="_blank" rel="noreferrer">
            <svg
                width={width}
                height={height}
                viewBox="0 0 25 24"
                fill={fill}
                xmlns="http://www.w3.org/2000/svg"
            >
                <g clipPath="url(#prefix__clip0_twitter)">
                <path
                    d="M22.036 7.113a9.822 9.822 0 002.466-2.554v-.001c-.893.391-1.843.651-2.835.777a4.894 4.894 0 002.165-2.719 9.845 9.845 0 01-3.12 1.191 4.919 4.919 0 00-8.511 3.364c0 .39.033.765.114 1.122-4.09-.2-7.71-2.16-10.142-5.147a4.962 4.962 0 00-.674 2.487c0 1.704.877 3.214 2.186 4.089a4.863 4.863 0 01-2.223-.606v.054a4.943 4.943 0 003.942 4.835c-.401.11-.837.162-1.29.162-.315 0-.633-.018-.931-.084.637 1.948 2.447 3.381 4.597 3.428a9.89 9.89 0 01-6.101 2.098c-.403 0-.79-.018-1.177-.067A13.856 13.856 0 008.05 21.75c8.683 0 14.342-7.244 13.986-14.637z"
                    fill={fill}
                />
                </g>
                <defs>
                <clipPath id="prefix__clip0_twitter">
                    <path
                    fill={fill}
                    transform="translate(.502)"
                    d="M0 0h24v24H0z"
                    />
                </clipPath>
                </defs>
            </svg>
            </a>
        </>
    );
};