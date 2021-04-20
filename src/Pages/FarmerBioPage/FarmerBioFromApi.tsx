import { useAxios } from "hooks/useAxios";
import {Spinner} from "react-bootstrap";
import { FarmerBio } from "./FarmerBio";

export const FarmerBioFromApi = ({farmerId}: {farmerId: string}) => {
  const [
    { loading, data: farmerFromApi },
    
  ] = useAxios(`/api/v2/farmer/${farmerId}`);


  if(loading){
    return <div className="d-flex align-items-center justify-content-center" style={{minHeight: 400}}>
      <Spinner animation="border" color="dark" />
    </div>
  }

  const bio = farmerFromApi.data;

  return <FarmerBio isInvestor farmer={bio} />

}
