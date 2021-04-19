import {
  Table,
  TableBody,
  TableData,
  TableHead,
  TableHeading,
  TableResponsive,
  TableRow,
} from "components/Table";
import styled from "styled-components";

const defaultStrategies = [
  {
    name: "Great march of the crypto Curve DAL * *",
    profit: "$300 100,50",
    id: "1"
  },
  {
    name: "Great march of the crypto Curve DAL * *",
    profit: "$300 100,50",
    id: "2"
  },
  {
    name: "Great march of the crypto Curve DAL * *",
    profit: "$300 100,50",
    id: "3"
  },
];

const OutlinedButton = styled.button`
  background-color: transparent;
  border: 1px solid rgba(0, 0, 0, 0.4);
  color: rgba(34, 34, 34, 1);
  border-radius: 5px;
  padding: 5px 40px;
`;

export const StrategyTable = ({
  strategies = defaultStrategies,
}: {
  strategies?: { name: string; profit: string; id: string; }[];
}) => {
  return (
    <TableResponsive>
      <Table>
        <colgroup>
          <col width={"60%"} />
          <col width={"20%"} />
          <col width={"20%"} />
        </colgroup>
        <TableHead>
          <TableRow>
            <TableHeading>NAME OF STRATEGY</TableHeading>
            <TableHeading>TOTAL PROFIT</TableHeading>
            <TableHeading>RUN STRATEGY</TableHeading>
          </TableRow>
        </TableHead>
        <TableBody>
          {strategies.map((item, i) => {
            return (
              <TableRow key={item.id}>
                <TableData>{item.name}</TableData>
                <TableData>{item.profit}</TableData>
                <TableData>
                  <OutlinedButton onClick={() => {}}>
                    Run Strategy
                  </OutlinedButton>
                </TableData>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableResponsive>
  );
};
