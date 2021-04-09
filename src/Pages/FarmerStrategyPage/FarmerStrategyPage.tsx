import { apiRequest } from "actions/apiActions";
import { InvestmentPage } from "Pages/InvestmentPage/InvestmentPage";
import { LoadingPage } from "Pages/LoadingPage";
import { Web3Provider } from "providers/Web3Provider";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";


export const FarmerStrategyPage = () => {
  const [farmerInfo, setFarmerInfo] = useState();
  const [isReady, setIsReady] = useState(false);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      apiRequest({
        method: "GET",
        endpoint: "/api/v1/farmer",
        onDone: (res) => {
          const data = res.data.data;
          if (data) {
            setFarmerInfo(data);
          }
          setIsReady(true);
        },
        onFail: () => {
          setIsReady(true)
        }
      })
    );
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderPage = () => {
    if (!isReady) {
      return <LoadingPage />;
    }
 
    if (farmerInfo) {
      return <InvestmentPage />;
    }
  
  };

  return <Web3Provider>{renderPage()}</Web3Provider>;
};
