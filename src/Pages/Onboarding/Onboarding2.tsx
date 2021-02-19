import { FaChevronRight } from "react-icons/fa";
import { OnboardLayout } from "./OnboardLayout";
import React, { useState } from "react";
import { useAutocomplete } from "@material-ui/lab";
import { countries } from "./countries";

function countryToFlag(isoCode: string) {
    return typeof String.fromCodePoint !== "undefined"
        ? isoCode
              .toUpperCase()
              .replace(/./g, (char) =>
                  String.fromCodePoint(char.charCodeAt(0) + 127397)
              )
        : isoCode;
}

const BuruCheckbox = ({
    className,
    checked,
    onClick
}: {
    className?: string;
    checked: boolean;
    onClick: () => void;
}) => {
    return (
        <div
            style={{
                display: "inline-flex",
                position: "relative",
                padding: "1em",
                border: "2px solid #D3D3D3",
                cursor: "pointer",
                borderRadius: 4,
                
            }}
            onClick={e => {e.stopPropagation(); e.preventDefault(); onClick()}}
            className={className}
        >
            {checked && (
                <svg
                    className="position-absolute"
                    style={{top: "50%", left: "50%", transform: `translate(-50%, -50%)`}}
                    width="14"
                    height="11"
                    viewBox="0 0 14 11"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M13.187 0.776812C12.9273 0.517104 12.5063 0.517104 12.2465 0.776812L4.2796 8.74381L1.21724 5.68146C0.957563 5.42175 0.536545 5.42177 0.276812 5.68146C0.0171044 5.94114 0.0171044 6.36215 0.276812 6.62186L3.80938 10.1544C4.06899 10.4141 4.49031 10.4139 4.74981 10.1544L13.187 1.71724C13.4467 1.45756 13.4466 1.03652 13.187 0.776812Z"
                        fill="#FFCA00"
                    />
                </svg>
            )}
        </div>
    );
};

export const Onboarding2 = () => {

    const [checked, setChecked] = useState(false);

    const {
        getRootProps,
        getInputProps,
        getListboxProps,
        getOptionProps,
        groupedOptions,
        value,
    } = useAutocomplete({
        id: "use-autocomplete-demo",
        options: countries,
        value: countries[0],
        getOptionLabel: (option) => option.label,
    });
    return (
        <OnboardLayout>
            <h3>Your Address</h3>
            <div className="container">
                <div className="row mt-5">
                    <label className="onboard-label col-3 d-flex align-items-center">
                        Address
                    </label>
                    <div className="col-7">
                        <input
                            className="onboard-input"
                            placeholder="Street"
                            type="text"
                        />
                    </div>
                    <div className="col-2">
                        <input
                            className="onboard-input"
                            placeholder="No"
                            type="text"
                        />
                    </div>
                </div>
                <div className="row mt-3">
                    <label className="onboard-label col-3 d-flex align-items-center">
                        City
                    </label>
                    <div className="col-9">
                        <div className="row">
                            <div className="col">
                                <input
                                    className="onboard-input "
                                    placeholder="City"
                                    type="text"
                                />
                            </div>
                            <div className="col">
                                <input
                                    className="onboard-input "
                                    placeholder="Postal Code"
                                    type="text"
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row mt-3">
                    <label className="onboard-label col-3 d-flex align-items-center">
                        Country
                    </label>
                    <div className="col-9">
                        <div className="position-relative">
                            <div {...getRootProps()}>
                                {value && (
                                    <div
                                        style={{
                                            position: "absolute",
                                            top: "25%",
                                            left: 15,
                                        }}
                                    >
                                        {countryToFlag(value.code)}
                                    </div>
                                )}
                                <div
                                    style={{
                                        position: "absolute",
                                        top: "25%",
                                        right: 30,
                                    }}
                                >
                                    <svg
                                        width="10"
                                        height="7"
                                        viewBox="0 0 10 7"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M5 7L0.5 0L9.5 0L5 7Z"
                                            fill="#222222"
                                        />
                                    </svg>
                                </div>
                                <input
                                    {...getInputProps()}
                                    className="onboard-input px-5 cursor-pointer"
                                    placeholder="Choose a Country"
                                    type="text"
                                    autoComplete="new-password"
                                />
                            </div>
                            {groupedOptions.length > 0 ? (
                                <ul
                                    className="onboard-input-list"
                                    {...getListboxProps()}
                                >
                                    {groupedOptions.map((option, index) => (
                                        <li
                                            {...getOptionProps({
                                                option,
                                                index,
                                            })}
                                        >
                                            {countryToFlag(option.code)}{" "}
                                            {option.label}
                                        </li>
                                    ))}
                                </ul>
                            ) : null}
                        </div>

                       
                    </div>
                    <div className="col-9 offset-3 d-flex mt-3">
                            <BuruCheckbox checked={checked} onClick={() => {setChecked(val => !val)}} className="mr-2" />
                            <div>
                                This country is both my birthplace and country
                                of citizenship
                            </div>
                        </div>
                </div>

                <div className="row mt-3">
                    <label className="onboard-label col-3 d-flex align-items-center">
                        Passport Number
                    </label>
                    <div className="col-9">
                        <input className="onboard-input"   autoComplete="new-password" type="password" />
                        <div>Show</div>
                    </div>
                </div>
                <div className="row justify-content-end mt-5">
                    <div className="onboard-next">
                        <FaChevronRight size={22} />
                    </div>
                </div>
            </div>
        </OnboardLayout>
    );
};
