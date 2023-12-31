import * as React from "react"

const SvgComponent = (props: JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>) => (
  <svg
    width={22}
    height={22}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g clipPath="url(#a)">
      <path
        d="M11.025 22.051c6.09 0 11.026-4.936 11.026-11.025C22.051 4.935 17.115 0 11.026 0 4.935 0 0 4.936 0 11.025c0 6.09 4.936 11.026 11.025 11.026Z"
        fill="#F3BA2F"
        fillOpacity={0.3}
      />
      <path
        d="m8.039 9.715 2.894-2.848 2.895 2.85 1.683-1.658-4.578-4.508-4.579 4.507L8.04 9.715ZM3.55 11.026l1.682-1.682 1.682 1.682-1.682 1.681-1.681-1.68ZM8.039 12.148l2.893 2.85 2.895-2.851 1.684 1.656-4.577 4.51-4.58-4.507 1.685-1.658ZM15.137 11.026l1.681-1.682 1.682 1.68-1.682 1.684-1.681-1.682Z"
        fill="#F3BA2F"
      />
      <path
        d="m12.707 11.028-1.681-1.684-1.244 1.244-.144.143-.294.295 1.682 1.681 1.681-1.678v-.001Z"
        fill="#F3BA2F"
      />
      <g clipPath="url(#b)">
        <path
          d="M11.025 22.051c6.09 0 11.026-4.936 11.026-11.025C22.051 4.935 17.115 0 11.026 0 4.935 0 0 4.936 0 11.025c0 6.09 4.936 11.026 11.025 11.026Z"
          fill="#F3BA2F"
          fillOpacity={0.3}
        />
        <path
          d="m8.039 9.715 2.894-2.848 2.895 2.85 1.683-1.658-4.578-4.508-4.579 4.507L8.04 9.715ZM3.55 11.026 5.23 9.344l1.683 1.682-1.683 1.681-1.681-1.68ZM8.039 12.148l2.893 2.85 2.895-2.851 1.684 1.656-4.577 4.51-4.58-4.507 1.685-1.658ZM15.137 11.026l1.681-1.682 1.682 1.68-1.682 1.684-1.681-1.682Z"
          fill="#F3BA2F"
        />
        <path
          d="m12.707 11.028-1.681-1.684-1.244 1.244-.144.143-.294.295 1.682 1.681 1.681-1.678v-.001Z"
          fill="#F3BA2F"
        />
        <g clipPath="url(#c)">
          <path
            d="M11.025 22.051c6.09 0 11.026-4.936 11.026-11.025C22.051 4.935 17.115 0 11.026 0 4.935 0 0 4.936 0 11.025c0 6.09 4.936 11.026 11.025 11.026Z"
            fill="#D9DADB"
          />
          <g clipPath="url(#d)">
            <path
              d="m10.695 3.475-.097.33v9.57l.097.097 4.442-2.626-4.442-7.371Z"
              fill="#343434"
            />
            <path
              d="m10.688 3.475-4.442 7.37 4.442 2.627V3.475Z"
              fill="#8C8C8C"
            />
            <path
              d="m10.71 14.312-.055.067v3.409l.055.16 4.445-6.26-4.445 2.624Z"
              fill="#3C3C3B"
            />
            <path
              d="M10.688 17.948v-3.636l-4.442-2.624 4.442 6.26Z"
              fill="#8C8C8C"
            />
            <path
              d="m10.712 13.477 4.442-2.626-4.442-2.019v4.645Z"
              fill="#141414"
            />
            <path
              d="m6.246 10.851 4.442 2.626V8.832l-4.442 2.02Z"
              fill="#393939"
            />
          </g>
        </g>
      </g>
    </g>
    <defs>
      <clipPath id="a">
        <path fill="#fff" d="M0 0h22v22H0z" />
      </clipPath>
      <clipPath id="b">
        <path fill="#fff" d="M0 0h22v22H0z" />
      </clipPath>
      <clipPath id="c">
        <path fill="#fff" d="M0 0h22v22H0z" />
      </clipPath>
      <clipPath id="d">
        <path
          fill="#fff"
          transform="translate(3.474 3.475)"
          d="M0 0h14.474v14.474H0z"
        />
      </clipPath>
    </defs>
  </svg>
)

export default SvgComponent
