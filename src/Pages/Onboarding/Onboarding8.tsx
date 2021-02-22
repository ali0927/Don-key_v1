import React from "react";
import { FaChevronRight } from "react-icons/fa";
import { Onboard5Icon } from "./Onboard5Icon";
import { OnboardLayout } from "./OnboardLayout";
import Select from "react-select";

const options = [
    {
        value: "Value",
        label: "value",
    },
    {
        value: "Value2",
        label: "value2",
    },
    {
        value: "Value3",
        label: "value3",
    },
];

const colourStyles = {
    control: (styles:any) => ({ ...styles, backgroundColor: 'white', outline: "none" }),
    option: (styles: any, {  isDisabled, isFocused, isSelected }: any) => {
      const color = "#f6c301"
      return {
        ...styles,
        backgroundColor: isDisabled
          ? null
          : isSelected
          ? "#ebebeb"
          : isFocused
          ? `#ebebeb`
          : null,
        color: "#333" ,
        cursor: isDisabled ? 'not-allowed' : 'default',
  
        ':active': {
          ...styles[':active'],
          backgroundColor:
            !isDisabled && "#ebebeb",
        },
      };
    },
   
  };

export const Onboarding8 = () => {
    return (
        <OnboardLayout icon={<Onboard5Icon />}>
            <div className="row">
                <div className="col-8">
                    <h3>Your Attitude to Risk</h3>
                    <p className="text-muted">
                        How much do you plan to deposit into your BYield account
                        over the course of the year?
                    </p>
                    <div className="row">
                        <div className="col-8">
                            <Select
                                className="basic-single"
                                classNamePrefix="select"
                                placeholder="Please Select"
                                options={options}
                                styles={colourStyles}
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div className="d-flex justify-content-end">
                <div className="onboard-next">
                    <FaChevronRight size={22} />
                </div>
            </div>
        </OnboardLayout>
    );
};
