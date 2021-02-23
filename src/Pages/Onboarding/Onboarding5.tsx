import { OnboardLayout } from "./OnboardLayout";
import React, { useState } from "react";
import { FaChevronRight } from "react-icons/fa";
import { Onboard5Icon } from "./Onboard5Icon";
import { BYieldIcon } from "../../components/Icons/BYieldIcon";
import { TrueIcon } from "../../components/Icons/TrueIcon";
import { InvestmentCheckbox } from "./InvestmentCheckbox";
import { YearnIcon } from "../../components/Icons/YearnIcon";
import { EthereumIcon } from "../../components/Icons/EthereumIcon";
import { USDTIcon } from "../../components/Icons/USDTIcon";
import { AAVEIcon } from "../../components/Icons/AAVEIcon";
import { DAIicon } from "../../components/Icons/DAIicon";
import { SUSDIcon } from "../../components/Icons/SUSDIcon";
import { Link } from "react-router-dom";


export const Onboarding5 = () => {
    const [selectedItems, setSelectedItems] = useState<{[x:string]: boolean}>({});


    const getChecked= (name: string) => {
        return selectedItems[name];
    }

    const toggle = (name: string) => () => {
        setSelectedItems(old => {
         
                return {...old,[name]: !!!old[name]}
            
        })
    }

    return (
        <OnboardLayout progress={60} icon={<Onboard5Icon />}>
            <div className="row">
                <div className="col-10">
                    <h3>Planned Investments</h3>
                    <p className="text-muted">
                        In which instruments do you plan to trade? Please select
                        one or more relevant answer
                    </p>
                    <div className="row">
                        <div className="col-6">
                            <InvestmentCheckbox
                                checked={getChecked("BYield")}
                                onClick={toggle("BYield")}
                                icon={<BYieldIcon />}
                                text="BYield"
                            />
                        </div>
                        <div className="col-6">
                            <InvestmentCheckbox
                                 checked={getChecked("True")}
                                 onClick={toggle("True")}
                                icon={<TrueIcon />}
                                text="True"
                            />
                        </div>
                        <div className="col-6">
                            <InvestmentCheckbox
                                 checked={getChecked("Yearn")}
                                 onClick={toggle("Yearn")}
                                icon={<YearnIcon />}
                                text="Yearn.finance"
                            />
                        </div>
                        <div className="col-6">
                            <InvestmentCheckbox
                                 checked={getChecked("Ethereum")}
                                 onClick={toggle("Ethereum")}
                                icon={<EthereumIcon />}
                                text="Ethereum"
                            />
                        </div>
                        <div className="col-6">
                            <InvestmentCheckbox
                                 checked={getChecked("USDT")}
                                 onClick={toggle("USDT")}
                                icon={<USDTIcon />}
                                text="USDT Coin"
                            />
                        </div>
                        <div className="col-6">
                            <InvestmentCheckbox
                                 checked={getChecked("AAVE")}
                                 onClick={toggle("AAVE")}
                                icon={<AAVEIcon />}
                                text="AAVE"
                            />
                        </div>
                        <div className="col-6">
                            <InvestmentCheckbox
                                 checked={getChecked("DAI")}
                                 onClick={toggle("DAI")}
                                icon={<DAIicon />}
                                text="DAI"
                            />
                        </div>
                        <div className="col-6">
                            <InvestmentCheckbox
                                 checked={getChecked("sUSD")}
                                 onClick={toggle("sUSD")}
                                icon={<SUSDIcon />}
                                text="sUSD"
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div className="d-flex justify-content-end">
            <Link to={`/onboarding/6`} className="onboard-next">
                        <FaChevronRight size={22} />
                    </Link>
            </div>
        </OnboardLayout>
    );
};
