import ModalPopup from "components/ProtocolsModal/ProtocolsModal";
import {
  Row,
  Col,
  Form,
  InputGroup,
  Tab,
  Nav,
  Tabs,
  Button,
  FormLabel,
} from "react-bootstrap";
import ButtonComponent from "components/Button/Button";
import { useState } from "react";
import "./FarmerModal.scss";
import { FormGroup } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { updateFarmerDetails } from "actions/farmerActions";

type FarmerInfoChange = {
  name: string;
  description?: string;
  picture?: File;
};

export const FarmerModal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const [posting, setPosting] = useState(false);
  const farmerInfo = useSelector((state: any) => state.farmer);
  const [errorMsg, setErrorMsg] = useState("");
  const dispatch = useDispatch();

  /**
   * * @useForm hooks
   */
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FarmerInfoChange>();

  const handleUpdateFarmer = (value: FarmerInfoChange) => {
    dispatch(updateFarmerDetails(value));
  };

  return (
    <>
      <ModalPopup
        show={isOpen}
        onHide={onClose}
        className="editFarmerBio-Modal"
      >
        <h4 className="main-heading">
          <span className="editIcon">
            <svg
              width="13"
              height="13"
              viewBox="0 0 13 13"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12.1266 1.96013L11.0392 0.872631C10.5423 0.375778 9.73398 0.375801 9.23715 0.872631L8.81152 1.29828L11.701 4.18799L12.1266 3.76234C12.6246 3.26432 12.6247 2.45821 12.1266 1.96013Z"
                fill="#36352C"
              />
              <path
                d="M1.01591 9.32812L0.505881 12.0825C0.48481 12.1964 0.521092 12.3133 0.602959 12.3952C0.68492 12.4771 0.801874 12.5133 0.915569 12.4923L3.66976 11.9822L1.01591 9.32812Z"
                fill="#36352C"
              />
              <path
                d="M8.31449 1.79688L1.39551 8.71639L4.28498 11.6061L11.204 4.68659L8.31449 1.79688Z"
                fill="#36352C"
              />
            </svg>
          </span>
          Edit farmer bio page
        </h4>
        <Form autoComplete="off" onSubmit={handleSubmit(handleUpdateFarmer)}>
          <FormGroup>
            <div className="uploadImgWrapper">
              <div className="imgBox">
                <img src="/assets/images/trade.png" alt="image" />
              </div>
              <div className="uploadBox">
                <div className="custom-file">
                  <input
                    type="file"
                    className="custom-file-input"
                    id="customFile"
                  />
                  <label className="custom-file-label" htmlFor="customFile">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="15"
                      height="16"
                      viewBox="0 0 15 16"
                      fill="none"
                      className="mr-1"
                    >
                      <path
                        d="M13.8281 9.66016V13.7324C13.8281 14.0555 13.5653 14.3184 13.2422 14.3184H1.75781C1.43473 14.3184 1.17188 14.0555 1.17188 13.7324V9.66016H0V13.7324C0 14.7017 0.788555 15.4902 1.75781 15.4902H13.2422C14.2114 15.4902 15 14.7017 15 13.7324V9.66016H13.8281Z"
                        fill="#474747"
                      />
                      <path
                        d="M7.50148 0.511719L3.86035 4.15285L4.68898 4.98148L6.91555 2.75492V11.8872H8.08742V2.75492L10.314 4.98148L11.1426 4.15285L7.50148 0.511719Z"
                        fill="#474747"
                      />
                    </svg>
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
              defaultValue={farmerInfo.user.name}
            />
          </FormGroup>
          <FormGroup>
            <FormLabel>Description</FormLabel>
            <textarea className="form-control" placeholder="Description">
              {farmerInfo.user.description}
            </textarea>
          </FormGroup>
          {/* <Button className="btn-block">Save Bio page</Button> */}
          <input
            className="btn-block btn btn-primary"
            type="submit"
            value={"Save Bio page"}
          />
        </Form>
      </ModalPopup>
    </>
  );
};
