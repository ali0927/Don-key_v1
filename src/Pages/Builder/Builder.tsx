/* eslint-disable jsx-a11y/alt-text */
import { useEffect, useState } from "react";
import clsx from "clsx";
import { NavBar } from "../../components/Navbar/NavBar";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { apiRequest } from "actions/apiActions";
import { AxiosResponse } from "axios";
import { getQueryParam } from "helpers";
import { Builder as DonBuilder, ProtocolNode } from "don-builder";
import { Elements } from "react-flow-renderer";
import { pancakeConfig } from "don-pancakeswap";
import { donkeyConfig } from "don-donkey-token";
import "./main.scss";
import { BuilderButton } from "components/BuilderButton";

const protocols = [donkeyConfig, pancakeConfig];

const Builder = () => {
  const history = useHistory();

  const dispatch = useDispatch();

  const getStrategy = () => {
    return new Promise<AxiosResponse>((res, rej) => {
      const strategy = getQueryParam("id");
      dispatch(
        apiRequest({
          method: "GET",
          endpoint: "/api/v1/strategies?id=" + strategy,
          onDone: res,
          onFail: rej,
        })
      );
    });
  };

  const createStrategy = () => {
    return new Promise<AxiosResponse>((res, rej) => {
      dispatch(
        apiRequest({
          method: "POST",
          endpoint: "/api/v1/strategies",
          onDone: res,
          onFail: rej,
        })
      );
    });
  };

  const [strategy, setStrategy] = useState<Elements>([
    {
      id: "1",
      type: ProtocolNode.name,
      position: { x: 300, y: 160 },
      data: { imageUrl: donkeyConfig.vertextImage, name: donkeyConfig.name },
    },
  ]);

  useEffect(() => {
    const strategy = getQueryParam("id");
    const request = strategy ? getStrategy() : createStrategy();
    Promise.all([request]).then(([strategy, protocol]) => {
      const json = strategy.data.data.json;
      const strategyid = strategy.data.data.id;
      history.replace("/strategy/build?id=" + strategyid);
      setStrategy((old) => {
        const data = json ? JSON.parse(json) : old;
        return { ...data, id: strategyid };
      });
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className={clsx(`page-wrapper`)}>
        <NavBar variant="builder" />
        <DonBuilder protocols={protocols} strategy={strategy} />
        <BuilderButton style={{position: "absolute", top: 100, right: 20}}>Deploy Strategy</BuilderButton>
        <BuilderButton style={{position: "absolute", top: 180, right: 20}}>Add Cubes</BuilderButton>
        <BuilderButton style={{position: "absolute", top: 260, right: 20}}>Lock Strategy</BuilderButton>
      </div>
    </>
  );
};

export default Builder;
