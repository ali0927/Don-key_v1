import { Link } from "gatsby";
import styled, { css } from "styled-components";
import { theme } from "theme";

const buttonStyles = css`
  border-radius: 10px;
  display: inline-block;
  padding: 10px 15px;
  transition: all 0.3s linear;
  background-color: #fff;
  border: 0 solid #fff;
  color: #222;
  text-decoration: none !important;
  &:hover {
    color: #222;
    background-color: #f1f1f1;
  }

  ${theme.mediaQueries.lg.up} {
    background-color: transparent;
    border: 2px solid #222;
    color: #222;
    &:hover {
      color: #fff;
      background-color: #222;
      text-decoration: none;
    }
  }
`;

const StyledButtonLink = styled(Link)`
  ${buttonStyles}
`;
const StyledButton = styled.button`
  ${buttonStyles}
`;

export const NavButton = ({
  to,
  children,
  target,
  onClick,
  disabled,
  className
}: {
  to?: string;
  children: React.ReactNode;
  target?: React.HTMLAttributeAnchorTarget;
  onClick?: (e: React.MouseEvent) => void;
  disabled?: boolean;
  className?: string;
}) => {
  if (to) {
    return (
      <StyledButtonLink className={className} target={target} onClick={onClick} to={to}>
        {children}
      </StyledButtonLink>
    );
  }

  return (
    <StyledButton className={className} disabled={disabled} onClick={onClick}>
      {children}
    </StyledButton>
  );
};
