import { useWeb3 } from "don-components";
import { getStrategyContract } from "helpers";
import {  useLayoutEffect, useState } from "react";
import { Spinner } from "react-bootstrap";

export const StrategyName = ({
  strategyAddress,
}: {
  strategyAddress: string | null;
}) => {
  const [isReady, setIsReady] = useState(false);
  const [name, setName] = useState("");

  const web3 = useWeb3();

  const fetchName = async () => {
    if(!strategyAddress){
      return;
    }
    const strategyContract = await getStrategyContract(web3, strategyAddress);

    try {
      const name = await strategyContract.methods.getName().call();
      setName(name);
    } catch (e) {
      setName("-");
    } finally {
      setIsReady(true);
    }
  };
  useLayoutEffect(() => {
    fetchName();
     // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if(!strategyAddress){
    return <>Strategy Not Ready</>
  }

  if (isReady) {
    return <>{name}</>;
  } else {
    return <Spinner animation="border" size="sm" />;
  }
};
