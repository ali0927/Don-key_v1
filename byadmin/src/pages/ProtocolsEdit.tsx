import { Button, FormControlLabel, Switch, TextField } from "@material-ui/core";
import { DashboardLayout } from "components/DashboardLayout";
import { api } from "helpers/api";
import { useEffect } from "react";
import { useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Loader } from "rsuite";
import { useInputState } from "../hooks/useInputState";
import { useToastContext } from "../hooks/useToastContext";

export const ProtocolsEdit = () => {
  const { id } = useParams<{ id: string }>();

  const [name, setName] = useInputState("");
  const [description, setdescription] = useInputState("");
  const [toolbarImage, setToolbarImage] = useInputState("");
  const [website, setWebsiteUrl] = useInputState("");
  const [vertex, setVertexImage] = useInputState("");
  const [edgeColor, setEdgeColor] = useInputState("");
  const [showonToolbar, setshowontoolbar] = useState(false);

  const { showErrorToast, showSuccessToast } = useToastContext();

  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (id) {
      
      api.get("/api/v1/protocols/" + id).then((res) => {
        const data = res.data.data;
        setName(data.name);
        setWebsiteUrl(data.website);
        setToolbarImage(data.toolbarImageURL);
        setshowontoolbar(data.showOnToolbar === "1");
        setEdgeColor(data.edgeColor);
        setdescription(data.description);
        setVertexImage(data.vertexImageURL);
        setIsReady(true);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const handleAddition = async () => {
    setLoading(true);
    try {
      await api.post("/api/v1/protocols", {
        name: name,
        website: website,
        toolbarImageURL: toolbarImage,
        showOnToolbar: showonToolbar ? "1" : "0",
        edgeColor: edgeColor,
        description: description,
        vertexImageURL: vertex,
      });
      showSuccessToast("Added New Protocol");
      history.push("/protocols");
    } catch (e) {
      showErrorToast("An Error Occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      await api.put("/api/v1/protocols/" + id, {
        name: name,
        website: website,
        toolbarImageURL: toolbarImage,
        showOnToolbar: showonToolbar ? "1" : "0",
        edgeColor: edgeColor,
        description: description,
        vertexImageURL: vertex,
      });
      showSuccessToast("Updated Protocol");
      history.push("/protocols");
    } catch (e) {
      showErrorToast("An Error Occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout title="Protocols">
      <div className="p-3 mt-3">
        <div
          style={{ border: "1px solid #d9d9d9", background: "#fff",  }}
          className="col-sm-8 p-3 py-4"
        >
          {!isReady && id ?<div className="d-flex align-items-center justify-content-center" style={{minHeight: 100}}>
            <Loader />
          </div> : (
            <>
              <div className="row">
                <div className="col-6 mb-3">
                  <TextField
                    variant="filled"
                    fullWidth
                    label="ID"
                    value={id}
                    disabled
                  />
                </div>
                <div className="col-6 mb-3">
                  <TextField
                    variant="outlined"
                    value={name}
                    onChange={setName}
                    fullWidth
                    disabled={loading}
                    label="Name"
                  />
                </div>
                <div className="col-6 ">
                  <TextField
                    variant="outlined"
                    className=" mb-3"
                    fullWidth
                    value={website}
                    disabled={loading}
                    onChange={setWebsiteUrl}
                    label="Website URL"
                  />
                  <TextField
                    variant="outlined"
                    className=" mb-3"
                    fullWidth
                    value={toolbarImage}
                    disabled={loading}
                    onChange={setToolbarImage}
                    label="Toolbar Image URL"
                  />
                  <TextField
                    variant="outlined"
                    className=" mb-3"
                    fullWidth
                    value={vertex}
                    disabled={loading}
                    onChange={setVertexImage}
                    label="Vertex Image URL"
                  />
                </div>
                <div className="col-6">
                  <TextField
                    variant="outlined"
                    multiline
                    rows={6}
                    className="mb-3"
                    fullWidth
                    value={description}
                    disabled={loading}
                    onChange={setdescription}
                    label="Description"
                  />
                  <TextField
                    variant="outlined"
                    className="mb-3"
                    fullWidth
                    value={edgeColor}
                    disabled={loading}
                    onChange={setEdgeColor}
                    label="Edge Color"
                  />
                </div>
                <div className="col-6">
                  <FormControlLabel
                    control={
                      <Switch
                        checked={showonToolbar}
                        onChange={() => setshowontoolbar((val) => !val)}
                        name="checkbox"
                        color="primary"
                      />
                    }
                    label="Show on Toolbar"
                    labelPlacement="start"
                  />
                </div>
              </div>
              <div className="row">
                <div className="col d-flex justify-content-end">
                  {id ? (
                    <Button
                      color="primary"
                      variant="contained"
                      disabled={loading}
                      onClick={handleSave}
                    >
                      Save
                    </Button>
                  ) : (
                    <Button
                      color="primary"
                      variant="contained"
                      disabled={loading}
                      onClick={handleAddition}
                    >
                      Add
                    </Button>
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};
