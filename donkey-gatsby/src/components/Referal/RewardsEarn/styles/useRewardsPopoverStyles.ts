import { makeStyles } from "@material-ui/core";

export const useRewardsPopoverStyles = makeStyles({
  paper: {
    borderRadius: 15,
    background: "#fff",
    marginTop: 15,

    overflowX: "unset",
    overflowY: "unset",

  },
  content: {
    width: 500,
    overflow: "auto",
    borderRadius: 15,
    padding: "35px 25px 10px",
    // zIndex: 1000,
    background: "#fff",
    boxShadow: "0px 3.42797px 17.1398px rgba(0, 0, 0, 0.1)",
   
  },
});
