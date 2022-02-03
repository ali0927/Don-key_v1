import React from "react";
import styled from "styled-components";
import { navigate } from "gatsby-link";
import { Skeleton } from "@material-ui/lab";
import { useTimer } from "hooks";

const EarningCardBox = styled.div`
  max-width: 320px;
  min-height: 380px;
  margin: 20px auto;
  display: flex;
  flex-direction: column;
  border-radius: 15px;
  box-shadow: 0px 0px 15px #00000040;
  background-color: white;
  overflow: hidden;
  position: relative;
  justify-content: space-between;
  padding-bottom: 20px;
`;
const EarningLogo = styled.img`
  width: 40px;
  height: 40px;
  margin-bottom: 4px;
`;
const EarningSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #f7f5f5;
  padding: 5px 30px;
  margin: 5px 10px;
`;
const EarningSectionTitle = styled(EarningSection)`
  padding: 20px;
  flex-direction: column;
  margin: 0 0 20px 0;
  font-size: large;
  font-weight: bold;
`;
const EarningSectionDeposit = styled(EarningSection)`
  border-radius: 10px 10px 0px 0px;
`;
const EarningSectionRoi = styled(EarningSection)`
  border-radius: 0px 0px 10px 10px;
`;
const EarningSectionExpire = styled.label`
  margin: 10px;
  font-weight: bold;
  text-align: center;
  display: flex;
  justify-content: center;
`;
const EarningSectionName = styled.label`
  font-size: small;
  color: gray;
  margin-bottom: 0;
`;
const EarningSectionValue = styled.label`
  font-size: normal;
  font-weight: bold;
  margin-bottom: 0;
`;
const EarningBtn = styled.button`
  margin: 10px 30px;
  padding: 10px;
  font-size: medium;
  font-weight: bold;
  background: #fff037;
  border: 1px solid #c7bb25;
  box-sizing: border-box;
  box-shadow: 0px 4px 5px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  cursor: pointer;
  &:disabled {
    cursor: default;
  }
  &:not(:disabled):hover {
    background-color: #f5f290;
    color: #000000;
    box-shadow: 0px 0px 20px rgb(0 0 0 / 15%);
  }
`;
const EarningComming = styled.div`
position: absolute;
background: #ff6534;
right: -110px;
top: 92px;
line-height: 27px;
transform: rotate(45deg) translateX(-50%);
color: white;
height: 28px;
width: 184px;
text-align: center;
font-size: small;
`;

export const EarningCard = ({
  logo,
  data,
  loading,
  id,
  comingSoon,
}: {
  logo: string;
  id: string;
  comingSoon: boolean;
  data: {
    name: string;
    earn: string;
    roi: string;
    expiryDate: number;
  };
  loading?: boolean;
}) => {
  const selectEarning = (id: string) => {
    navigate(`/earning/${id}`);
  };

  const isLoading = (trueResult: any, falseResult: any) => {
    return loading ? trueResult : falseResult;
  };

  const { duration, hasEnded } = useTimer(data.expiryDate);

  return (
    <EarningCardBox>
      <EarningSectionTitle>
        <EarningLogo src={logo} alt="" />
        <label style={{ marginBottom: "0" }}>
          {isLoading(<Skeleton width={70} />, `DON To ${data.name}`)}
        </label>
      </EarningSectionTitle>
      <div>
        <EarningSectionDeposit>
          <EarningSectionName>Deposit</EarningSectionName>
          <EarningSectionValue>
            {" "}
            {isLoading(<Skeleton width={30} />, "$DON")}{" "}
          </EarningSectionValue>
        </EarningSectionDeposit>
        <EarningSection>
          <EarningSectionName>Earn</EarningSectionName>
          <EarningSectionValue>
            {isLoading(<Skeleton width={30} />, `$${data.earn}`)}
          </EarningSectionValue>
        </EarningSection>
        <EarningSectionRoi>
          <EarningSectionName>Roi</EarningSectionName>
          {!hasEnded && (
          <EarningSectionValue>
            {isLoading(<Skeleton width={30} />, `${data.roi}%`)}
          </EarningSectionValue>
          )}
        </EarningSectionRoi>
        {!hasEnded && (
          <EarningSectionExpire>
            {!comingSoon && duration
              ? isLoading(<Skeleton width={100} />, `Expires in ${duration}`)
              : ""}
          </EarningSectionExpire>
        )}
      </div>
      <EarningBtn
        disabled={loading || comingSoon}
        onClick={() => selectEarning(id)}
      >
        Select
      </EarningBtn>
      {((!loading && comingSoon) || hasEnded) && (
        <EarningComming>
          <label>{hasEnded ? "Expired" : "Coming Soon "}</label>
        </EarningComming>
      )}
    </EarningCardBox>
  );
};
