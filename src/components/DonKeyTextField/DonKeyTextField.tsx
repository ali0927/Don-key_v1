import * as React from "react";
import { Form } from "react-bootstrap";
import { IDonKeyFieldInfoState, IDonKeyFieldProps } from "./interfaces";
import styled from "styled-components";
import { DonKeySpinner } from "components/DonkeySpinner";
import clsx from "clsx";

const FormGroup = styled(Form.Group)`
  & textarea::-webkit-scrollbar {
    width: 4px !important;
    border-radius: 10px;
  };

  /* Track */
  & textarea::-webkit-scrollbar-track {
    background: #f1f1f1;
  };

  /* Handle */
  & textarea::-webkit-scrollbar-thumb {
    background: #bbb;
    border-radius: 10px;
  };

  /* Handle on hover */
  & textarea::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
`

const Label = styled(Form.Label)`
  font-family: Roboto;
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 19px;
  display: flex;
  align-items: center;
  text-align: center;
  text-transform: capitalize;
  box-shadow: none !important;
  color: #232323;
  &:focus {
    outline: none;
  }
`;

const FormControl = styled(Form.Control)`
  border: 1px solid;
  border-color: ${(props: { info: IDonKeyFieldInfoState["type"] }) =>
    props.info === "error"
      ? "#dc3545"
      : props.info === "success"
      ? "#198754"
      : "#848484"};
  border-radius: 5px !important;
  font-family: Roboto;
  height: 50px;
  &:focus {
    box-shadow: 0 0 0 0.2rem rgb(0 123 255 / 25%);
    outline: none;
  };
`;

const MultilineFormControl = styled(FormControl)`
  height: 127px !important;
  resize: none;
`;

const SpinnerRoot = styled.div`
  position: absolute;
  right: 4%;
  top: 50%;
  transform: translateY(-50%);
  .spinner-border {
    border: 0.05em solid #848484;
    border-right-color: transparent;
  }
`;

const Caption = styled.p`
  font-family: Roboto;
  font-size: 13px;
  font-style: normal;
  font-weight: 400;
  color: ${(props: { info: IDonKeyFieldInfoState["type"] }) =>
    props.info === "error" ? "red" : "green"};
  margin: 0;
`;

export const DonKeyTextField: React.FC<IDonKeyFieldProps> = (props) => {
  const {
    label,
    value,
    placeholder,
    info,
    multiline = false,
    rows = 3,
    loading = false,
    isRequired = false,
  } = props;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    props.onChange(e.target.value);
  };

  const handleOnFocus = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (props.onFocus) {
      props.onFocus(e.target.value);
    }
  };

  const handleBlur = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (props.onBlur) {
      props.onBlur(e.target.value);
    }
  };

  const formControl = () => {
    if (!multiline) {
      return (
        <FormControl
          as="input"
          //error={false}
          info={(info && info.type) as "success"}
          className="w-100 pl-2"
          onChange={handleChange}
          value={value}
          placeholder={placeholder}
          onFocus={handleOnFocus}
          onBlur={handleBlur}
        />
      );
    }
    return (
      <MultilineFormControl
        as="textarea"
        info={(info && info.type) as "success"}
        className="w-100 p-3"
        rows={rows}
        onChange={handleChange}
        value={value}
        placeholder={placeholder}
        onFocus={handleOnFocus}
        onBlur={handleBlur}
      />
    );
  };

  return (
    <>

      <FormGroup className={clsx("", props.className)} controlId={label}>
        <Label>
          {label}
          {isRequired && <span>Required</span>}
        </Label>
        <div className="position-relative">
          {formControl()}

          {loading && (
            <SpinnerRoot>
              <DonKeySpinner />
            </SpinnerRoot>
          )}
        </div>
        {info && <Caption info={info.type}>{info.msg}</Caption>}
      </FormGroup>
     
    </>
  );
};
