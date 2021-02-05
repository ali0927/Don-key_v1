import { Button } from "@material-ui/core";
import { DashboardLayout } from "components/DashboardLayout";
import { api } from "helpers/api";
import { useGet } from "hooks/useGet";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Modal, Table } from "rsuite";
import { protocolList } from "./protocolsJson";
import { useToastContext } from "./useToastContext";

const { Column, Cell, HeaderCell } = Table;

const DialogComp = ({
  open,
  onClose,
  title,
  description,
  onSuccess,
  cancelText = "Cancel",
  saveText = "Ok",
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  description: string;
  onSuccess: () => void;
  cancelText?: string;
  saveText?: string;
}) => {
  return (
    <Modal show={open} onHide={onClose}>
      <Modal.Header>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{description}</Modal.Body>
      <Modal.Footer>
        <Button onClick={onSuccess} color="primary">
          {saveText}
        </Button>
        <Button onClick={onClose} color="primary" variant="outlined">
          {cancelText}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

const ProtocolActions = ({ rowData, reload }: any) => {
  const history = useHistory();
  const [open, setOpen] = useState(false);
  const { showSuccessToast, showErrorToast } = useToastContext();

  const handleDelete = async () => {
    try {
      await api.delete(`/api/v1/protocols/${rowData.id}`);
      setOpen(false);
      reload();
      showSuccessToast("Protocol Deleted");
    } catch (e) {
      showErrorToast("An Error Occurred");
    }
  };
  return (
    <div
      style={{ fontSize: 10, height: "100%" }}
      className="d-flex  justify-content-around"
    >
      <div
        onClick={() => history.push(`/protocols/edit/${rowData.id}`)}
        className="cursor-pointer d-flex align-items-center"
      >
        <i className="fa fa-pencil-alt" />
      </div>
      <div
        onClick={() => setOpen(true)}
        className="cursor-pointer d-flex align-items-center"
      >
        <i className="fa fa-trash-alt" />
      </div>

      <DialogComp
        title="Are you sure ?"
        description="Deleting Protocol"
        onClose={() => setOpen(false)}
        open={open}
        onSuccess={handleDelete}
      />
    </div>
  );
};

const ProtocolTable = ({
  protocols = [],
  loading,
  reload,
}: {
  protocols: any;
  loading: boolean;
  reload: () => void;
}) => {
  return (
    <Table virtualized loading={loading} height={700} data={protocols}>
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
            return <ProtocolActions reload={reload} rowData={rowData} />;
          }}
        </Cell>
      </Column>
    </Table>
  );
};

export const Protocol = () => {
  const { data, loading, refetchData } = useGet<{data: typeof protocolList}>(
    "/api/v1/protocols",
    {data: []}
  );

  const history = useHistory();

  return (
    <DashboardLayout
      title="Protocols"
      button={
        <Button
          onClick={() => history.push("/protocols/edit")}
          variant="outlined"
        >
          Add New Protocol
        </Button>
      }
    >
      <div className="p-3">
        <ProtocolTable
          reload={refetchData}
          loading={loading}
          protocols={data.data}
        />
      </div>
    </DashboardLayout>
  );
};
