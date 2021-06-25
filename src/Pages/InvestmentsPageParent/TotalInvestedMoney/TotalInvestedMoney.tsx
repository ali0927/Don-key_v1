import clsx from "clsx";
import { InvestmentPopup } from "components/InvestmentPopup/InvestmentPopup";
import { useState } from "react";
import "./TotalInvestedMoney.scss";
import { ITotalInvestedMoneyProps } from "./interfaces";



export const TotalInvestedMoney: React.FC<ITotalInvestedMoneyProps> = (props) => {
    const { balance } = props;
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className={clsx("invest_card d-flex align-items-center justify-content-center", props.className)}>
            <div>
                <div className="invest_card_title">Total Invested Money</div>
                <div className="invest_card_amount w-100">140 000$</div>
                {/* {isOpen && (
                    <InvestmentPopup poolAddress=""  onClose={() => setIsOpen(false)} />
                )} */}
            </div>
        </div>
    );
};