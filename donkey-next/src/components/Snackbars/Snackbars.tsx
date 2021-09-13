import { CircularProgress } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { forwardRef } from "react";

export const ProgressSnackbar = forwardRef<
any,
{
  message: string;
}
>(({ message }: { message: string }, ref) => {
  return (
    <Alert
      className="shadow-sm"
      ref={ref}
      severity="success"
      icon={<CircularProgress color="inherit" size={"1rem"} />}
    >
      {message}
    </Alert>
  );
});

export const ErrorSnackbar = forwardRef<
any,
{
  message: string;
}
>(({ message }: { message: string }, ref) => {
  return (
    <Alert ref={ref} className="shadow-sm" severity="error">
      {message}
    </Alert>
  );
});

export const SuccessSnackbar = forwardRef<
  any,
  {
    message: string;
  }
>(({ message }, ref) => {
  return (
    <Alert ref={ref} className="shadow-sm" severity="success">
      {message}
    </Alert>
  );
});
