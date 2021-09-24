import { ButtonWidget } from "components/Button";
import styled from "styled-components";
import { theme } from "theme";

export const NetworkButton = styled(ButtonWidget)`
  color: #333333;
  font-weight: 500;
  font-size: 16px;
  border-radius: 10px;
  border: none;
  height: 50px;
  ${(props: { active?: boolean }) =>
    props.active &&
    `
  border: 1px solid ${theme.palette.border.main};;
  box-shadow: 0px 6px 12px -6px rgba(24, 39, 75, 0.12);

  `}
`;