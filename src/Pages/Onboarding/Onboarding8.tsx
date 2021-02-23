import { useAutocomplete } from "@material-ui/lab";
import React from "react";
import { FaChevronRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import Select from "react-select";
import { Onboard5Icon } from "./Onboard5Icon";
import { OnboardLayout } from "./OnboardLayout";

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

export const Onboarding8 = () => {
    
    return (
        <OnboardLayout progress={90} icon={<Onboard5Icon />}>
            <div className="row">
                <div className="col-12 col-sm-9">
                    <h3>Your Attitude to Risk</h3>
                    <p className="text-muted">
                        How much do you plan to deposit into your BYield account
                        over the course of the year?
                    </p>
                    <div className="row">
                        <div className="col-8">
                            <Select
                             
                                placeholder="Please Select"
                                options={options}
                                theme={(theme) => ({
                                    ...theme,
                                    borderRadius: 0,
                                    colors: {
                                        ...theme.colors,
                                        primary50: "rgba(255,202,0,0.5)",
                                        primary75: "rgba(255,202,0,0.75)",
                                        primary25: "rgba(255,202,0,0.25)",
                                        primary: "rgba(255,202,0,1)",
                                        danger: "#222",
                                        dangerLight: "rgba(255,202,0,0.2)",
                                    },
                                })}
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div className="d-flex justify-content-end">
            <Link to={`/onboarding/9`} className="onboard-next">
                        <FaChevronRight size={22} />
                    </Link>
            </div>
        </OnboardLayout>
    );
};
