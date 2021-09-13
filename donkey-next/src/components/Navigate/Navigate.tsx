import Link from "next/link";
import React from "react";

export const Navigate = ({
  to,
  ...rest
}: { to: string } & React.DetailedHTMLProps<React.AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement>) => {
  return (
    <Link href={to} passHref>
      <a {...rest} />
    </Link>
  );
};
