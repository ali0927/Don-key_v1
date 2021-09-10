import { DonCommonmodal } from "components/DonModal";
import React, { useState } from "react";
import styled from "styled-components";
import { ButtonWidget } from "components/Button";
import { Spinner } from "react-bootstrap";
import {
  captureException,
  getPoolContract, getPoolToken, toWei,
} from "helpers";
import { useWeb3 } from "don-components";
import Web3 from "web3";



const CancelButton = styled(ButtonWidget)`
  border-radius: 5px;
  :hover {
    background: #fff !important;
  }
`;


export const AssignLpTokens: React.FC<{
  open: boolean;
  pool_address: string;
  poolVersion: number;
  onClose: () => void;
}> = (props) => {
  const { open, pool_address, poolVersion, onClose } = props;

  const [loading, setLoading] = React.useState(false);

  const [pool_value, setPoolvalue] = useState("");

  const [new_pool, setnewPoolvalue] = useState("");
  const web3 = useWeb3();
  const handleUpdate = async () => {
    setLoading(true);
    try {
      const pool = await getPoolContract(web3, pool_address, poolVersion);
      const accounts = await web3.eth.getAccounts();
      const token = await getPoolToken(web3, pool_address);
      const decimals = await token.methods.decimals().call();
      await pool.methods
        .invested(toWei(pool_value, decimals), toWei(new_pool,decimals))
        .send({ from: accounts[0] });
    }catch(e) {
      captureException(e, "Assign Lp Tokens");
    }finally {
      setLoading(false);
      onClose()
    }
  };

  return (
    <>
      <DonCommonmodal
        isOpen={open}
        title="Assign Lp Tokens"
        variant="common"
        onClose={props.onClose}
        size="sm"
      >
        <div>
          <p>Previous Pool Value</p>
          <input
            type="text"
            value={pool_value}
            placeholder="Enter Pool Value"
            onChange={(e) => setPoolvalue(e.target.value)}
          />
        </div>
        <div>
          <p>New Pool Value</p>
          <input
            type="text"
            value={new_pool}
            placeholder="Enter Pool Value"
            onChange={(e) => setnewPoolvalue(e.target.value)}
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
              {loading ? <Spinner animation="border" size="sm" /> : "Assign"}
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
