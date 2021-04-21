import * as React from "react";
import { Form } from "react-bootstrap";
import { IDonKeyFieldProps } from "./interfaces";
import styled from "styled-components";

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
`

const FormControl = styled(Form.Control)`
    border: 1px solid #848484 !important;
    border-radius: 5px !important;
    font-family: Roboto;
    height: 50px;
`

const MultilineFormControl = styled(FormControl)`
    height: 127px !important;
    &:focus {
        outline: none;
    }
`


export const DonKeyTextField: React.FC<IDonKeyFieldProps> = (props) => {

    const { label, value, placeholder, multiline = false, rows = 3 } = props;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        props.onChange(e.target.value);
    }

    const formControl = () => {
        if (!multiline) {
            return <FormControl
                onChange={handleChange}
                value={value}
                placeholder={placeholder}
            />
        }
        return <MultilineFormControl
            as="textarea"
            className="w-100 p-3"
            rows={rows}
            onChange={handleChange}
            value={value}
            placeholder={placeholder}
        />
    }

    return (
        <>
            <Form.Group className={props.className} controlId={label}>
                <Label>{label}</Label>
                {formControl()}
            </Form.Group>
        </>
    )
}

