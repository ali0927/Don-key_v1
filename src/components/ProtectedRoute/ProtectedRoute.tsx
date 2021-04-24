import { AccountChangeListener } from "components/AccountChangeListener";
import { LastSignInSubscriber } from "components/LastSignInSubscriber";
import { withAuth } from "components/withAuth";
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
          <AccountChangeListener />
          <LastSignInSubscriber/>
          {comp}
        </Web3Provider>
      ),
    };
  }, [props.children]);

  return <Route {...props} {...extras} />;
};
