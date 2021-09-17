import { makeStyles } from "@material-ui/core";

export const useWalletStyles = makeStyles({
  paper: {
    borderRadius: 15,
    backgroundColor: "#fff",
    marginTop: 15,
    boxShadow: "none !important",
    overflowX: "unset",
    overflowY: "unset",
    "&::before": {
      content: '""',
      position: "absolute",
      marginRight: "-0.71em",
      top: "-5%",
      right: "80%",
      width: 18,
      height: 12,
      backgroundColor: "#000",
      transform: "translate(-50%, 50%) rotate(316deg)",
      clipPath:
        "polygon(-5px -5px, calc(100% + 5px) -5px, calc(100% + 5px) calc(100% + 5px))",
    },
    "@media(min-width: 768px)": {
      "&::before": {
        right: "20%",
      },
    },
  },
  content: {
    minWidth: 233,
    overflow: "auto",
    borderRadius: 15,
  },
});
