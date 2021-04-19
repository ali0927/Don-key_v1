import ModalPopup from "components/ModalPopup/ModalPopup";
import { FormLabel, Modal } from "react-bootstrap";
import { useState } from "react";
import { FormGroup } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import { updateFarmerDetails } from "actions/farmerActions";
import { IStoreState } from "interfaces";
import { EditIcon } from "icons/EditIcon";
import styled from "styled-components";

const StyledModal = styled(Modal)`
  /* max-width: 450px; */
`;

export const FarmerModal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const [posting, setPosting] = useState(false);
  const farmerInfo = useSelector((state: IStoreState) => state.farmer);
  const [errorMsg, setErrorMsg] = useState("");
  const dispatch = useDispatch();

  const handleUpdateFarmer = (value: any) => {
    dispatch(updateFarmerDetails(value));
  };
  if (!farmerInfo) {
    return null;
  }

  return (
    <>
      <StyledModal centered show={isOpen} onHide={onClose}>
        <h4 className="main-heading">
          <EditIcon />
          Edit farmer bio page
        </h4>

        <FormGroup>
          <div className="uploadImgWrapper">
            <div className="imgBox">
              {/* <img src="/assets/images/trade.png" alt="image" /> */}
            </div>
            <div className="uploadBox">
              <div className="custom-file">
                <input
                  type="file"
                  className="custom-file-input"
                  id="customFile"
                />
                <label className="custom-file-label" htmlFor="customFile">
            
                  new picture
                </label>
              </div>
            </div>
            <div className="deleteIcon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
              >
                <path
                  d="M9.85413 3.66807L8.68108 3.625L8.42676 10.5767L9.59981 10.6196L9.85413 3.66807Z"
                  fill="#474747"
                />
                <path
                  d="M7.58397 3.64844H6.41016V10.6001H7.58397V3.64844Z"
                  fill="#474747"
                />
                <path
                  d="M5.568 10.5806L5.31368 3.62891L4.14062 3.672L4.39497 10.6237L5.568 10.5806Z"
                  fill="#474747"
                />
                <path
                  d="M0.0136719 0.75V1.92492H1.2368L2.20713 12.9621C2.23374 13.2654 2.4875 13.498 2.7917 13.498H11.1843C11.4886 13.498 11.7425 13.2652 11.7689 12.9619L12.7393 1.92492H13.9822V0.75H0.0136719ZM10.6468 12.3231H3.32914L2.41512 1.92492H11.561L10.6468 12.3231Z"
                  fill="#474747"
                />
              </svg>
            </div>
          </div>
        </FormGroup>
        <FormGroup>
          <FormLabel>Name</FormLabel>
          <input
            type="text"
            className="form-control"
            placeholder="Name"
            defaultValue={farmerInfo.name || ""}
          />
        </FormGroup>
        <FormGroup>
          <FormLabel>Description</FormLabel>
          <textarea className="form-control" placeholder="Description">
            {farmerInfo.description}
          </textarea>
        </FormGroup>
        {/* <Button className="btn-block">Save Bio page</Button> */}
        <input
          className="btn-block btn btn-primary"
          type="submit"
          value={"Save Bio page"}
        />
      </StyledModal>
    </>
  );
};
