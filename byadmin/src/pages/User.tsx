import { Button } from "@material-ui/core";
import { DashboardLayout } from "components/DashboardLayout";
import React from "react";
import { Table, Column, HeaderCell, Cell } from "rsuite-table";


const dataList = [
  { id: 1, name: "a", email: "a@email.com", avartar: "..." },
  { id: 2, name: "b", email: "b@email.com", avartar: "..." },
  { id: 3, name: "c", email: "c@email.com", avartar: "..." },
];


const App = () => (
  <Table height={500} data={dataList}>
    <Column >
      <HeaderCell>ID</HeaderCell>
      <Cell dataKey="id" />
    </Column>

    <Column >
      <HeaderCell>Name</HeaderCell>
      <Cell dataKey="name" />
    </Column>

    <Column >
      <HeaderCell>Email</HeaderCell>
      <Cell>
        {(rowData: any, rowIndex: any) => {
          return <a href={`mailto:${rowData.email}`}>{rowData.email}</a>;
        }}
      </Cell>
    </Column>

    
  </Table>
);

export const User = () => {
  return (
    <DashboardLayout
      title="Users"
      button={<Button variant="outlined">Add New User</Button>}
    >
      <div className="p-3">
        <App />
      </div>
    </DashboardLayout>
  );
};
