import { makeStyles } from "@material-ui/core";

export const useDialogStyles = makeStyles({
  paper: {
    borderRadius: 10,
    ['@media (max-width:600px)']: {
      borderRadius: 20,
    }
  }
});
