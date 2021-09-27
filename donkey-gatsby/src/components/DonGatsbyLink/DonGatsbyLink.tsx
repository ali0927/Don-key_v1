import { Link } from "gatsby";

export type IDonGatsbyLinkProps = {
  href?: string;
  to?: string;
  children: React.ReactNode;
  target?: React.HTMLAttributeAnchorTarget;
  onClick?: (e: React.MouseEvent) => void;
  className?: string;
};

export const DonGatsbyLink = ({ to, href, ...props }: IDonGatsbyLinkProps) => {
  if (to) {
    return <Link {...props} to={to} />;
  }

  return <a {...props} href={href} />;
};
