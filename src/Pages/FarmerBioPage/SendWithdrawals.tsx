import { DonCommonmodal } from "components/DonModal";
import React, { useState } from "react";
import styled from "styled-components";
import { ButtonWidget } from "components/Button";
import { Spinner } from "react-bootstrap";
import {
  getPoolContract, getPoolToken, toWei,
} from "helpers";
import { useWeb3Context } from "don-components";




const CancelButton = styled(ButtonWidget)`
  border-radius: 5px;
  :hover {
    background: #fff !important;
  }
`;


export const SendWithdrawalsDialog: React.FC<{
  open: boolean;
  pool_address: string;
  poolVersion: number;
  onClose: () => void;
}> = (props) => {
  const { open, pool_address, poolVersion, onClose } = props;

  const [loading, setLoading] = React.useState(false);

  
  const [new_pool, setnewPoolvalue] = useState("");
  const [withdrawValue, setwithDrawvalue] = useState("");
  const {web3} = useWeb3Context();
  
  const handleUpdate = async () => {
    setLoading(true);
    try {
      if (poolVersion === 3) {
        const poolContract = await getPoolContract(
          web3,
          pool_address,
          poolVersion
        );
        const token = await getPoolToken(web3, pool_address);
        const decimals = await token.methods.decimals().call();
        const accounts = await web3.eth.getAccounts();
         await poolContract.methods.withdraw(toWei(withdrawValue,decimals),toWei(new_pool, decimals)).send({from : accounts[0]});
      }
    } finally {
      setLoading(false);
      onClose()
    }
    
  };

  return (
    <>
      <DonCommonmodal
        isOpen={open}
        title="Send Withdrawals"
        variant="common"
        onClose={props.onClose}
        size="sm"
      >
        
        <div>
          <p>Latest Pool Value</p>
          <input
            type="text"
            value={new_pool}
            placeholder="Enter Pool Value"
            onChange={(e) => setnewPoolvalue(e.target.value)}
          />
          
        </div>
        <div>
          <p>Withdraw Value</p>
          <input
            type="text"
            value={withdrawValue}
            placeholder="Enter Withdraw Value"
            onChange={(e) => setwithDrawvalue(e.target.value)}
          />
          
        </div>

        <div className="row  mt-4 justify-content-center">
          <div className="col-lg-3" />
          <div className="col-lg-3 mb-2">
            <ButtonWidget
              varaint="contained"
              disabled={loading}
              height="41px"
              containedVariantColor="lightYellow"
              onClick={handleUpdate}
            >
              {loading ? <Spinner animation="border" size="sm" /> : "Update"}
            </ButtonWidget>
          </div>

          <div className="col-lg-3 mb-2">
            <CancelButton
              varaint="outlined"
              height="41px"
              onClick={props.onClose}
            >
              Cancel
            </CancelButton>
          </div>
          <div className="col-lg-3" />
        </div>
      </DonCommonmodal>
    </>
  );
};
