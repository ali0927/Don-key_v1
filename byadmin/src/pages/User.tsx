import { Button } from "@material-ui/core";
import { DashboardLayout } from "components/DashboardLayout";
import { TableEditDeleteCell } from "components/TableEditDeleteCell";
import { useGet } from "hooks/useGet";
import { IUserFromApi } from "interfaces";
import React from "react";
import { Table } from "rsuite";
const { Column, HeaderCell, Cell } = Table;




const UsersTable = ({ users, loading }: { users: IUserFromApi[]; loading: boolean }) => (
  <Table virtualized loading={loading} height={500} data={users}>
    <Column width={100} >
      <HeaderCell>ID</HeaderCell>
      <Cell dataKey="id" />
    </Column>
    <Column width={300}>
      <HeaderCell>Name</HeaderCell>
      <Cell dataKey="name" />
    </Column>
    <Column flexGrow={1}>
      <HeaderCell>Description</HeaderCell>
      <Cell dataKey="description" />
    </Column>
    <Column flexGrow={1} >
      <HeaderCell>Buru Tokens Minted</HeaderCell>
      <Cell dataKey="buru_token_minted" />
    </Column>
    <Column flexGrow={1} >
      <HeaderCell>updatedAt</HeaderCell>
      <Cell dataKey="updatedAt" />
    </Column>
    <Column width={100} fixed="right">
        <HeaderCell></HeaderCell>
        <Cell>
          {() => {
            return <TableEditDeleteCell onEdit={() => {}} onDelete={() => {}} />;
          }}
        </Cell>
      </Column>
  </Table>
);

export const User = () => {

  const { data: {data}, loading } = useGet<{data:IUserFromApi[]}>("/api/v1/accounts", {data: []})


  return (
    <DashboardLayout
      title="Users"
      button={<Button variant="outlined">Add New User</Button>}
    >
      <div className="p-3">
        <UsersTable loading={loading} users={data} />
      </div>
    </DashboardLayout>
  );
};
