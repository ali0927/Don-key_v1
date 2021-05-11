/* eslint-disable jsx-a11y/anchor-is-valid */

export const TelegramIcon = ({fill, handle}: {fill: string | undefined, handle: string | undefined}) => {
    return (
        <>
        <a href={"https://t.me/" + handle} target="_blank" rel="noreferrer">
            <svg
                width={25}
                height={24}
                viewBox="0 0 25 24"
                fill={fill}
                xmlns="http://www.w3.org/2000/svg"
            >
                <g clipPath="url(#prefix__clip0__telgram)">
                <path
                    d="M9.92 15.13l-.398 5.492c.568 0 .814-.24 1.11-.528l2.662-2.504 5.518 3.975c1.012.555 1.725.263 1.998-.916l3.622-16.693.001-.001c.321-1.472-.54-2.047-1.527-1.686l-21.29 8.017C.163 10.841.186 11.638 1.37 12l5.443 1.665 12.643-7.782c.595-.387 1.136-.173.691.215L9.92 15.129z"
                    fill={fill}
                />
                </g>
                <defs>
                <clipPath id="prefix__clip0__telgram">
                    <path
                    fill={fill}
                    transform="translate(.502 .195)"
                    d="M0 0h24v23.607H0z"
                    />
                </clipPath>
                </defs>
            </svg>
        </a>
        </>
    );
};