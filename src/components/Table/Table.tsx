import styled from "styled-components";

const TableResponsive = styled.div({
  display: "block",
  width: "100%",
  overflowX: "auto",
});

const Table = styled.table({
  width: "100%",
  background: "#fff",
  marginBottom: "1rem",
  borderRadius: 5,
});

const TableHead = styled.thead({
  fontFamily: "Roboto",
  fontSize: 15,
 
});

const TableRow = styled.tr`
  border-bottom: 1px solid #dee2e6;
  transition: background 0.3s;
  &:hover {
    background: ${(props: { isHoverOnRow?: boolean }) =>
      props.isHoverOnRow ? "#F3F3F3" : ""};
    cursor: ${(props: { isHoverOnRow?: boolean }) =>
      props.isHoverOnRow ? "pointer" : "auto"};
  }
`;

const TableBody = styled.tbody({
  fontFamily: "Roboto",
  fontSize: 16,
  fontWeight: 400,
});

const TableHeading = styled.th({
  padding: "1rem",
  fontWeight: 500,
  color: "rgba(189, 189, 189, 1)",
  "&:first-child": {
    paddingLeft: "2rem",
  },
});

const TableData = styled.td({
  padding: "1rem",
  verticalAlign: "center",

  "&:first-child": {
    paddingLeft: "2rem",
  },
});

export {
  TableResponsive,
  Table,
  TableRow,
  TableBody,
  TableHead,
  TableData,
  TableHeading,
};
