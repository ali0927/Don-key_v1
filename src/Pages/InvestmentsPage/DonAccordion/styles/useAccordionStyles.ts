import {makeStyles} from "@material-ui/core";

export const useAccordionStyles = makeStyles({
    root: {
        marginTop: "0px !important",
        marginBottom: "1px !important",
        boxShadow: "none",
    },
    paper: {
        marginBottom: 0,
    },
    accordionDetails: {
        background: '#fff',
    },
    rounded: {
        borderRadius: 10,
        "&:before" : {
            background: "unset",
        }
    },
    arrow: {
        transform: "rotate(270deg)",
    },
});
