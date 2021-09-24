import { GatsbyLinkProps, Link } from "gatsby";
import React from "react";
export const Navigate = ({ to, ...rest }: GatsbyLinkProps<any>) => {
  //@ts-ignore
  return <Link to={to} {...rest} />;
};
