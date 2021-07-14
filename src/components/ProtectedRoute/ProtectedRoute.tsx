import { AccountChangeListener } from "components/AccountChangeListener";
import { LastSignInSubscriber } from "components/LastSignInSubscriber";
import { Web3NetworkDetector } from "components/Web3NetworkDetector";
import { withAuth } from "components/withAuth";
import { ReferralStateProvider } from "contexts/ReferralContext";
import { Web3Provider } from "don-components";
import { LoadingPage } from "Pages/LoadingPage";
import { useMemo } from "react";
import { Route, RouteProps } from "react-router-dom";

export const ProtectedRoute = (props: RouteProps) => {
  const extras = useMemo(() => {
    const comp = withAuth(props.children);

    return {
      children: (
        <Web3Provider loader={<LoadingPage />}>
          <ReferralStateProvider>
            <AccountChangeListener />
            {/* <LastSignInSubscriber/> */}
            <Web3NetworkDetector />
            {comp}
          </ReferralStateProvider>
        </Web3Provider>
      ),
    };
  }, [props.children]);

  return <Route {...props} {...extras} />;
};
