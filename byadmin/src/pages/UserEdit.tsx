import { Button, TextField } from "@material-ui/core"
import { DashboardLayout } from "components/DashboardLayout"
import { useGet } from "hooks/useGet";
import { usePost } from "hooks/usePost";
import { usePut } from "hooks/usePut";
import { IUserFromApi } from "interfaces";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { Loader } from "rsuite"

export const UserEdit = () => {
    const { id } = useParams<{ id: string }>();
    const { loading: isCreating, post } = usePost<Partial<IUserFromApi>>(`/api/v1/accounts`);
    const { loading: isReady,data: {data} } = useGet<{data: IUserFromApi | null}>(`/api/v1/accounts/${id}`, {data: null}, [id]);

    const { loading: isUpdating, put } = usePut<Partial<IUserFromApi>>(`/api/v1/accounts`);

    const [{name,buru_token_minted,description,picture}, setState] = useState<IUserFromApi>(data as IUserFromApi);

    const handleSave = async () => {
        await put({name,picture,description,buru_token_minted})
    }
    const handleAddition = async () => {
        await post({name,buru_token_minted,description,picture})
    }

    const loading = isCreating || isUpdating;

    const onChange = (key: keyof IUserFromApi) => (e: React.ChangeEvent<HTMLInputElement>) => {
        setState(old => ({...old, [key]: e.target.value}))
    }

    return <DashboardLayout title="Edit User">
        <div className="p-3 mt-3">
            <div
                style={{ border: "1px solid #d9d9d9", background: "#fff", }}
                className="col-sm-8 p-3 py-4"
            >
                {!isReady && id ? <div className="d-flex align-items-center justify-content-center" style={{ minHeight: 100 }}>
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
                                        onChange={onChange("name")}
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
                                        value={buru_token_minted}
                                        disabled={loading}
                                        onChange={onChange("buru_token_minted")}
                                        label="Buru Tokens"
                                    />
                                    
                                    <TextField
                                        variant="outlined"
                                        className=" mb-3"
                                        fullWidth
                                        value={picture}
                                        disabled={loading}
                                        onChange={onChange("picture")}
                                        label="Picture"
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
                                        onChange={onChange("description")}
                                        label="Description"
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
}