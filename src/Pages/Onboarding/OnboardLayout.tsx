import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { Logo } from "./Logo";
import React from "react";
import { OnboardingIcon } from "./OnboardingIcon";
const CloseIcon = (props: React.SVGProps<SVGSVGElement>) => {
    return (
        <svg
            width="16"
            height="17"
            viewBox="0 0 16 17"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <path
                opacity="0.9"
                d="M0.5 1L8 8.5M8 8.5L15.5 16M8 8.5L15.5 1M8 8.5L0.5 16"
                stroke="#252525"
                stroke-linecap="round"
            />
        </svg>
    );
};

const OnboardProgress = ({ progress }: { progress: number }) => {
    return (
        <div className="onboard-progress">
            <div className="onboard-icon onboard-icon--prev">
                <FaChevronLeft />
            </div>
            <div className="progress-back d-flex">
                <div
                    style={{ width: `${progress}%` }}
                    className="progress-front"
                ></div>
                <div className="progress-text">
                    <span className="font-weight-bold mr-1">{progress}% </span>
                    Completed Profile
                </div>
            </div>
            <div className="onboard-icon onboard-icon--next">
                <FaChevronRight />
            </div>
        </div>
    );
};

export const OnboardLayout = ({
    children,
    title = "A few clicks away from creating your profile",
    icon = <OnboardingIcon />,
}: {
    children: React.ReactNode;
    title?: string;
    icon?: React.ReactElement;
}) => {
    return (
        <div className="onboardlayout">
            <div className="container-fluid">
                <div className="row">
                    <div className="onboard-sidebar col-sm-4 ">
                        <div className="p-4 py-5">
                            <Logo />
                        </div>
                        <div className="px-5 py-2  d-flex justify-content-center">
                            <p className="font-weight-bold">{title} </p>
                        </div>
                        <div className="onboard_icon d-flex justify-content-center">
                            {icon}
                        </div>
                    </div>
                    <div className="col-sm-8 onboard-main">
                        <CloseIcon className="closeicon cursor-pointer" />
                        <div className="onboard-wrapper">{children}</div>
                        <div className="progress-wrapper">
                            <OnboardProgress progress={12} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
