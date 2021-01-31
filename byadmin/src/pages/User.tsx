import {
  Paper,
  TableContainer,
  Typography,
  Table,
  TableRow,
  TableCell,
  TableBody,
} from "@material-ui/core";
import { DashboardLayout } from "components/DashboardLayout";
import React from "react";

export const User = () => {
  return (
    <DashboardLayout title="Users">
      <div className="p-3">
        <Paper className="p-2">
          <Typography variant="h5">Users</Typography>
          <TableContainer>
            <Table aria-label="custom pagination table">
              <TableBody>
                <TableRow>
                  <TableCell component="th" scope="row">
                    Name
                  </TableCell>
                  <TableCell style={{ width: 160 }} align="right">
                    Last Name
                  </TableCell>
                  <TableCell style={{ width: 160 }} align="right">
                    Address
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </div>
    </DashboardLayout>
  );
};
