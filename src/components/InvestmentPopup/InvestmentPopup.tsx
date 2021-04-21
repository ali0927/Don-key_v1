import { BiInfoCircle } from "react-icons/bi";
import { FaCross } from "react-icons/fa";
import { Modal, Spinner } from "react-bootstrap";
import { useState } from "react";
import { useToggle } from "don-hooks";
import { useAxios } from "hooks/useAxios";
import { InvestmentInput } from "../InvestmentInput";
import { DonCommonmodal } from "../DonModal";
import styled from "styled-components";
import { ContainedButton, OutlinedButton } from "../Button";
import { AxiosResponse} from "axios";
import { DonKeySpinner } from "components/DonkeySpinner";

const CaptionContent = styled.p`
    font-family: Roboto;
    font-style: normal;
    font-weight: 400;
    color: #6c757d !important;
`;

const ButtonWrapper = styled.div({
  marginRight: "10%",
  width: "40%",
});



export const InvestmentPopup = ({
  balance,
  poolAddress,
  onClose,
  onSuccess,
  onFailure
}: {
  balance: string | number;
  poolAddress: string;
  onClose: () => void;
  onSuccess?: () => void;
  onFailure?: (err?: AxiosResponse<any>) => void;
}) => {
  const [value, setValue] = useState("");
  const [isLoading, enable, disable] = useToggle();

  const [{ }, executePost] = useAxios(
    { method: "POST", url: "/api/v2/investments" },
    { manual: true }
  );




  const handleInvest = async () => {
    if (isLoading) {
      return;
    }
    enable();
    try {

     await executePost({ data: { poolAddress } });
      if (onSuccess) {
        onSuccess();
      }

    }
    catch (err) {
      if (onFailure) {
        onFailure(err.response);
      }
    }
    finally {
      disable();
    }
    onClose();
  };

  const renderButtonText = () => {
    if (isLoading) {
      return <DonKeySpinner/>;
    }

    return "Invest";
  };

  return (
    <DonCommonmodal title="Invest" variant="common" isOpen={true} size="md"  titleRightContent={`Balance: ${balance} BUSD`} onClose={onClose}>
      <div className="row">
        <div className="col-md-5 mr-4">
          <CaptionContent className="d-flex mt-2 justify-content-between">
            <span>USD Value</span>
            <span>$240</span>
          </CaptionContent>
          <CaptionContent className="d-flex  justify-content-between">
            <span>GAS FEE</span>
            <span>$13</span>
          </CaptionContent>
          <p className="d-flex justify-content-between">
            <span>TOTAL</span>
            <span>$254</span>
          </p>
          <p className="mb-0 mt-3 cursor-pointer">
            <small>
              Important <BiInfoCircle />{" "}
            </small>
          </p>
        </div>

        <div className="col-md-6 ml-4">
          <div className="row">

            <InvestmentInput
              value={value}
              setValue={setValue}
              max={parseInt(balance as string)}
            />
          </div>
          <div className="row mt-5">

            <ButtonWrapper>
              <ContainedButton
                disabled={!value}
                onClick={handleInvest}
              >
                {renderButtonText()}
              </ContainedButton>
            </ButtonWrapper>


            <ButtonWrapper>
              <OutlinedButton
                onClick={onClose}
              >
                Cancel
                </OutlinedButton>
            </ButtonWrapper>

          </div>
        </div>
      </div >
    </DonCommonmodal >
  );
};
