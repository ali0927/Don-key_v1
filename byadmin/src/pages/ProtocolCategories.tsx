import { Button } from "@material-ui/core";
import { DashboardLayout } from "components/DashboardLayout";
import { TableEditDeleteCell } from "components/TableEditDeleteCell";
import { useGet } from "hooks/useGet";
import React from "react";
import { useHistory } from "react-router-dom";
import {  Table } from "rsuite";
const { Column, Cell, HeaderCell } = Table;

export type ICategory = {};

const CategoryTable = ({
    loading,
    categories,
}: {
    loading: boolean;
    categories: ICategory[];
}) => {
    return (
        <Table virtualized loading={loading} height={400} data={categories}>
            <Column width={50} align="center" fixed>
                <HeaderCell>ID</HeaderCell>
                <Cell dataKey="id" />
            </Column>

            <Column flexGrow={1}>
                <HeaderCell>Name</HeaderCell>
                <Cell dataKey="name" />
            </Column>
            <Column width={100} fixed="right">
                <HeaderCell></HeaderCell>
                <Cell>
                    {(rowData: any) => {
                        return (
                            <TableEditDeleteCell
                                onEdit={() => {
                                    // history.push("/users/edit/" + rowData.id);
                                }}
                                onDelete={() => {
                                    // handleDelete(rowData.id);
                                }}
                            />
                        );
                    }}
                </Cell>
            </Column>
        </Table>
    );
};

export const ProtocolCategories = () => {
    const history = useHistory();

    const { data: {data}, loading } = useGet("/api/v1/categories", {data: []});

    return (
        <DashboardLayout
            title="Categories"
            button={
                <Button
                    onClick={() => history.push("/protocols/edit")}
                    variant="outlined"
                >
                    Add New Category
                </Button>
            }
        >
            <div className="p-3">
                <CategoryTable loading={loading} categories={data} />
            </div>
        </DashboardLayout>
    );
};
