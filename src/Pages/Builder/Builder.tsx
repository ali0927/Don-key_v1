/* eslint-disable jsx-a11y/alt-text */
import { useEffect, useState } from "react";
import clsx from "clsx";
import { NavBar3 } from "../../components/Navbar/NavBar";
import "./main.scss";
import {  uuidv4 } from "don-utils";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { apiRequest } from "actions/apiActions";
import { AxiosResponse } from "axios";
import { IProtocolFromAPI, withYFITokens} from "don-builder";
import { getQueryParam } from "helpers";
import { Builder as DonBuilder} from "don-builder";

const Builder = () => {
  const [panel, setPanel] = useState(null);

  const [protocols, setProtocols] = useState<IProtocolFromAPI[]>([]);
  const closePanel = () => setPanel(null);

  const history = useHistory();


  const [strategy, setStrategy] = useState({
    protocolCells: [
      {
        protocolId: uuidv4(),
        protocol: "BY",
        lastProtocol: null,
        x: 200,
        y: 150,
        w: 110,
        h: 110,
        vertex: null,
      },
    ],
    actionCells: [],
  });

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
  const getProtocols = () => {
    return new Promise<AxiosResponse>((res, rej) => {
      dispatch(
        apiRequest({
          method: "GET",
          endpoint: "/api/v1/protocols",
          onDone: res,
          onFail: rej,
        })
      );
    });
  };

  useEffect(() => {
    const strategy = getQueryParam("id");
    const request = strategy ? getStrategy() : createStrategy();
    Promise.all([request, getProtocols()]).then(([strategy, protocol]) => {
      const json = strategy.data.data.json;
      const strategyid = strategy.data.data.id;
      history.replace("/strategy/build?id=" + strategyid);
      setStrategy((old) => {
        const data = json ? JSON.parse(json) : old;
        return { ...data, id: strategyid };
      });
      setProtocols(protocol.data.data);
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);







  const deployStrategy = (addresses: string[],data: any[]) => {
    for (var i=0; i < addresses.length;i++){
      
    }
  }

  const enableStrategy = () => {

  }

  return (
    <>
  
      <div className={clsx(`page-wrapper`)}>
        <NavBar3 />
        <DonBuilder protocols={protocols} strategy={strategy}  />
      </div>
    </>
  );
};

export default withYFITokens(Builder);
