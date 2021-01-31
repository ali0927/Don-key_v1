import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@material-ui/core";
import { DashboardLayout } from "components/DashboardLayout";
import { api } from "helpers/api";
import { useGet } from "hooks/useGet";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Table, Column, HeaderCell, Cell } from "rsuite-table";
import { protocolList } from "./protocolsJson";
import { useToastContext } from "./useToastContext";


const DialogComp = ({open, onClose, title, description, onSuccess , cancelText="Disagree", saveText ="Agree"}: {
  open: boolean;
  onClose: () => void; title: string; description: string;
  onSuccess: () => void;
  cancelText?: string;
  saveText?: string;
}) => {
  return <Dialog
  
  open={open}
  onClose={onClose}
  BackdropProps={{style: { display: "none"}}}
  fullWidth
  maxWidth="sm"
>
  <DialogTitle >{title}</DialogTitle>
  <DialogContent>
    <DialogContentText>
    {description}
    </DialogContentText>
  </DialogContent>
  <DialogActions>
    <Button autoFocus onClick={onClose} color="primary">
      {cancelText}
    </Button>
    <Button onClick={onSuccess} color="primary" autoFocus>
      {saveText}
    </Button>
  </DialogActions>
</Dialog>
}

const ProtocolTable = ({
  protocols = [],
  loading,
  reload
}: {
  protocols: any;
  loading: boolean;
  reload: () => void;
}) => {

  const [open,setOpen] = useState(false);
  const {showSuccessToast, showErrorToast} = useToastContext();

  const history = useHistory();

  return (
    <Table virtualized loading={loading} height={500} data={protocols}>
      <Column width={50} align="center" fixed>
        <HeaderCell>ID</HeaderCell>
        <Cell dataKey="id" />
      </Column>
      <Column width={100} align="center" fixed>
        <HeaderCell>Toolbar Image</HeaderCell>
        <Cell>
          {(rowData: any) => {
            return (
              <div className="d-flex justify-content-center">
                <img
                  alt="protocol img"
                  style={{ width: 30 }}
                  className="img-fluid"
                  src={rowData.toolbarImageURL}
                />
              </div>
            );
          }}
        </Cell>
      </Column>
      <Column flexGrow={1}>
        <HeaderCell>Name</HeaderCell>
        <Cell dataKey="name" />
      </Column>

      <Column align="center" flexGrow={1}>
        <HeaderCell>Edge Color</HeaderCell>
        <Cell>
          {(row: any) => {
            return (
              <div className="d-flex justify-content-center">
                <div
                  style={{
                    width: 20,
                    height: 20,
                    borderRadius: 3,
                    backgroundColor: row.edgeColor,
                  }}
                />
              </div>
            );
          }}
        </Cell>
      </Column>
      <Column align="center" flexGrow={1}>
        <HeaderCell>showOnToolbar</HeaderCell>
        <Cell>
          {(row: any) => {
            return row.showOnToolbar === "1" ? "Yes" : "No";
          }}
        </Cell>
      </Column>
      <Column flexGrow={3}>
        <HeaderCell>Website</HeaderCell>
        <Cell dataKey="website" />
      </Column>
      <Column flexGrow={3}>
        <HeaderCell>Description</HeaderCell>
        <Cell dataKey="description" />
      </Column>
      <Column width={100} fixed="right">
        <HeaderCell></HeaderCell>
        <Cell>
          {(rowData: any) => {
            const handleDelete = async () => {
              
              try {
                 await api.delete(`/api/v1/protocols/${rowData.id}`);
                 setOpen(false);
                 reload()
                 showSuccessToast("Protocol Deleted");
              }catch(e){
                showErrorToast("An Error Occurred");
              }
              
            }
            return (
              <div
                style={{ fontSize: 10, height: "100%" }}
                className="d-flex  justify-content-around"
              >
                <div onClick={() => history.push(`/protocols/edit/${rowData.id}`)} className="cursor-pointer d-flex align-items-center">
                  <i className="fa fa-pencil-alt" />
                </div>
                <div onClick={() => setOpen(true)} className="cursor-pointer d-flex align-items-center">
                  <i className="fa fa-trash-alt" />
                </div>
                {open && <DialogComp  
                  title="Are you sure ?"
                  
                  description="Deleting Protocol"
                  onClose={() => setOpen(false)}
                  open={open}
                  onSuccess={handleDelete}
                />}
              </div>
            );
          }}
        </Cell>
      </Column>
    </Table>
  );
};

export const Protocol = () => {
  const { data, loading, refetchData } = useGet<typeof protocolList>(
    "/api/v1/protocols",
    []
  );

  const history = useHistory();

  return (
    <DashboardLayout
      title="Protocols"
      button={<Button onClick={() => history.push("/protocols/edit")} variant="outlined">Add New Protocol</Button>}
    >
      <div className="p-3">
        <ProtocolTable reload={refetchData} loading={loading} protocols={data} />
      </div>
    </DashboardLayout>
  );
};
