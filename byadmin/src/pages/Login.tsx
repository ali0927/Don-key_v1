import { Button, Paper, TextField } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { Logo } from "./Logo";

const Login = () => {

  const history = useHistory();

  return (
    <div className="container">
      <div className="row mt-5 pt-5">
        <div className="col-md-6 offset-md-3 py-5">
          <Paper className="p-5">
            <div className="d-flex flex-column align-items-center ">
              <div className="w-50 mb-4">
                <Logo />
              </div>
              <TextField
                variant="outlined"
                name="email"
                className="w-100 mb-4"
                type="text"
                label="Email"
              />
              <TextField
                variant="outlined"
                name="password"
                className="w-100 mb-4"
                type="password"
                label="Password"
              />
              <Button onClick={() => history.push('/dashboard')} variant="outlined" color="primary">
                Sign In
              </Button>
            </div>
          </Paper>
        </div>
      </div>
    </div>
  );
};

export { Login };
