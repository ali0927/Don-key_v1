import { apiRequest } from "actions/apiActions";
import { doLogin } from "actions/authActions";
import { setFarmerDetail } from "actions/farmerActions";
import { AcceleratedAPYModal } from "components/AcceleratedAPYModal/AcceleratedAPYModal";
import { DonStakingModal } from "components/DonStakingModal/DonStakingModal";
import { useStakingContract } from "hooks";
import { useMetaMaskLogin } from "hooks/useMetaMaskLogin";
import { IStoreState } from "interfaces";
import { LoadingPage } from "Pages/LoadingPage";
import { useEffect } from "react";
import { createPortal } from "react-dom";
import { useDispatch, useSelector } from "react-redux";
import { RouteProps } from "react-router-dom";

export const withAuth = (element?: RouteProps["children"]) => {
  if (!element) {
    return element;
  }
  const NewComp = () => {
    const isLoggedIn = useSelector(
      (state: IStoreState) => state.auth.isLoggedIn
    );
    
    const { holdingDons } = useStakingContract();

    const dispatch = useDispatch();

    const { doMetaMaskLogin } = useMetaMaskLogin();

    useEffect(() => {
      dispatch(
        apiRequest({
          method: "GET",
          endpoint: "/api/v2/farmer/me",
          onDone: (res) => {
            dispatch(doLogin(res.data.user));
            dispatch(setFarmerDetail(res.data.data));
          },
          onFail: async (res) => {
            if (res.status === 401) {
              await doMetaMaskLogin();
              dispatch(
                apiRequest({
                  method: "GET",
                  endpoint: "/api/v2/farmer/me",
                  onDone: (res) => {
                    dispatch(setFarmerDetail(res.data.data));
                  },
                })
              );
            } else {
            }
          },
        })
      );
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const showModal = holdingDons !== null && holdingDons.lt(100);
    const showLoader = holdingDons === null || holdingDons.lt(100) || !isLoggedIn;
    return (
      <>
        {showModal && <DonStakingModal onClose={() => {}} open />}
        {(showLoader) ? createPortal(<LoadingPage />, document.body) : element}
      </>
    );
  };
  return <NewComp />;
};
