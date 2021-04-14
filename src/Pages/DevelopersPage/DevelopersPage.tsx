import clsx from "clsx";
import { Footer } from "components/Footer/Footer";
import { NavBar } from "components/Navbar/NavBar";
import { PopularStrategy } from "components/PopularStrategy/PopularStrategy";
import "./DevelopersPage.scss";
import { leaderBoardData } from "../../JsonData/leaderboard";
import { Form, Pagination, Row, Container, Col, Table, Button, FormGroup, Spinner, } from "react-bootstrap";
import ButtonComponent from "components/Button/Button";
import { EraserIcon, FileIcon, FolderIcon, UploadIcon } from "icons";
import DataFarmer from "../../JsonData/DataFarmer";
import { VoteIcon } from "icons/VoteIcon";
import React, { useState } from "react";
import { DeveloperCubeModal } from "./DeveloperCubeModal";
import { AddIcon } from "../../icons";
import { ICubeTable, IDeveloperCubeProps, IUserVottedCubes } from "./interfaces";
import { handleInputChange } from "react-select/src/utils";
import { useAxios } from "hooks/useAxios";
import { CubeTable } from "./CubeTable";
import _ from "lodash";


export const DevelopersPage = () => {

    const [open, openDialog] = useState(false);
    const [state, setState] = useState<IDeveloperCubeProps>({
        nameCube: "",
        githublink: "",
        icon: null,
        fileName: "",

    });

    const [resposne, setResponse] = useState<"error" | "success">("success");

    const [{ loading }, executePost] = useAxios(
        { method: "POST", url: "/api/v1/cubes" },
        { manual: true }
    );

    const [{ data: cubesData }] = useAxios(
        { method: "GET", url: "/api/v1/cubes" },
    );


    const [cubes, setCubes] = useState<ICubeTable[]>([]);
    const [uservottedcubes, setUservottedcubes] = useState<IUserVottedCubes[]>([]);




    React.useEffect(() => {
        if (cubesData) {
            setCubes(cubesData.data.cubes)
            setUservottedcubes(cubesData.data.uservottedcubes)
        }
    }, [cubesData])






    const toggleDialog = () => {
        openDialog(!open);
    }


    const handeChange = (name: keyof IDeveloperCubeProps) => (e: React.ChangeEvent<HTMLInputElement>) => {
        setState({
            ...state,
            [name]: e.target.value,
        });
    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const file = e.target.files[0];
            setState({
                ...state,
                icon: file,
                fileName: file.name,
            });
        }
    }

    const handleDeleteFile = () => {
        setState({
            ...state,
            icon: null,
            fileName: "",
        });
    }

    const handleSave = async (e: React.MouseEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("namecube", state.nameCube);
        formData.append("githublink", state.githublink);
        formData.append("picture", state.icon as File);
        const result = await executePost({
            data: formData,
        });
        const data = result.data.data;
        setCubes([{ ...data }, ...cubes])
        setResponse("success");
        setState({
            nameCube: "",
            githublink: "",
            icon: null,
            fileName: "",
        })
        toggleDialog();
    }

    const handleVote = (vote: IUserVottedCubes) => {
        const updatedCubes = _.map(cubes, function (cube) {
            if (cube.id === vote.devcubeid) {
                return { ...cube, votes: cube.votes + 1 };
            }
            return cube;
        });

        setCubes(updatedCubes);
        setUservottedcubes([...uservottedcubes, vote]);
    }





    return (
        <div className={clsx("bgColor")}>
            <NavBar variant="loggedin" />
            <div className="navbanHead pt-5 pb-5">
                <Container>
                    <Row>
                        <Col>
                            <h2 className="firstHeading mb-5">Developers</h2>
                        </Col>
                    </Row>

                    <Row className="headermb">
                        <Col>
                            <p className="paragraphCube">Table of Cubes</p>
                        </Col>
                        <Col className="d-flex justify-content-end">
                            <div className="d-flex justify-content-center align-items-center FileIcon mr-4">
                                <FileIcon />
                            </div>
                            <ButtonComponent className="btnMaire" onClick={toggleDialog}>
                                Add cube
                             </ButtonComponent>

                            {open &&
                                <DeveloperCubeModal show={open} size="sm" headerIcon={<AddIcon />} heading={"Create Cube"} onClose={toggleDialog}>
                                    <form method="POST" onSubmit={handleSave}>
                                        <Form.Group controlId="namecube" className="form-custom-group mb-5">
                                            <Form.Label>Name cube</Form.Label>
                                            <Form.Control name="namecube" value={state.nameCube} required onChange={handeChange("nameCube")} />
                                        </Form.Group>

                                        <Form.Group controlId="link" className="form-custom-group mb-5">
                                            <Form.Label>Link Github</Form.Label>
                                            <Form.Control name="link" value={state.githublink} required onChange={handeChange("githublink")} />
                                        </Form.Group>


                                        {!state.icon &&
                                            <div className="upload-btn-wrapper d-flex align-items-center justify-content-center mb-5">
                                                <UploadIcon />
                                                <p className="ml-2">Upload icon</p>
                                                <input type="file" name="myfile" required onChange={handleFileChange} />
                                            </div>
                                        }

                                        {state.icon &&
                                            <div className="mb-5">
                                                <Form.Group controlId="fileInfo" className="form-custom-group">
                                                    <Form.Label>Upload Icon</Form.Label>
                                                    <Form.Control name="fileInfo" value={state.fileName} />
                                                </Form.Group>
                                                <div className="d-flex justify-content-end">
                                                    <EraserIcon className="mr-3 iconCursor" onClick={handleDeleteFile} />

                                                    <div className="upload-folder-wrapper">
                                                        <FolderIcon className="iconCursor" />
                                                        <input type="file" name="myfile" onChange={handleFileChange} />
                                                    </div>
                                                </div>
                                            </div>

                                        }

                                        <ButtonComponent type="submit" disabled={loading} className="btnYellow w-100 btn-disabled">
                                            {loading &&
                                                <Spinner animation="border" role="status" />
                                            }
                                            {!loading &&
                                                <>Add Cube</>
                                            }
                                        </ButtonComponent>

                                        {resposne === "error" &&
                                            <div className="mt-3 error">
                                                Please try again later.
                                          </div>
                                        }


                                    </form>
                                </DeveloperCubeModal>
                            }



                        </Col>
                    </Row>



                </Container>


            </div>
            <Container className="tableContainer">
                <CubeTable cubes={cubes} uservottedcubes={uservottedcubes} onVote={handleVote} />
            </Container>
            <Footer />
        </div>
    );
};
