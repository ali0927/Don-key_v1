import styled from "styled-components";


export const LightGrayButton = styled.button`
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      background-color:(0deg, #F2F4F7 0%, #F0F2F5 48.04%, #FFFFFF 100%); 
      border: line;
      font-size: 16px;
      font-weight: 400;
      border-radius: 5px;
      padding: 0.6rem;
      transition: all 0.3s linear;
      &:hover {
         background-color: rgba(244, 228, 28, 0.8)
      }
      &--outlined {
         background-color: #fff;
         border: 1px solid #000;
      &:hover {
         background-color: rgba(0, 0, 0, 0.5);
     }

     &:focus {
      outline: none; 
    }
`;

export const ContainedButton = styled.button`
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      background-color: #f4e41c; 
      border: none;
      font-size: 14px;
      font-weight: 400;
      border-radius: 5px;
      padding: 0.6rem;
      transition: all 0.3s linear;
      &:hover {
         background-color: rgba(244, 228, 28, 0.8)
      }
      &--outlined {
         background-color: #fff;
         border: 1px solid #000;
      &:hover {
         background-color: rgba(0, 0, 0, 0.5);
     }

     &:focus {
      outline: none; 
    }
`;

export const OutlinedButton = styled(ContainedButton)`
  background-color: #fff;
  border: 1px solid #000;
`;
