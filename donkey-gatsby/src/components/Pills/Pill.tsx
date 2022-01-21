import styled, { css } from "styled-components";

export const PillContainer = styled.div`
  background-image: linear-gradient(to right, black 33%, rgba(255,255,255,0) 50%);
  background-position: top;
  background-size: 10px 1px;
  background-repeat: repeat-x;
  display: flex;
`;

export const Pill = styled.div`
  position: relative;
  padding: 24px 24px 24px 0;
  font-size: 18px;
  font-weight: 500;
  margin-right: 40px;
  cursor: pointer;

  ${(props: { active?: boolean }) =>
    props.active &&
    css`
      font-weight: 700;
      &::before {
        content: "";
        display: block;
        position: absolute;
        width: 30px;
        background-color: #000;
        height: 5px;
        top: 0;
        transform: translateY(-50%);
        left: 0;
      }
    `}
`;
