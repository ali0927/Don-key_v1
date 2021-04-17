import { useWeb3React } from "@web3-react/core";
import Routes from "./routes/Routes";
import "./scss/styles.scss";

function App() {
  const {error} = useWeb3React();
  console.log(error);
  return <Routes />;
}

export default App;
