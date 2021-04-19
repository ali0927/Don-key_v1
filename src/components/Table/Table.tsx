import styled from "styled-components";


const TableResponsive = styled.div({
    display: "block",
    width: "100%",
    overflowX: "auto",
})

const Table = styled.table({
    
    width: "100%",
    background: "#fff",
    marginBottom: "1rem",
    borderRadius: 5,
});

const TableHead = styled.thead({});

const TableRow = styled.tr`
       height: 100px;
       border-bottom: 1px solid #dee2e6;
       transition: background 0.3s;
       &:hover {
           background: ${(props: { isHoverOnRow?: boolean }) => props.isHoverOnRow ? "#F3F3F3" : ""};
           cursor: ${(props: { isHoverOnRow?: boolean }) => props.isHoverOnRow ? "pointer" : "auto"};
       },
`;

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
    TableResponsive,
    Table,
    TableRow,
    TableBody,
    TableHead,
    TableData,
    TableHeading,
}