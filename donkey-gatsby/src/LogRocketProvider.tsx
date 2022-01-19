import { useWeb3Context } from "don-components";
import { useIsomorphicEffect } from "hooks";
import LogRocket from "logrocket";

export const LogRocketProvider: React.FC = ({ children }) => {
  const { connected, address, chainId } = useWeb3Context();

  useIsomorphicEffect(() => {
    LogRocket.init("uisfg9/donkey", {
      network: {
        requestSanitizer: (request) => {
          // if the url contains 'ignore'
          if (request.url.includes("node-api")) {
            // ignore the request response pair
            return null;
          }

          // otherwise log the request normally
          return request;
        },
      },
    });
  }, []);

  useIsomorphicEffect(() => {
    if (connected && address) {
      LogRocket.identify(address);
    }
  }, [connected]);

  useIsomorphicEffect(() => {
    if (address) {
      LogRocket.track("Address Changed", {
        address: address,
      });
    }
  }, [address]);
  useIsomorphicEffect(() => {
    if (chainId) {
      LogRocket.track("Network Changed", {
        address: chainId,
      });
    }
  }, [chainId]);

  return <>{children}</>;
};
