import { ButtonWidget } from "components/Button";
import styled from "styled-components";
import { theme } from "theme";

export const NetworkButton = styled(ButtonWidget)`
  color: #333333;
  font-weight: 500;
  font-size: 16px;
  border-radius: 10px;
  border: none;
  height: 40px;
  border: 1px solid ${theme.palette.border.main};
  ${(props: { active?: boolean }) =>
    props.active &&
    `
    background: #000;
    color:#fff;
  box-shadow: 0px 6px 12px -6px rgba(24, 39, 75, 0.12);

  `}
`;