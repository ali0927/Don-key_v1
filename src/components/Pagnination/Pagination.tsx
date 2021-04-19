
import { LeftArrow, RightArrowIcon } from "icons";
import * as React from "react";
import styled from "styled-components";
import { Pagination as BootStrapPagnination } from "react-bootstrap";
import { IPaginationProps } from "./interfaces";
import { getVisiblePages } from "don-utils";

const PaginationItem = styled.li<{ active?: boolean }>`
    font-family: Roboto;
    font-size: 15;
    font-style: normal;
    font-weight: 400;
    letter-spacing: 0px;
    width: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 30;
    border :  ${p => (p.active ? "1px solid #070602" : "0")};
    border-radius :  ${p => (p.active ? "5px" : "0px")};
    cursor: pointer;
`;


const ShowingMore = styled.p({
    fontFamily: "Roboto",
    fontSize: 14,
    fontStyle: "normal",
    fontWeight: 400,
    lineHeight: "19px",
    letterSpacing: "0px",
});



const ShowMoreRowsSelect = styled.select({
    borderColor: "#fff",
    borderRadius: 5,
    width: 67,
    height: 32,
    display: "block",
    padding: ".375rem .75rem",
    fontSize: "1rem",
    fontWeight: 400,
    lineHeight: 1.5,
    color: "#495057",
    backgroundColor: "#fff",
    backgroundClip: "padding-box",
    transition: "border-color .15s ease-in-out,box-shadow .15s ease-in-out",
})


const CenteredDiv = styled.div({
    display: "flex",
    alignItems: "center",
})


export const Pagination: React.FC<IPaginationProps> = (props) => {
    const { rowscount } = props;

    const [activePage, setActivePage] = React.useState(1);
    const [selectedRow, setSelectedRow] = React.useState(10);

    const calculateTotalPages = React.useMemo(() => {
        if (selectedRow >= rowscount) {
            return 1;
        }
        const totalPages = Math.round(rowscount / selectedRow);
        return totalPages;

    }, [rowscount, selectedRow]);

    const paginationNumbers = getVisiblePages(activePage, calculateTotalPages);


    const startCube = (activePage - 1) * selectedRow;
    const endCube = activePage * selectedRow

    React.useEffect(() => {
        setActivePage(1);
    }, [selectedRow])



    const handleRowChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedRow(parseInt(event.target.value));
    }

    const handleActivePage = (pageNumber: number) => () => {
        setActivePage(pageNumber);
    }

    const handleNextPrev = (key: "next" | "prev") => () => {
        if (key === "next" && activePage !== calculateTotalPages) {
            return setActivePage(activePage + 1);
        }
        if (key === "prev" && activePage !== 1) {
            return setActivePage(activePage - 1);
        }
    }



    return (
        <>
            <div className="mt-5 mb-5 pagePosition d-flex justify-content-between">
                <CenteredDiv>
                    <ShowingMore>{`Showing ${startCube + 1}-${endCube > rowscount ? rowscount : endCube} of ${rowscount}`}</ShowingMore>
                </CenteredDiv>

                <BootStrapPagnination>
                    <PaginationItem active={false} onClick={handleNextPrev("prev")}><LeftArrow /></PaginationItem>
                    {paginationNumbers.map((page, index, array) => {
                        return <>
                            {(array[index - 1] + 2 < page) &&
                                <>  <PaginationItem>....</PaginationItem></>
                            }

                            <PaginationItem
                                onClick={handleActivePage(page)}
                                active={activePage === index}>
                                {page}
                            </PaginationItem>
                        </>
                    })

                    }

                    <PaginationItem active={false} onClick={handleNextPrev("next")}><RightArrowIcon /></PaginationItem>
                </BootStrapPagnination>

                <div className="d-flex">
                    <CenteredDiv>
                        <ShowingMore className="mr-3"> Show rows</ShowingMore>
                    </CenteredDiv>

                    <ShowMoreRowsSelect value={5}>
                        {[5, 10, 15, 20, 25].map((row, index) => {
                            return <option key={index} value={row}>{row}</option>
                        })

                        }
                    </ShowMoreRowsSelect>

                </div>

            </div>

        </>
    )
}