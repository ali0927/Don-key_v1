import styled from "styled-components";
import { theme } from "theme";
import { IMenuItemProps, MenuItem } from "../MenuItem";

export const DrawerItemIcon = styled.span`
  margin-right: 0.8rem;
  display: inline-block;
  transform: scale(0.8);
`;
export const DrawerItemText = styled.span``;
export const DrawerItemWrapper = styled.span`
  display: block;
  padding: 10px 20px;
  border-radius: 10px;
  width: 100%;
  transition: all 0.3s linear;
  &:hover,
  &.active {
    background-color: ${theme.palette.background.yellow};
  }
`;

const StyledMenuItem = styled(MenuItem)`
  padding: 5px 10px;
`;

export type IDrawerItemProps = IMenuItemProps & { icon?: React.ReactElement };
export const DrawerItem = ({
  to,
  href,
  children,
  target,
  onClick,
  icon,
  className,
}: IDrawerItemProps) => {
  return (
    <StyledMenuItem
      to={to}
      className={className}
      href={href}
      target={target}
      onClick={onClick}
    >
      <DrawerItemWrapper>
        {icon && <DrawerItemIcon>{icon}</DrawerItemIcon>}
        <DrawerItemText>{children}</DrawerItemText>
      </DrawerItemWrapper>
    </StyledMenuItem>
  );
};
