/* eslint-disable no-empty-pattern */
import { Pagination } from "react-bootstrap";
import { VoteIcon } from "icons/VoteIcon";
import * as React from "react";
import { Form, Table } from "react-bootstrap";
import "../DevelopersPage.scss";
import { useAxios } from "hooks/useAxios";
import { ICubeTableProps } from "./interfaces";
import { LikeIcon } from "icons";
import { getVisiblePages } from "../helpers";

export const CubeTable: React.FC<ICubeTableProps> = (props) => {
  const { cubes, uservottedcubes } = props;

  const rows = [5, 10, 15, 20];

  const [selectedRow, setSelectedRow] = React.useState(10);

  const [activePage, setActivePage] = React.useState(1);

  const [{}, executePost] = useAxios(
    { method: "PUT", url: "/api/v1/cubes" },
    { manual: true }
  );

  const rowsCount = cubes.length;

  const calculateTotalPages = React.useMemo(() => {
    if (selectedRow >= rowsCount) {
      return 1;
    }
    const totalPages = Math.round(rowsCount / selectedRow);
    return totalPages;
  }, [rowsCount, selectedRow]);

  React.useEffect(() => {
    setActivePage(1);
  }, [selectedRow]);

  const handleRowChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedRow(parseInt(event.target.value));
  };

  const handleActivePage = (pageNumber: number) => () => {
    setActivePage(pageNumber);
  };

  const handleNextPrev = (key: "next" | "prev") => () => {
    if (key === "next" && activePage !== calculateTotalPages) {
      return setActivePage(activePage + 1);
    }
    if (key === "prev" && activePage !== 1) {
      return setActivePage(activePage - 1);
    }
  };

  const handleVotes = (developercubeid: string) => async () => {
    props.onVote({ devcubeid: developercubeid });
    await executePost({
      data: {
        developercubeid: developercubeid,
      },
    });
  };

  const paginationNumbers = getVisiblePages(activePage, calculateTotalPages);

  const startCube = (activePage - 1) * selectedRow;
  const endCube = activePage * selectedRow;

  return (
    <>
      <div className="tablebg tablebgAuto tablebg1 tableMargin">
        <Table responsive>
          <thead>
            <tr>
              <th>ICON</th>
              <th>PROTOCOL</th>
              <th>LINK GITHUB</th>
              <th>ADDRESS OF DEVELOPER</th>
              <th>VOTES</th>
              <th>VOTE FOR CUBE</th>
            </tr>
          </thead>
          <tbody>
            {[...cubes].slice(startCube, endCube).map((cube, index) => {
              const isVotted =
                uservottedcubes.findIndex((x) => x.devcubeid === cube.id) > -1;
              return (
                <tr key={index}>
                  <td>
                    <img src={cube.iconname} alt="cube icon" />
                  </td>
                  <td>{cube.protocol}</td>
                  <td>
                    <a
                      href={cube.githublink}
                      rel="noreferrer"
                      className="toBodyAnchor"
                      target="_blank"
                    >
                      {cube.githublink}
                    </a>
                  </td>
                  <td>{cube.developeraddress} </td>
                  <td>{cube.votes}</td>
                  <td>
                    {isVotted && <VoteIcon />}
                    {!isVotted && (
                      <LikeIcon
                        className="voteIcon"
                        onClick={handleVotes(cube.id)}
                      />
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>

      <div className="mt-5 mb-5 pagePosition d-flex justify-content-between">
        <p className="pageTable">{`Showing ${startCube + 1}-${
          endCube > rowsCount ? rowsCount : endCube
        } of ${rowsCount}`}</p>

        <div className="paginationTable">
          <Pagination>
            <Pagination.Prev
              className="paginationfocus"
              onClick={handleNextPrev("prev")}
            />
            {paginationNumbers.map((page, index, array) => {
              return (
                <>
                  {array[index - 1] + 2 < page && (
                    <>
                      {" "}
                      <Pagination.Ellipsis key={index} />
                    </>
                  )}

                  <Pagination.Item
                    key={index}
                    className="paginationfocus"
                    active={page === activePage}
                    onClick={handleActivePage(page)}
                  >
                    {page}
                  </Pagination.Item>
                </>
              );
            })}

            <Pagination.Next
              className="paginationfocus"
              onClick={handleNextPrev("next")}
            />
          </Pagination>
        </div>

        <div className="dropTable">
          Show rows
          <span>
            <img
              src="/assets/images/selectdrop.png"
              className="d-inline-block align-top mr-3 ml-2 ml-md-0 mr-md-4"
              alt="Logo"
            />
          </span>
          <Form.Group>
            <Form.Control
              as="select"
              value={selectedRow}
              onChange={handleRowChange}
            >
              {rows.map((row, index) => {
                return (
                  <option key={index} value={row}>
                    {row}
                  </option>
                );
              })}
            </Form.Control>
          </Form.Group>
        </div>
      </div>
    </>
  );
};
