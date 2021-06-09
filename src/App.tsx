import Routes from "./routes/Routes";
import "./scss/styles.scss";
import LogRocket from "logrocket";
import { useEffect } from "react";

function App() {
  useEffect(() => {
    if (process.env.REACT_APP_ENV === "production") {
      LogRocket.init("uisfg9/donkey");
      console.error = () => {};
    }
  }, []);
  return <Routes />;
}

export default App;
