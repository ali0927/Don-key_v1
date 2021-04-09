import { Layout } from "components/Layout";
import React, { useEffect } from "react";
import { useHistory } from "react-router";


export const FarmerBioPage = () => {

  const history = useHistory();

  useEffect(() => {

    history.push("/dashboard/farmer/signup")
  }, [])

  return <Layout variant="loggedin">

  </Layout>
}