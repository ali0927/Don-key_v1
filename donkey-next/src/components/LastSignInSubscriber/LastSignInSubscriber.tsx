/* eslint-disable no-empty-pattern */
import { useAxios } from "hooks/useAxios";
import { IStoreState } from "interfaces";
import * as React from "react";
import { useSelector } from "react-redux";

export const LastSignInSubscriber: React.FC = () => {
  const farmer = useSelector((state: IStoreState) => state.farmer);
  const [{}, executeTimeUpdate] = useAxios(
    { method: "PUT", url: "/api/v2/farmer/lastsignin" },
    { manual: true }
  );

  React.useEffect(() => {
    if (farmer) {
     const interval=   setInterval(async () => {
        await executeTimeUpdate();
      }, 60000);

      return(()=>{
          clearInterval(interval);
      });
    }
   // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [farmer]);

  return null;
};
