import { OnboardLayout } from "./OnboardLayout";
import React, { useState } from "react";
import { FaChevronRight } from "react-icons/fa";
import { Onboard5Icon } from "./Onboard5Icon";
import { FarmerKnoweldge } from "./FarmerKnoweldge";
import { Link } from "react-router-dom";

const StopWatchIcon = () => {
    return (
        <svg
            width={54}
            height={53}
            viewBox="0 0 54 53"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M12.725 20.632l-4.383-4.384a1.552 1.552 0 112.195-2.196l4.384 4.384a1.552 1.552 0 11-2.196 2.196z"
                fill="#5D5D5D"
            />
            <path
                d="M39.076 20.632a1.552 1.552 0 010-2.196l4.384-4.383a1.552 1.552 0 112.195 2.195l-4.383 4.384a1.552 1.552 0 01-2.196 0z"
                fill="#464646"
            />
            <path
                d="M28.55 4.658v9.42c0 .87-.682 1.553-1.552 1.553s-1.553-.683-1.553-1.553v-9.42c0-.87.683-1.553 1.553-1.553.87 0 1.553.684 1.553 1.553z"
                fill="#5D5D5D"
            />
            <path
                d="M27 15.63V3.106c.87 0 1.553.684 1.553 1.553v9.42c0 .87-.683 1.553-1.553 1.553z"
                fill="#464646"
            />
            <path
                d="M26.998 12.523c-11.118 0-20.186 9.068-20.186 20.186 0 11.117 9.068 20.289 20.186 20.289s20.186-9.171 20.186-20.289c0-11.118-9.068-20.186-20.186-20.186z"
                fill="#C3C3C3"
            />
            <path
                d="M47.185 32.709c0 11.117-9.067 20.289-20.185 20.289V12.523c11.118 0 20.185 9.068 20.185 20.186z"
                fill="#ADADAD"
            />
            <path
                d="M26.998 18.734c-7.701 0-13.975 6.273-13.975 13.975 0 7.701 6.274 14.078 13.975 14.078S40.973 40.41 40.973 32.71c0-7.702-6.273-13.975-13.975-13.975z"
                fill="#F5F5F5"
            />
            <path
                d="M40.975 32.709c0 7.701-6.273 14.078-13.975 14.078V18.734c7.702 0 13.975 6.273 13.975 13.975z"
                fill="#E6E6E6"
            />
            <path
                d="M6.146 18.444a1.552 1.552 0 010-2.195l4.392-4.392a1.552 1.552 0 112.195 2.196l-4.391 4.391a1.552 1.552 0 01-2.196 0z"
                fill="#C3C3C3"
            />
            <path
                d="M32.486 27.224a1.552 1.552 0 00-2.196 0l-4.39 4.39a1.552 1.552 0 102.196 2.196l4.39-4.39a1.552 1.552 0 000-2.196z"
                fill="#5D5D5D"
            />
            <path
                d="M28.098 33.808l4.39-4.39a1.552 1.552 0 000-2.195l-6.586 6.585c.607.607 1.59.607 2.196 0z"
                fill="#464646"
            />
            <path
                d="M33.209 0H20.787c-.87 0-1.553.683-1.553 1.553v3.105c0 .87.683 1.553 1.553 1.553H33.21c.87 0 1.553-.683 1.553-1.553V1.553c0-.87-.683-1.553-1.553-1.553z"
                fill="#C3C3C3"
            />
            <path
                d="M33.21 6.21H27V0h6.21c.87 0 1.554.683 1.554 1.553v3.105c0 .87-.683 1.553-1.553 1.553zM45.655 18.444l-4.392-4.391a1.552 1.552 0 112.196-2.196l4.391 4.392a1.552 1.552 0 11-2.195 2.195z"
                fill="#ADADAD"
            />
        </svg>
    );
};

const CalendarIcon = () => {
    return (
        <svg
            width={53}
            height={53}
            viewBox="0 0 53 53"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M46.313 50.302h4.394a1.886 1.886 0 001.874-2.149l-5.37-37.376-.898 39.525z"
                fill="#A5A5A5"
            />
            <path
                d="M44.516 4.492H3.195A2.695 2.695 0 00.5 7.187v43.118A2.695 2.695 0 003.195 53h41.321a2.695 2.695 0 002.695-2.695V7.187a2.695 2.695 0 00-2.695-2.695z"
                fill="#C1C1C1"
            />
            <path
                d="M43.618 9.883v5.39H4.094v-5.39A1.802 1.802 0 015.89 8.086h35.932c.99.003 1.793.806 1.796 1.797z"
                fill="#6C6C6C"
            />
            <path
                d="M43.618 15.273v27.102c0 .478-.19.937-.53 1.275l-5.228 5.228c-.338.34-.797.53-1.275.53H5.89a1.802 1.802 0 01-1.796-1.796V15.273h39.524z"
                fill="#EFEFEF"
            />
            <path
                d="M16.667 39.524a5.395 5.395 0 005.39-5.39v-7.186a5.39 5.39 0 00-10.78 0v7.187a5.395 5.395 0 005.39 5.39zm-3.593-12.576a3.593 3.593 0 017.186 0v7.187a3.593 3.593 0 01-7.186 0v-7.187zM26.55 37.728a.898.898 0 000 1.796h7.187a.898.898 0 100-1.796h-2.695V22.457a.898.898 0 00-1.533-.635l-3.593 3.593a.898.898 0 001.27 1.27l2.06-2.06v13.103H26.55z"
                fill="#6F6F6F"
            />
            <path
                d="M33.739 42.223H13.078a.898.898 0 100 1.796h20.66a.898.898 0 100-1.796z"
                fill="#464646"
            />
            <path
                d="M43.454 43.117a1.81 1.81 0 01-.368.53l-5.228 5.228a1.812 1.812 0 01-.53.368v-4.33a1.802 1.802 0 011.797-1.796h4.33z"
                fill="#D3D3D3"
            />
            <path
                d="M21.756 4.492H19.88a4.491 4.491 0 10-4.106 6.288.898.898 0 110 1.797 6.288 6.288 0 115.93-8.381.825.825 0 01.053.296zM38.822 4.492h-1.877a4.491 4.491 0 10-4.105 6.288.898.898 0 010 1.797 6.288 6.288 0 115.929-8.381.825.825 0 01.053.296z"
                fill="#A2A2A2"
            />
        </svg>
    );
};

const MonthIcon = () => {
    return (
        <svg
            width={49}
            height={53}
            viewBox="0 0 49 53"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M48.168 8.531v8.211H.5v-8.21a3.195 3.195 0 013.2-3.2h41.269a3.195 3.195 0 013.2 3.2z"
                fill="#858585"
            />
            <path
                d="M13.296 5.332v5.972c0 .588-.478 1.066-1.066 1.066H7.324a1.067 1.067 0 01-1.066-1.066V5.332h7.038zM40.702 5.332v5.972c0 .588-.477 1.066-1.066 1.066H34.73a1.067 1.067 0 01-1.066-1.066V5.332h7.038zM2.206 5.703v11.04H.5v-8.21c0-1.228.691-2.295 1.706-2.83z"
                fill="#6E6E6E"
            />
            <path
                d="M9.244 23.121h5.487c.294 0 .533.239.533.533v5.487a.533.533 0 01-.533.533H9.244a.533.533 0 01-.533-.533v-5.487c0-.294.239-.533.533-.533zM9.244 31.273h5.487c.294 0 .533.24.533.534v5.487a.533.533 0 01-.533.534H9.244a.533.533 0 01-.533-.534v-5.487c0-.295.239-.534.533-.534zM9.244 39.426h5.487c.294 0 .533.238.533.533v5.487a.533.533 0 01-.533.533H9.244a.533.533 0 01-.533-.533v-5.487c0-.295.239-.533.533-.533zM17.396 23.121H23c.295 0 .534.239.534.533v5.487a.533.533 0 01-.534.533h-5.604a.533.533 0 01-.533-.533v-5.487c0-.294.239-.533.534-.533zM17.396 31.273H23c.295 0 .534.24.534.534v5.487a.533.533 0 01-.534.534h-5.604a.533.533 0 01-.533-.534v-5.487c0-.295.239-.534.534-.534zM17.396 39.426H23c.295 0 .534.238.534.533v5.487a.533.533 0 01-.534.533h-5.604a.533.533 0 01-.533-.533v-5.487c0-.295.239-.533.534-.533zM25.666 23.121h5.604c.294 0 .533.239.533.533v5.487a.533.533 0 01-.533.533h-5.604a.533.533 0 01-.533-.533v-5.487c0-.294.239-.533.533-.533zM25.666 31.273h5.604c.294 0 .533.24.533.534v5.487a.533.533 0 01-.533.534h-5.604a.533.533 0 01-.533-.534v-5.487c0-.295.239-.534.533-.534zM25.666 39.426h5.604c.294 0 .533.238.533.533v5.487a.533.533 0 01-.533.533h-5.604a.533.533 0 01-.533-.533v-5.487c0-.295.239-.533.533-.533zM39.955 23.654v5.487a.533.533 0 01-.533.533h-5.486a.533.533 0 01-.534-.533v-5.487c0-.294.24-.533.533-.533h5.487c.295 0 .533.239.533.533zM33.935 31.273h5.487c.295 0 .533.24.533.534v5.487a.533.533 0 01-.533.534h-5.486a.533.533 0 01-.534-.534v-5.487c0-.295.24-.534.533-.534zM33.935 39.426h5.487c.295 0 .533.238.533.533v5.487a.533.533 0 01-.533.533h-5.486a.533.533 0 01-.534-.533v-5.487c0-.295.24-.533.533-.533z"
                fill="#E6E6E6"
            />
            <path
                d="M.5 15.996v33.805c0 1.767 1.432 3.2 3.2 3.2h41.269c1.767 0 3.2-1.433 3.2-3.2V15.996H.5z"
                fill="#F5F5F5"
            />
            <path
                d="M13.297 1.066v8.532c0 .588-.478 1.066-1.067 1.066H9.031a1.067 1.067 0 01-1.066-1.066V1.066C7.965.478 8.443 0 9.03 0h3.2c.588 0 1.066.478 1.066 1.066z"
                fill="#6F6F6F"
            />
            <path
                d="M8.71 23.121h6.554v6.553H8.711v-6.553zM33.402 23.121h6.553v6.553h-6.553v-6.553zM16.863 23.121h6.67v6.553h-6.67v-6.553zM8.71 31.273h6.554v6.555H8.711v-6.555z"
                fill="#B8B8B8"
            />
            <path
                d="M33.402 31.273h6.553v6.555h-6.553v-6.555z"
                fill="#E6E6E6"
            />
            <path d="M16.863 31.273h6.67v6.555h-6.67v-6.555z" fill="#B8B8B8" />
            <path
                d="M8.71 39.43h6.554v6.553H8.711V39.43zM33.402 39.43h6.553v6.553h-6.553V39.43zM16.863 39.43h6.67v6.553h-6.67V39.43z"
                fill="#E6E6E6"
            />
            <path
                d="M25.133 23.121h6.67v6.553h-6.67v-6.553zM25.133 31.273h6.67v6.555h-6.67v-6.555z"
                fill="#B8B8B8"
            />
            <path d="M25.133 39.43h6.67v6.553h-6.67V39.43z" fill="#E6E6E6" />
            <path
                d="M40.703 1.066v8.532c0 .588-.478 1.066-1.066 1.066h-3.2a1.067 1.067 0 01-1.066-1.066V1.066C35.371.478 35.85 0 36.437 0h3.2c.588 0 1.066.478 1.066 1.066z"
                fill="#6F6F6F"
            />
            <path
                d="M.5 15.996v33.805c0 1.767 1.432 3.2 3.2 3.2h1.18a3.197 3.197 0 01-2.62-3.147V18.26a.853.853 0 01.8-.557h45.108v-1.706H.5z"
                fill="#E6E6E6"
            />
            <path
                d="M10.738 10.664H9.03a1.067 1.067 0 01-1.066-1.066V1.066C7.965.478 8.443 0 9.03 0h.64v9.598c0 .588.478 1.066 1.067 1.066zM38.144 10.664h-1.706a1.067 1.067 0 01-1.067-1.066V1.066C35.371.478 35.85 0 36.437 0h.64v9.598c0 .588.478 1.066 1.067 1.066z"
                fill="#525252"
            />
        </svg>
    );
};

export const Onboarding6 = () => {
    const [selectedItems, setSelectedItems] = useState<{
        [x: string]: boolean;
    }>({});

    const getChecked = (name: string) => {
        return selectedItems[name];
    };

    const toggle = (name: string) => () => {
        setSelectedItems((old) => {
            return { ...old, [name]: !!!old[name] };
        });
    };
    return (
        <OnboardLayout progress={70} icon={<Onboard5Icon />}>
            <div className="row">
                <div className="col-12 col-sm-8">
                    <h3>Farmer Strategy</h3>
                    <p className="text-muted">
                        How long do you plan to leave your positions open?
                    </p>
                    <div className="d-flex flex-wrap">
                        <FarmerKnoweldge
                            active={getChecked("watch")}
                            onClick={toggle("watch")}
                            icon={<StopWatchIcon />}
                        >
                            Few seconds up to 24 hours
                        </FarmerKnoweldge>
                        <FarmerKnoweldge
                            active={getChecked("calendar")}
                            onClick={toggle("calendar")}
                            icon={<CalendarIcon />}
                        >
                            Few weeks up to several months
                        </FarmerKnoweldge>
                        <FarmerKnoweldge
                            active={getChecked("months")}
                            onClick={toggle("months")}
                            icon={<MonthIcon />}
                        >
                            More than several months/years
                        </FarmerKnoweldge>
                    </div>
                </div>
            </div>

            <div className="d-flex justify-content-end mt-3 mt-sm-0">
            <Link to={`/onboarding/7`} className="onboard-next">
                        <FaChevronRight size={22} />
                    </Link>
            </div>
        </OnboardLayout>
    );
};
