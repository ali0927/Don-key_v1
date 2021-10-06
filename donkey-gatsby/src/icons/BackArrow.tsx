import React from "react";

export const BackArrow:React.FC = (props: any) => {
    return (
      <svg
        width={21}
        height={10}
        viewBox="0 0 21 10"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
      >
        <path
          d="M.117 5.16a.688.688 0 01.086-.87L4.328.165a.688.688 0 01.97.97L2.347 4.09h17.59a.687.687 0 010 1.375H2.348l2.95 2.953a.687.687 0 11-.97.97L.203 5.262a.615.615 0 01-.086-.103z"
          fill="#222"
        />
      </svg>
    );
  };