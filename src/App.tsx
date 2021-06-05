import Routes from "./routes/Routes";
import "./scss/styles.scss";
import LogRocket from 'logrocket';
import { useEffect } from "react";

function App() {
  useEffect(() => {
    if(process.env.NODE_ENV === "production"){
      LogRocket.init('uisfg9/donkey');
    }
  }, [])
  return <Routes />;
}

export default App;
