import React from "react";
import { FaChevronRight } from "react-icons/fa";
import { BuruCheckbox } from "./BuruCheckbox";
import { Onboard3Icon } from "./Onboard3Icon";
import { OnboardLayout } from "./OnboardLayout";

export const Onboarding3 = () => {
    return (
        <OnboardLayout
            title="Over th past three years, to what extent have you invested in/traded the following products?"
            icon={<Onboard3Icon />}
        >
            <h3>Your Farmers Experience</h3>
            <p className="text-muted">
                Over th past three years, to what extent have you invested
                in/traded the following products?
            </p>

            <label className="onboard-label d-flex align-items-center">
                Equities{" "}
                <span className="text-muted ml-1 font-weight-normal">
                    (Stocks, ETFs)
                </span>
            </label>
            <div className="d-flex">
                <div className="selectable-item">1-10 times</div>

                <div className="selectable-item">10-20 times</div>

                <div className="selectable-item">20+ times</div>
            </div>
            <div className="d-flex align-items-center text-muted mt-2">
                <BuruCheckbox checked onClick={() => {}} />
                <span className="ml-2">Never traded</span>
            </div>
            <label className="onboard-label mt-4 d-flex align-items-center">
                Crypto Assets{" "}
                <span className="text-muted ml-1 font-weight-normal">
                    (Cryptocurrencies, Tokens)
                </span>
            </label>
            <div className="d-flex">
                <div className="selectable-item">1-10 times</div>

                <div className="selectable-item">10-20 times</div>

                <div className="selectable-item">20+ times</div>
            </div>
            <div className="d-flex align-items-center text-muted mt-2">
                <BuruCheckbox checked onClick={() => {}} />
                <span className="ml-2">Never traded</span>
            </div>
            <label className="onboard-label mt-4 d-flex align-items-center">
                Leveraged Products{" "}
                <span className="text-muted ml-1 font-weight-normal">
                    (CFDs, Futures, Options)
                </span>
            </label>
            <div className="d-flex">
                <div className="selectable-item">1-10 times</div>

                <div className="selectable-item">10-20 times</div>

                <div className="selectable-item">20+ times</div>
            </div>
            <div className="d-flex align-items-center text-muted mt-2">
                <BuruCheckbox onClick={() => {}} />
                <span className="ml-2">Never traded</span>
            </div>
            <div className="d-flex justify-content-end">
                <div className="onboard-next">
                    <FaChevronRight size={22} />
                </div>
            </div>
        </OnboardLayout>
    );
};
