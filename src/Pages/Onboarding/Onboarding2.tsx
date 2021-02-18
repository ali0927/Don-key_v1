import { FaChevronRight } from "react-icons/fa";
import { OnboardLayout } from "./OnboardLayout";
import React from "react";

export const Onboarding2 = () => {
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
                    <div className="col">
                        <input
                            className="onboard-input "
                            placeholder="Country"
                            type="text"
                        />
                    </div>
                </div>
                <div className="row mt-3">
                    <label className="onboard-label col-3 d-flex align-items-center">
                        Passport Number
                    </label>
                    <div className="col-9">
                        <input
                            className="onboard-input"
                            type="number"
                            maxLength={4}
                        />
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
