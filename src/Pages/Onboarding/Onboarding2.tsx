import { FaChevronRight } from "react-icons/fa";
import { OnboardLayout } from "./OnboardLayout";
import React, { useState } from "react";
import { useAutocomplete } from "@material-ui/lab";
import { countries } from "./countries";
import { BuruCheckbox } from "./BuruCheckbox";
import { Link } from "react-router-dom";

function countryToFlag(isoCode: string) {
    return typeof String.fromCodePoint !== "undefined"
        ? isoCode
              .toUpperCase()
              .replace(/./g, (char) =>
                  String.fromCodePoint(char.charCodeAt(0) + 127397)
              )
        : isoCode;
}

export const Onboarding2 = () => {
    const [checked, setChecked] = useState(false);
    const [isPassVisible, setIsPassVisible] = useState(false);
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
        getOptionLabel: (option) => option.label,
    });
    return (
        <OnboardLayout progress={30}>
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
                        <BuruCheckbox
                            checked={checked}
                            onClick={() => {
                                setChecked((val) => !val);
                            }}
                            className="mr-2"
                        />
                        <div>
                            This country is both my birthplace and country of
                            citizenship
                        </div>
                    </div>
                </div>

                <div className="row mt-5">
                    <label className="onboard-label col-3 d-flex align-items-center">
                        Passport Number
                    </label>
                    <div className="col-9 position-relative">
                        <input
                            className="onboard-input"
                            autoComplete="new-password"
                            type={isPassVisible ?"text" : "password"}
                        />
                        <button
                            onClick={() => setIsPassVisible((val) => !val)}
                            className="btn btn-buru-link"
                        >
                            {isPassVisible ? "Hide" : "Show"}
                        </button>
                    </div>
                    <div className="col-9 offset-3 text-muted mt-2">
                        This number must perain to your country of citizenship
                    </div>
                </div>
                <div className="row justify-content-end mt-5">
                <Link to={`/onboarding/3`} className="onboard-next">
                        <FaChevronRight size={22} />
                    </Link>
                </div>
            </div>
        </OnboardLayout>
    );
};
 