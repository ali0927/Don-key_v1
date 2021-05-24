import { StrategyName } from "components/StrategyName";
import {
  Table,
  TableBody,
  TableData,
  TableHead,
  TableHeading,
  TableResponsive,
  TableRow,
} from "components/Table";
import { useAxios } from "hooks/useAxios";
import moment from "moment";
import { useState } from "react";
import { IStrategy } from "interfaces";
import { Form, Spinner } from "react-bootstrap";
import styled from "styled-components";

const OutlinedButton = styled.button`
  background-color: transparent;
  border: 1px solid rgba(0, 0, 0, 0.4);
  color: rgba(34, 34, 34, 1);
  border-radius: 5px;
  width: 100%;
  padding: 5px 20px;
  font-size: 12px;
  &:disabled {
    border-color: #d9d9d9;
    color: #d9d9d9;
  }
`;

const SwitchRoot = styled.div`
  label::before {
    box-shadow: none !important;
    cursor: pointer;
  };
  label::after {
    cursor: pointer;
  }
`;

const formatDate = (
  date: string | null | undefined,
  defaultVal: string = ""
) => {
  try {
    if (date) {
      return moment(date).format("MMMM Do YY");
    }
    return defaultVal;
  } catch (e) {
    return defaultVal;
  }
};

const StrategyRow = ({
  strategy: item,
  updating,
  setUpdating,
  onRefetch,
}: {
  strategy: IStrategy;
  updating: boolean;
  setUpdating: (val: boolean) => void;
  onRefetch?: () => void;
}) => {
  const [{ loading }, toggleActive] = useAxios(
    { url: `/api/v2/strategy/${item.id}`, method: "PUT" },
    { manual: true }
  );

  const makeActive = async () => {
    setUpdating(true);
    try {
      await toggleActive({ data: { is_active: true } });
      onRefetch && onRefetch();
    } finally {
      setUpdating(false);
    }
  };

  const renderText = () => {
    if (loading) {
      return <Spinner animation="border" size={"sm"} color="#222" />;
    }
    return item.is_active ? "-" : "Make Active";
  };

  return (
    <TableRow key={item.id}>
      <TableData>
        <StrategyName strategyAddress={item.strategyAddress} />
      </TableData>
      <TableData>{item.profit || "No Profit"}</TableData>
      <TableData>{formatDate(item.lastRan) || "Never"}</TableData>
      <TableData>{item.status || "In-Active"}</TableData>
      <TableData>{formatDate(item.updatedAt)}</TableData>
      <TableData>{formatDate(item.updatedAt)}</TableData>
      {/* <TableData className="text-center">
        {item.is_active ? "Yes" : "No"}
      </TableData> */}
      <TableData>
        <SwitchRoot>
          <Form.Check type="switch" checked={updating}  disabled={updating || item.is_active}  onClick={makeActive}  />
        </SwitchRoot>
      </TableData>
    </TableRow>
  );
};

export const StrategyTable = ({
  strategies,
  onRefetch,
}: {
  strategies: IStrategy[];
  onRefetch: () => void;
}) => {
  const [updating, setUpdating] = useState(false);

  return (
    <TableResponsive>
      <Table>
        <colgroup>
          <col width={"25%"} />
          <col width={"9%"} />
          <col width={"9%"} />
          <col width={"9%"} />
          <col width={"12%"} />
          <col width={"12%"} />
          <col width={"10%"} />
          <col width={"14%"} />
        </colgroup>
        <TableHead>
          <TableRow>
            <TableHeading>Name</TableHeading>
            <TableHeading>Profit</TableHeading>
            <TableHeading>Last Ran</TableHeading>
            <TableHeading>Status</TableHeading>
            <TableHeading>Last Updated</TableHeading>
            <TableHeading>Created On</TableHeading>
            {/* <TableHeading className="text-center">Active</TableHeading> */}
            <TableHeading>Active</TableHeading>
          </TableRow>
        </TableHead>
        <TableBody>
          {strategies.map((item, i) => {
            return (
              <StrategyRow
                key={item.id}
                updating={updating}
                setUpdating={setUpdating}
                strategy={item}
                onRefetch={onRefetch}
              />
            );
          })}
        </TableBody>
      </Table>
    </TableResponsive>
  );
};

export const StrategyTableForInvestor = ({
  strategies,
}: {
  strategies: IStrategy[];
}) => {
  return (
    <TableResponsive>
      <Table>
        <colgroup>
          <col width={"25%"} />
          <col width={"9%"} />
          <col width={"9%"} />
          <col width={"9%"} />
          <col width={"12%"} />
          <col width={"12%"} />
          <col width={"10%"} />
        </colgroup>
        <TableHead>
          <TableRow>
            <TableHeading>Name</TableHeading>
            <TableHeading>Profit</TableHeading>
            <TableHeading>Last Ran</TableHeading>
            <TableHeading>Status</TableHeading>
            <TableHeading>Last Updated</TableHeading>
            <TableHeading>Created On</TableHeading>
            <TableHeading className="text-center">Active</TableHeading>
          </TableRow>
        </TableHead>
        <TableBody>
          {strategies.map((item, i) => {
            return (
              <TableRow key={item.id}>
                <TableData>
                  <StrategyName strategyAddress={item.strategyAddress} />
                </TableData>
                <TableData>{item.profit || "No Profit"}</TableData>
                <TableData>{formatDate(item.lastRan) || "Never"}</TableData>
                <TableData>{item.status || "In-Active"}</TableData>
                <TableData>{formatDate(item.updatedAt)}</TableData>
                <TableData>{formatDate(item.updatedAt)}</TableData>
                <TableData className="text-center">
                  {item.is_active ? "Yes" : "No"}
                </TableData>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableResponsive>
  );
};
