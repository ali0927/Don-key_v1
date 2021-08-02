import { DonCommonmodal } from "components/DonModal";
import React, { useEffect, useState } from "react";
import styled from "styled-components";

import { ButtonWidget } from "components/Button";
import html2canvas from "html2canvas";
import { api, uuidv4 } from "don-utils";
import { Spinner } from "react-bootstrap";
import {
  getPoolContract,
  getShareUrl,
  getTokenAddress,
  getTokenPrice,
  getTotalPoolValue,
  getUserReferralCode,
  signUpAsReferral,
  toEther,
} from "helpers";
import { useWeb3 } from "don-components";
import BigNumber from "bignumber.js";
import { useReferralContext } from "contexts/ReferralContext";
import Web3 from "web3";

const ReadMore = styled.div`
  font-family: Roboto;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 19px;
  letter-spacing: 0em;
  text-align: left;
  color: #a8a8a8;
  cursor: pointer;
`;

const CancelButton = styled(ButtonWidget)`
  border-radius: 5px;
  :hover {
    background: #fff !important;
  }
`;

const setShareUrl = (
  poolAddress: string,
  data: { imageUrl: string; shortUrl: string }
) => {
  localStorage.setItem(poolAddress, JSON.stringify(data));
};

export const UpdatePoolDialog: React.FC<{
  open: boolean;
  pool_address: string;
  poolVersion: number;
  onClose: () => void;
}> = (props) => {
  const { open, pool_address, poolVersion } = props;

  const [loading, setLoading] = React.useState(false);

  const [pool_value, setPoolvalue] = useState("");

  const [new_pool, setnewPoolvalue] = useState("");
  const web3 = useWeb3();
  const handleUpdate = async () => {
    setLoading(true);
    try {
      const pool = await getPoolContract(web3, pool_address, poolVersion);
      const accounts = await web3.eth.getAccounts();
      await pool.methods
        .invested(Web3.utils.toWei(pool_value), Web3.utils.toWei(new_pool))
        .send({ from: accounts[0] });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <DonCommonmodal
        isOpen={open}
        title="Update Pool Value"
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
