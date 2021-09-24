import * as React from "react";
import { IIconProps } from "./interfaces";

export const FollowersIcon = (props: IIconProps) => {
  return (
    <svg
      width={22}
      height={16}
      viewBox="0 0 22 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M14.963 0c1.826 0 3.306 1.848 3.306 4.128 0 2.28-1.48 4.129-3.306 4.129s-3.306-1.848-3.306-4.129c0-2.28 1.48-4.128 3.306-4.128zm0 .7c-1.452 0-2.666 1.515-2.666 3.428s1.214 3.429 2.666 3.429 2.666-1.516 2.666-3.429C17.629 2.215 16.415.7 14.963.7zm-.008 8.59c4.106 0 6.428 1.69 6.964 5.072.012.079.019.158.019.239 0 .745-.534 1.354-1.206 1.396l-.075.003H9.254a1.18 1.18 0 01-.22-.02c-.696-.133-1.163-.857-1.042-1.618.536-3.382 2.857-5.073 6.963-5.073zm0 .698c-3.82 0-5.855 1.483-6.332 4.493-.06.38.173.742.521.808l.055.008.055.003h11.403c.354 0 .64-.314.64-.7 0-.04-.003-.08-.009-.12-.477-3.01-2.512-4.492-6.332-4.492zm-5.75-4.724c0-2.052-1.333-3.716-2.976-3.716-1.644 0-2.976 1.664-2.976 3.716 0 2.052 1.332 3.715 2.976 3.715 1.643 0 2.975-1.663 2.975-3.715zm-5.319 0c0-1.686 1.066-3.017 2.335-3.017 1.27 0 2.335 1.332 2.335 3.016 0 1.685-1.066 3.016-2.335 3.016S3.886 6.95 3.886 5.263zm2.338 4.644c1.033 0 1.94.12 2.721.357-.202.199-.39.412-.563.641-.629-.149-1.346-.223-2.155-.223-3.215 0-4.973 1.173-5.496 3.535-.092.416.142.834.522.934.036.01.073.017.11.02l.057.002h5.737c.074.278.191.54.344.774H1.417c-.112 0-.224-.015-.333-.043-.76-.201-1.228-1.038-1.044-1.87.609-2.75 2.67-4.127 6.184-4.127z"
        fill="#222"
      />
      <path
        d="M17.8 4.072c0 1.748-1.298 3.618-2.899 3.618-1.6 0-2.897-1.87-2.897-3.618 0-1.749 1.297-3.619 2.898-3.619 1.6 0 2.897 1.87 2.897 3.619zM9.107 5.427c0 1.749-1.298 3.166-2.898 3.166S3.312 7.176 3.312 5.427c0-1.749 1.297-3.618 2.897-3.618 1.6 0 2.898 1.87 2.898 3.618zM7.45 15.83c-.827-1.357-.413-2.714 1.242-5.428-6.573-.883-7.556 2.66-7.864 3.166-.172.282-.416 1.356.41 1.809h2.898l3.315.453z"
        fill="#222"
      />
      <path
        d="M20.697 15.377H9.107c-.139 0-.415-.181-.415-.905 0-.904 2.07-4.523 6.21-4.523 4.139 0 5.795 3.166 6.209 3.619.33.362-.138 1.357-.414 1.809z"
        fill="#222"
        stroke="#222"
      />
    </svg>
  );
};
