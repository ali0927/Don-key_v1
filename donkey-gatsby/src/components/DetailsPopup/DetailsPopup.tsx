import { DonCommonmodal } from "components/DonModal";
import React from "react";



export const DetailsPopup = ({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) => {
  return (
    <DonCommonmodal
      className="auctionPop"
      onClose={onClose}
      variant="common"
      title={
        <>
          <div
            style={{
              width: 52,
              height: 52,
              backgroundColor: "#FFF037",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginTop: "-21px",
              marginBottom: '20px'
            }}
          >
            <svg
              width={24}
              height={24}
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0 18.998V21c0 1.655 4.031 3 9 3s9-1.345 9-3v-2.002C16.064 20.362 12.525 21 9 21c-3.525 0-7.064-.637-9-2.002ZM15 6c4.969 0 9-1.345 9-3s-4.031-3-9-3-9 1.345-9 3 4.031 3 9 3ZM0 14.081V16.5c0 1.655 4.031 3 9 3s9-1.345 9-3v-2.419c-1.936 1.594-5.48 2.419-9 2.419-3.52 0-7.064-.825-9-2.419Zm19.5.516C22.186 14.077 24 13.11 24 12V9.998c-1.087.77-2.686 1.294-4.5 1.618v2.98ZM9 7.5c-4.969 0-9 1.678-9 3.75S4.031 15 9 15s9-1.678 9-3.75S13.969 7.5 9 7.5Zm10.28 2.64C22.092 9.632 24 8.64 24 7.5V5.498c-1.664 1.177-4.523 1.81-7.533 1.96 1.383.67 2.4 1.57 2.813 2.681Z"
                fill="#000"
              />
            </svg>
          </div>
        </>
      }
      size="sm"
      isOpen={open}
    >
      <h2 style={{ fontWeight: 700, fontSize: 25 }} className="mb-3">
        Details
      </h2>
      <p style={{marginBottom: '25px'}}>We hope you made money with our money.</p>{" "}
      <p style={{ fontWeight: 100, fontSize: 16, marginBottom: '47px' }}>
        In order to redeem your LP collateral you need to pay:
      </p>
      <div style={{ fontSize: 13 }}>
        <div className="d-flex mb-2 align-items-center justify-content-between">
          <span style={{ fontWeight: 300 }}>LP Value </span>
          <span style={{ fontWeight: 500 }}>250 BUSD</span>
        </div>
        <div className="d-flex mb-2 align-items-center justify-content-between">
          <span style={{ fontWeight: 300 }}>Loan </span>
          <span style={{ fontWeight: 500 }}>175 BUSD</span>
        </div>
        <div className="d-flex mb-2 align-items-center justify-content-between">
          <span style={{ fontWeight: 300 }}>Commission </span>
          <span style={{ fontWeight: 500 }}>20 BUSD</span>
        </div>
      </div>
      <hr />
      <div
        style={{ fontSize: 13 }}
        className="d-flex mb-2 align-items-center justify-content-end"
      >
        <span className="mr-4" style={{ fontWeight: 300 }}>
          Total:{" "}
        </span>
        <span style={{ fontWeight: 600 }}>195 BUSD</span>
      </div>
    </DonCommonmodal>
  );
};
