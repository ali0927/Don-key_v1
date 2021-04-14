import { Web3Provider } from "don-components";
import { LoadingPage } from "Pages/LoadingPage";

export const withWeb3 = <T extends object>(Comp: React.ComponentType<T>) => {
  const WrappedWithWeb3 = (props: T) => {
    return (
      <Web3Provider loader={<LoadingPage />}>
        <Comp {...props} />
      </Web3Provider>
    );
  };
  return WrappedWithWeb3;
};
