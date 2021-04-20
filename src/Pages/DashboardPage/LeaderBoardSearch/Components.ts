import { Popper } from "@material-ui/core";
import styled from "styled-components";

const BestFarmerTitle = styled.p({
    fontFamily: "Roboto",
    fontStyle: "normal",
    fontWeight: 800,
    fontSize: 30,
    color: "#070602",
});

const SearchBox = styled.div`
    display: flex;
    align-items: center;
    padding-left: 20px;
    padding-right: 20px;
    background: #F3F3F3;
    border-radius: 5px;
    border-bottom-left-radius: ${(props:{isOpened: boolean}) => props.isOpened ? "0px": "5px"};
    border-bottom-right-radius: ${(props:{isOpened: boolean}) => props.isOpened ? "0px": "5px"};
    width: 415px;
    height: 50px;
    position: relative;
    &:hover {
        background: linear-gradient(0deg, #F2F4F7 0%, #F0F2F5 48.04%, #FFFFFF 100%), #F3F3F3;
    }
`

const SearchInput = styled.input`
    border: 0px;
    outline: 0px;
    width: 100%;
    background: transparent;
    margin-left: 20px;
    height: 100%;
    font-family: Roboto;
    fontSize: 14px;
    font-style: normal;
    fontWeight: 400;
`;

const PopperPaper = styled.div({
    background: "#fff",
    borderRadius: "0px 0px 5px 5px",
    minHeight: 200,
    // padding: 20,
    // width: 410
});

const SuggestionLabel = styled.p({
    fontFamily: "Roboto",
    fontSize: 16,
    fontStyle: "normal",
    fontWeight: 400,
    textAlign: "left",
    padding: 20,
    paddingBottom: 5,
    color: "#9B9B9B",
});

const SelectArrowBox = styled.div({
    opacity: 0,
    "&:hover": {
        opacity: 1
    }
})

const LeaderBox = styled.div`
    display: flex;
    align-items: center;
    padding: 10px;
    padding-left: 20px;
    padding-right: 20px;
    &:hover  {
        cursor: pointer;
        background: #F3F3F3;
       
    };
    &:hover ${SelectArrowBox} {
        opacity: 1
    }
`

const LeaderContent = styled.div({
    marginLeft: "1rem",
});

const FarmerTypography = styled.p({
    fontFamily: "Roboto",
    fontSize: 16,
    fontStyle: "normal",
    fontWeight: 400,
    textAlign: "left",
    margin: 0,
});

const Caption = styled.p({
    fontFamily: "Roboto",
    fontSize: 13,
    fontStyle: "normal",
    fontWeight: 400,
    color: "#9B9B9B",
    margin: 0,
});

const SearchPopper = styled(Popper)`
     min-height: 200px;
     max-height: 490px;
     overflow: hidden;
     width: 100%;
     position: absolute !important;
     top: 50px !important;
     overflow-y: scroll;
    /* width */
      ::-webkit-scrollbar {
      width: 5px;
    }

    /* Track */
     ::-webkit-scrollbar-track {
       background: #f1f1f1; 
     }
 
   /* Handle */
     ::-webkit-scrollbar-thumb {
     background: #888; 
    }

   /* Handle on hover */
     ::-webkit-scrollbar-thumb:hover {
     background: #555; 
    }
`

const SelectContent = styled(Caption)({
    color: "#6C6C6C",
    marginRight: "1rem",
});

const SearchSpinnerBox = styled.div({
   display: "flex",
   alignItems: "center",
   justifyContent: "center",
   minHeight: "200px"
});

const Image = styled.img({
    width: 40,
    height: 40,
    borderRadius: 5,
});


export {
    BestFarmerTitle,
    SearchBox,
    SearchInput,
    PopperPaper,
    SuggestionLabel,
    SelectArrowBox,
    LeaderBox,
    LeaderContent,
    FarmerTypography,
    Caption,
    SearchPopper,
    SelectContent,
    SearchSpinnerBox,
    Image,
}
