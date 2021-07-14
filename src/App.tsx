import Routes from "./routes/Routes";
import "./scss/styles.scss";
import LogRocket from "logrocket";
import { useEffect } from "react";
import { setReferralCode } from "helpers";

function App() {
  useEffect(() => {
    if (process.env.REACT_APP_ENV === "production") {
      LogRocket.init("uisfg9/donkey");
      console.error = () => {};
    }
    const url = new URL(window.location.href);
    const referrralCode = url.searchParams.get('referral');
    if(referrralCode){
      setReferralCode(referrralCode);
    }
    
  }, []);
  return <Routes />;
}

export default App;
