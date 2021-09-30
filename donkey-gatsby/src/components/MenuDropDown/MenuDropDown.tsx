import React from "react";
import { IMenuDropDownProps } from "./interfaces";
import styled from "styled-components";
import { MenuItem } from "components/Navbar/MenuItem";

const DropDown = styled(MenuItem)`
  position: relative;
  /* display: block; */
  :hover .dropdown-content {
    display: block;
  }
`;

const MenuItemRoot = styled.div`
  margin-bottom: 19px;
  :last-child {
    margin-bottom: 0;
  }
`;

const DropdownContent = styled.div`
  transition: all 0.5s ease;
  display: none;
  position: absolute;
  top: 100%;
  z-index: 1;
  min-width: 201px;
  :hover {
    display: block;
  }
  ::before {
    content: "";
    position: absolute;
    margin-right: -0.71em;
    height: 42px;
    top: -12%;
    left: 20%;
    width: 17px;
    background-color: #fff;
    transform: translate(-50%, 50%) rotate(316deg);
    clip-path: polygon(
      -5px -5px,
      calc(100% + 5px) -5px,
      calc(100% + 5px) calc(100% + 5px)
    );
  }
`;

const DropdownInner = styled.div`
  padding: 30px;
  margin-top: 16px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0px 4px 30px rgba(0, 0, 0, 0.1);

`;

const DropdownItem = styled.a`
  font-family: "Poppins";
  font-size: 12px;
  font-weight: 500;
  color: #000;
  :hover {
    color: #000;
    text-decoration: none;
  }
`;

export const MenuDropDown: React.FC<IMenuDropDownProps> = (props) => {
  const { label, listItems } = props;

  return (
    <DropDown enableHoverUnderLine={false}>
      <>
        {label}
        <DropdownContent className="dropdown-content">
          <DropdownInner>
            {listItems.map((item, index) => {
              return (
                <MenuItemRoot key={index}>
                  <DropdownItem
                    href={item.href}
                    target={item.target ? item.target : "_self"}
                  >
                    {item.text}
                  </DropdownItem>
                </MenuItemRoot>
              );
            })}
          </DropdownInner>
        </DropdownContent>
      </>
    </DropDown>
  );
};
