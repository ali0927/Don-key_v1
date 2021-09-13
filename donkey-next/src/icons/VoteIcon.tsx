import * as React from "react"
import { IIconProps } from "./interfaces";

export const VoteIcon = (props: IIconProps) => {
    return (
        <svg
            width={27}
            height={27}
            viewBox="0 0 27 27"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <path
                d="M8.986 15.774v-1.888c0-.655-.531-1.187-1.187-1.187H.527v13.677H7.8c.656 0 1.187-.532 1.187-1.187v-9.415z"
                fill="#F4E41C"
            />
            <path
                d="M24.764 16.215h-1.372a1.71 1.71 0 000-3.42h-6.603l1.002-2.975a3.03 3.03 0 00-1.99-3.867l-.926-.281-1.454 4.018a5.485 5.485 0 01-2.534 2.951l-1.935 1.054.035 11.771 1.23.483c.882.345 1.82.523 2.768.523h9.214a1.71 1.71 0 000-3.42h1.33a1.71 1.71 0 100-3.418h1.235a1.71 1.71 0 000-3.42z"
                fill="#FAF9F3"
            />
            <path
                d="M8.986 17.29a.531.531 0 00-.373.153.53.53 0 00.373.9.529.529 0 00.373-.9.53.53 0 00-.373-.154z"
                fill="#000"
            />
            <path
                d="M27 17.924a2.24 2.24 0 00-1.747-2.182c.237-.355.375-.78.375-1.237a2.24 2.24 0 00-2.237-2.237h-5.868l.767-2.279a3.53 3.53 0 00-.208-2.764 3.53 3.53 0 00-2.129-1.776l-.925-.281a.527.527 0 00-.65.325L12.926 9.51a4.954 4.954 0 01-2.292 2.667l-1.452.791a1.713 1.713 0 00-1.382-.701H.527a.527.527 0 00-.527.527v13.677c0 .291.236.527.527.527H7.8c.631 0 1.183-.342 1.48-.851l.745.292c.947.371 1.943.56 2.96.56H22.2a2.24 2.24 0 002.237-2.237c0-.461-.14-.89-.38-1.246a2.24 2.24 0 001.709-2.174c0-.47-.146-.906-.395-1.266A2.24 2.24 0 0027 17.924zm-2.237 1.183H19.34a.527.527 0 000 1.054h4.189c.652 0 1.182.53 1.182 1.182 0 .652-.53 1.183-1.182 1.183h-4.189a.527.527 0 000 1.054H22.2a1.184 1.184 0 010 2.365h-9.215a7.023 7.023 0 01-2.575-.487l-.895-.351v-9.334c0-.291-.236-.896-.528-.896-.29 0-.527.605-.527.896v9.512a.66.66 0 01-.66.66H1.055V13.323h6.744a.66.66 0 01.66.66v1.79a.527.527 0 001.055 0V13.99l1.624-.885a6.008 6.008 0 002.779-3.235L15.2 6.322l.446.136a2.484 2.484 0 011.498 1.25c.313.606.365 1.297.147 1.944l-1.002 2.975a.528.528 0 00.5.696h6.602a1.183 1.183 0 010 2.364h-4.052a.527.527 0 000 1.055H24.763c.652 0 1.182.53 1.182 1.182 0 .652-.53 1.183-1.182 1.183zM15.66 1.078c-.298 0-.54.327-.54.73v1.78c0 .403.242.73.54.73.298 0 .54-.327.54-.73v-1.78c0-.403-.242-.73-.54-.73z"
                fill="#000"
            />
            <path
                d="M18.898 7.45c0 .29.236.527.527.527h3.252a.527.527 0 000-1.055h-3.252a.527.527 0 00-.527.527zM8.835 7.977h3.252a.527.527 0 000-1.055H8.835a.527.527 0 000 1.055zM12.402 4.842a.526.526 0 00.745 0 .527.527 0 000-.746l-1.535-1.535a.527.527 0 00-.746.745l1.536 1.536zM18.741 4.996c.135 0 .27-.051.373-.154l1.535-1.536a.527.527 0 00-.745-.745l-1.536 1.535a.527.527 0 00.373.9z"
                fill="#000"
            />
        </svg>
    )
}
