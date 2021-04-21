import { useWeb3, Web3Provider } from "don-components";
import { LoadingPage } from "Pages/LoadingPage";

export const withWeb3 = <T extends object>(
  Comp: React.ComponentType<T>,
  Loader = LoadingPage
) => {
  const WrappedWithWeb3 = (props: T) => {
    const web3 = useWeb3();
    if (!web3) {
      return (
        <Web3Provider loader={<Loader />}>
          <Comp {...props} />
        </Web3Provider>
      );
    } else {
      return <Comp {...props} />;
    }
  };
  return WrappedWithWeb3;
};
