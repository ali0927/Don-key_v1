import React from "react";
import styled from "styled-components";
import { IColumn } from "./interfaces";

const Columns = styled.div`
  border-right: 1px solid #ededf2;
  min-height: 50px;
  :last-child {
    border-right: none;
  }
`;

const ColumnsTitle = styled.p`
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 19px;
  letter-spacing: 0em;
  text-align: center;
  color: #fff;
  font-size: 11px;
`;

const ColumnsSubTitle = styled.p`
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 0px;
  letter-spacing: 0em;
  text-align: center;
  color: #fff;
`;

export const Column: React.FC<IColumn> = (props) => {
  const { label, value } = props;

  return (
    <>
      <Columns className="col-md-3 d-flex align-items-center justify-content-center">
        <div>
          <ColumnsTitle>{label}</ColumnsTitle>
          <ColumnsSubTitle>{value}</ColumnsSubTitle>
        </div>
      </Columns>
    </>
  );
};
