import styled from "styled-components";
import { Link } from "react-router-dom";

export const StyledLink = styled(Link)`
background-color: #222;
color: #fff;
font-family:Roboto;
font-weight: 400;
font-size: 16px;
padding: 12px 40px;
box-shadow: 0px 6px 12px -6px rgba(24, 39, 75, 0.12), 0px 8px 24px -4px rgba(24, 39, 75, 0.08);
border-radius: 5px;
transition: background-color 0.3s linear;
&:hover {
  text-decoration: none;
  color: #fff;
  background-color: #333;
}
`;
