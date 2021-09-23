import React from "react";
import styled from "styled-components";

const Label = styled.label`
  position: relative;
  display: inline-block;
  width: 51px;
  height: 31px;
  margin-bottom: 0;
  & input {
    opacity: 0;
    width: 0;
    height: 0;
  }
`;

const Slider = styled.span`
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: 0.4s;
  transition: 0.4s;
  ::before {
    position: absolute;
    content: "";
    height: 27px;
    width: 27px;
    left: 1px;
    top: 2px;
    background-color: white;
    -webkit-transition: 0.4s;
    transition: 0.4s;
    border-radius: 50%;
  }
  border-radius: 16px;
`;

const Input = styled.input`
  :checked + .slider {
    background-color: #F8C400;
  }
  :checked + .slider:before {
      left: -4px;
    -webkit-transform: translateX(26px);
    -ms-transform: translateX(26px);
    transform: translateX(26px);
  }
`;

export const Switch: React.FC<{
  checked: boolean;
  onChange: (isChecked: boolean) => void;
}> = (props) => {
  const { checked } = props;

  return (
    
      <Label>
        <Input
          type="checkbox"
          checked={checked}
          onChange={() => props.onChange(!checked)}
        />
        <Slider className="slider round"></Slider>
      </Label>
  
  );
};