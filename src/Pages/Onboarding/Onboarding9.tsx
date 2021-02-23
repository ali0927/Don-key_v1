import Select from "react-select";
import { FaChevronRight } from "react-icons/fa";
import { Onboard9Icon } from "./Onboard9Icon";
import { OnboardLayout } from "./OnboardLayout";
import { Link } from "react-router-dom";
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

export const Onboarding9 = () => {
    return (
        <OnboardLayout progress={100} icon={<Onboard9Icon />}>
            <h3>Your Financial Status</h3>
            <p className="my-3">Your sources of income</p>
            <p className="text-muted">
                Your answer is considered as the source of funds for your
                investments in BYield
            </p>

            <Select
                className="w-50"
                placeholder="Select One or More"
                isMulti
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

            <div className="d-flex justify-content-end">
            <Link to={`/onboarding/10`} className="onboard-next">
                        <FaChevronRight size={22} />
                    </Link>
            </div>
        </OnboardLayout>
    );
};
