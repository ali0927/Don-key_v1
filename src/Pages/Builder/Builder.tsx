/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable no-empty-pattern */
import { useEffect, useState } from "react";
import clsx from "clsx";
import { NavBar } from "../../components/Navbar"
import { LoadingPage } from "Pages/LoadingPage";
import { useHistory } from "react-router-dom";
import { getQueryParam } from "helpers";
import { Builder as DonBuilder, ProtocolNode } from "don-builder";
import { Elements } from "react-flow-renderer";
import { pancakeConfig } from "don-pancakeswap";
import { donkeyConfig } from "don-donkey-token";
import {useAxios} from "hooks/useAxios";
import "./main.scss";
import { BuilderButton } from "components/BuilderButton";

const protocols = [donkeyConfig, pancakeConfig];

const Builder = () => {
  const history = useHistory();
  const [
    { data: createData, loading: createLoading,  },
    executeCreate
  ] = useAxios(
    {
      url: "/api/v1/strategies",
      method: 'POST'
    },
  )

  const [
    { data: getData, loading: getLoading,  },
    executeGet
  ] = useAxios(
    {
      url: "/api/v1/strategies?id=" + getQueryParam("id"),
      method: 'GET'
    },
  )

  const [
    {},
    executePut
  ] = useAxios(
    {
      url: "/api/v2/strategy/" + getQueryParam("id"),
      method: 'PUT'
    },
  )

  const onChange = (elements: Elements) => {
      if(elements?.length > 1) {
        executePut({data: { json: JSON.stringify(elements) },})
      }
    }

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

    const request = strategy ? executeGet() : executeCreate();
    Promise.all([request]).then(([strategy, protocol]) => {
      const json = strategy?.data?.data?.json;
      const strategyid = strategy?.data?.data ? strategy?.data?.data?.id : '';
      history.replace("/strategy/build?id=" + strategyid);
      setStrategy((old) => {
        return  json ? JSON.parse(json) : old;
      });
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const isGetData = getQueryParam("id") ? getData : createData;
  const strategyData = getQueryParam("id") ? getData?.data : createData?.data;
  const loading = getQueryParam("id") ? getLoading : createLoading;

  return (
    <>
      <div className={clsx(`page-wrapper`)}>
        <NavBar variant="builder" />
        { !loading && isGetData!== undefined && !isGetData?.data ?
           <div className="msg">This strategy was created by another farmer</div>  :
          isGetData?.data && !loading &&
          (typeof strategyData?.json === 'string' ?
            strategyData?.json?.length && JSON.parse(strategyData?.json)?.length === strategy?.length
            : strategyData?.json !== null ? strategyData?.json?.length === strategy?.length : true)
          ? <div>
              <DonBuilder
                protocols={protocols}
                strategy={strategy}
                onChange={onChange}
              />
              <BuilderButton style={{position: "absolute", top: 100, right: 20}}>Deploy Strategy</BuilderButton>
              <BuilderButton style={{position: "absolute", top: 180, right: 20}}>Add Cubes</BuilderButton>
              <BuilderButton style={{position: "absolute", top: 260, right: 20}}>Lock Strategy</BuilderButton>
           </div>
          : <LoadingPage />}
      </div>
    </>
  );
};

export default Builder;
