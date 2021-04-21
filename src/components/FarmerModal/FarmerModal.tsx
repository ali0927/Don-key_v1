import { Button, Form } from "react-bootstrap";
import { useEffect, useRef, useState } from "react";
import { FormGroup } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import { IStoreState } from "interfaces";
import { EditIcon } from "icons/EditIcon";
import styled from "styled-components";
import { UploadFarmerPicIcon } from "icons/UploadFarmerPicIcon";
import "Pages/FarmerSignupPage/FarmerSignupPage.scss";
import { updateFarmerDetails } from "actions/farmerActions";
import { DonCommonmodal } from "components/DonModal";

const UploadPicButton = styled.button`
  background-color: rgba(255, 250, 192, 1);
  border: 0;
  padding: 10px 17px;
  border-radius: 5px;
  font-size: 14px;
  font-weight: 400;
`;

const StyledImage = styled.img`
  width: 80px;
  height: 80px;
  object-fit: contain;
`;

export const FarmerModal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const [loading, setLoading] = useState(false);
  const farmerInfo = useSelector((state: IStoreState) => state.farmer);
  const [errorMsg, setErrorMsg] = useState("");
  const dispatch = useDispatch();
  const [infoState, setInfoState] = useState<{
    name: string;
    description: string;
    picture: string;
  }>({
    description: farmerInfo?.description || "",
    name: farmerInfo?.name || "",
    picture: farmerInfo?.picture || "",
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  // const [{loading,}] = useAxios(`/api/v2/strategies`)
  const [imageUrl, setImageUrl] = useState("");
  const clickInput = () => {
    inputRef.current?.click();
  };
  const handleChange = (key: keyof typeof infoState, val: string) => {
    setInfoState((old) => ({ ...old, [key]: val }));
  };

  const handleUpdateFarmer = async () => {
    if (!infoState.name) {
      return setErrorMsg("Enter name of Farmer");
    }
    if (!infoState.description) {
      return setErrorMsg("Enter description of Farmer");
    }
    try {
      setLoading(true);
      if (farmerInfo) {
        const updateInfo = {
          id: farmerInfo.GUID,
          description: infoState.description,
          name: infoState.name,
          picture: selectedFile,
        };
        await dispatch(updateFarmerDetails(updateInfo));
        onClose();
      }
    } catch (e) {
      setLoading(false);
      setErrorMsg("Please Try Again Later");
    }
  };

  useEffect(() => {
    if (selectedFile) {
      const url = URL.createObjectURL(selectedFile);
      setImageUrl(url);
      return () => {
        URL.revokeObjectURL(url);
      };
    }
  }, [selectedFile]);

  useEffect(() => {
    setErrorMsg("");
  }, [infoState.name, infoState.picture, infoState.description]);

  if (!farmerInfo) {
    return null;
  }
  return (
    <>
      <DonCommonmodal
        variant="v1"
        size="xs"
        isOpen={isOpen}
        title="Edit farmer bio page"
        icon={<EditIcon />}
        onClose={onClose}
      >
        <FormGroup>
          <div className="d-flex align-items-center my-2">
            {farmerInfo.picture ? (
              <StyledImage src={imageUrl || farmerInfo.picture} />
            ) : null}

            <UploadPicButton onClick={clickInput} className="ml-3">
              <input
                ref={inputRef}
                className="d-none"
                type="file"
                onChange={(e) =>
                  setSelectedFile(e.target.files ? e.target.files[0] : null)
                }
              />
              <UploadFarmerPicIcon className="mr-3" />
              new picture
            </UploadPicButton>
          </div>
        </FormGroup>
        <FormGroup>
          <Form.Label className="signup-field-label">Name</Form.Label>
          <Form.Control
            className="signup-field signup-field-Name"
            onChange={(e) => handleChange("name", e.target.value)}
            value={infoState.name}
            placeholder="Don - Key Name"
          />
        </FormGroup>
        <FormGroup className="mt-3">
          <Form.Label className="signup-field-label">Description</Form.Label>
          <Form.Control
            as="textarea"
            className="signup-field signup-field-description p-3"
            rows={3}
            onChange={(e) => handleChange("description", e.target.value)}
            value={infoState.description}
            placeholder="Don - Key Description"
          />
        </FormGroup>
        {errorMsg && <p className="text-danger mb-0 mt-3">{errorMsg}</p>}
        <Button
          onClick={handleUpdateFarmer}
          disabled={loading}
          className="btn-block btnYellow mt-4"
        >
          Save
        </Button>
      </DonCommonmodal>
    </>
  );
};
