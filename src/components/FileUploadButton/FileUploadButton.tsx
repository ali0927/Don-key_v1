import { SmallFolderIcon } from "icons";
import * as React from "react";
import styled from "styled-components";
import { IFileUploadButtonProps } from "./interfaces";

const FileUploadRoot = styled.div`
  position: relative;
  overflow: hidden;
`;

const StyledFileUploadButton = styled.div`
  cursor: pointer;
  background: linear-gradient(0deg, #f2f4f7 0%, #f0f2f5 48.04%, #ffffff 100%);
  border: 1px solid #e5e6ea;
  box-sizing: border-box;
  min-width: 130px;
  height: 33px;
  box-shadow: 0px 6px 12px -6px rgba(24, 39, 75, 0.12);
  border-radius: 4px;
  p {
    font-size: 15px;
  }
  input[type="file"] {
    font-size: 0px;
    cursor: pointer;
    position: absolute;
    left: 0;
    top: 0;
    opacity: 0;
    height: 33px;
    width: 100%;
  }
`;

const ChooseFieldLabel = styled.div`
  font-family: Roboto;
  font-size: 13px;
  font-style: normal;
  font-weight: 400;
  line-height: 15px;
  letter-spacing: 0.02em;
`;

export const FileUploadButton: React.FC<IFileUploadButtonProps> = (props) => {
  const { file, errorMessage, fileExtensions } = props;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      props.onChange(e.target.files[0]);
    }
  };

  return (
    <>
      <FileUploadRoot className="d-flex flex-wrap align-items-center">
        <StyledFileUploadButton className="d-flex align-items-center justify-content-center mr-3">
          <SmallFolderIcon className="mr-2" />
          <ChooseFieldLabel>Choose File</ChooseFieldLabel>
          <input type="file" name="myfile" accept={fileExtensions} required onChange={handleChange} />
        </StyledFileUploadButton>
        <ChooseFieldLabel>
          {file ? file.name : "No file chosen"}
        </ChooseFieldLabel>
        {(errorMessage && errorMessage !== "") && (
          <div className="text-danger mt-2">{errorMessage}</div>
        )}
      </FileUploadRoot>
    </>
  );
};
