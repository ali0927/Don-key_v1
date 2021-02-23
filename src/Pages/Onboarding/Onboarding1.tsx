import React, { useState } from "react";
import { FaChevronRight } from "react-icons/fa";
import clsx from "clsx";
import { OnboardLayout } from "./OnboardLayout";
import { Link } from "react-router-dom";

export const Onboarding1 = () => {
    const [radio, setRadio] = useState(0);

    return (
        <OnboardLayout progress={20}>
            <h3>Your Profile</h3>
            <p>This should match your ID or Passport</p>
            <div className="container">
                <div className="row">
                    <label className="onboard-label col-2 d-flex align-items-center">
                        Name
                    </label>
                    <div className="col-4">
                        <input
                            className="onboard-input"
                            placeholder="First Name"
                            type="text"
                        />
                    </div>
                    <div className="col-4">
                        <input
                            className="onboard-input"
                            placeholder="Middle Name"
                            type="text"
                        />
                    </div>
                </div>
                <div className="row mt-3">
                    <div className="col-4 offset-2">
                        <input className="onboard-input " type="text" />
                    </div>
                </div>
                <div className="row mt-3">
                    <label className="onboard-label col-2 d-flex align-items-center">
                        Gender
                    </label>
                    <div className="col-4">
                        <div
                            onClick={() => setRadio(0)}
                            className={clsx("input-radio", {
                                active: radio === 0,
                            })}
                        >
                            Male
                        </div>
                    </div>
                    <div className="col-4">
                        <div
                            onClick={() => setRadio(1)}
                            className={clsx("input-radio", {
                                active: radio === 1,
                            })}
                        >
                            Female
                        </div>
                    </div>
                </div>
                <div className="row mt-3">
                    <label className="onboard-label col-2 d-flex align-items-center">
                        Birthday
                    </label>
                    <div className="col-8">
                        <div className="row">
                            <div className="col">
                                <input
                                    className="onboard-input"
                                    placeholder="dd"
                                    type="number"
                                    maxLength={2}
                                />
                            </div>
                            <div className="col">
                                <input
                                    className="onboard-input"
                                    placeholder="mm"
                                    type="number"
                                    maxLength={2}
                                />
                            </div>
                            <div className="col ">
                                <input
                                    className="onboard-input"
                                    type="number"
                                    placeholder="yyyy"
                                    maxLength={4}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row justify-content-end mt-5">
                    <Link to={`/onboarding/2`} className="onboard-next">
                        <FaChevronRight size={22} />
                    </Link>
                </div>
            </div>
        </OnboardLayout>
    );
};
