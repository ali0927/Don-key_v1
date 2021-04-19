import styled from "styled-components";

const Table = styled.table({
    display: "block",
    width: "100%",
    overflowX: "auto",
    background: "#fff",
    marginBottom: "1rem",
    borderRadius: 5,
});

const TableHead = styled.thead({});

const TableRow = styled.tr({
    height: 100,
    borderBottom: "1px solid #dee2e6",
    transition: "background 0.3s",
    "&:hover": {
        background: "#F3F3F3",
        cursor: "pointer",
    },
});

const TableBody = styled.tbody({});

const TableHeading = styled.th({
    padding: "1rem",
    border: 0,
    fontFamily: "Roboto",
    fontSize: "15px",
    fontStyle: "norma",
    fontWeight: 500,
    lineHeight: "18px",
    letterSpacing: "-0.01em",
    color: "#9B9B9B",
    textAlign: "center",

});

const TableData = styled.td({
    padding: "1rem",
    verticalAlign: "center",
    fontFamily: "Roboto",
    fontSize: "16px",
    fontStyle: "normal",
    fontWeight: 500,
    lineHeight: "19px",
    letterSpacing: "0em",
    textAlign: "center",

})




export {
    Table,
    TableRow,
    TableBody,
    TableHead,
    TableData,
    TableHeading,
}