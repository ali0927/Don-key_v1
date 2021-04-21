
import { ContainedButton, OutlinedButton } from "components/Button";
import { DonKeySpinner } from "components/DonkeySpinner";
import { DonCommonmodal } from "components/DonModal";
import { InvestmentInput } from "components/InvestmentInput";
import { useAxios } from "hooks/useAxios";
import * as React from "react";
import { Spinner } from "react-bootstrap";
import { IWithDrawPopupProps } from "./interfaces";


export const WithDrawPopup: React.FC<IWithDrawPopupProps> = (props) => {
    const { open, poolAddress } = props;

    const [value, setValue] = React.useState("0");

    const [{ loading }, executeDelete] = useAxios(
        { method: "DELETE", url: "/api/v2/investments" },
        { manual: true }
    )

    const handleChange = (value: string) => {
        setValue(value)
    }

    const handleWithDraw = async () => {
        try {
            await executeDelete({
                data: {
                    poolAddress: poolAddress,
                },
            });
            props.onSuccess();
        }
        catch (err) {
            props.onError(err);
        }
    }

    return (
        <>
            <DonCommonmodal isOpen={open} title="Withdraw" variant="common" size="xs" onClose={props.onClose}>
                <div className="mt-3">
                    <InvestmentInput
                        value={value}
                        max={100}
                        setValue={handleChange} />
                </div>
                <div className="d-flex mt-5">
                    <ContainedButton className="mr-3" disabled={loading} onClick={handleWithDraw}>
                        {loading &&
                            <DonKeySpinner/>
                        }
                        {!loading &&
                           <>Withdraw</>
                        }
                    </ContainedButton>
                    <OutlinedButton onClick={()=>props.onClose()}>Cancel</OutlinedButton>
                </div>
            </DonCommonmodal>
        </>
    )
}