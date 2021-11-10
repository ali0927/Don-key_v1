import { hideAddress } from "components/InvestorListTable/InvestorListTable";
import {
  Table,
  TableData,
  TableHead,
  TableHeading,
  TableResponsive,
  TableRow,
  TableBody,
} from "components/Table";
import { Text } from "components/Text";
import { navigate } from "gatsby-link";
import { formatNum, toEther } from "helpers";
import React, { memo } from "react";
import { OverlayTrigger, Spinner, Tooltip } from "react-bootstrap";
import { AiOutlineInfoCircle } from "react-icons/ai";
import styled from "styled-components";

const CustomTableHeading = styled(TableHeading)`
  text-align: center;
`;
const CustomTableData = styled(TableData)`
  text-align: center;
  cursor: ${(props: { cursor?: string }) =>
    props.cursor ? props.cursor : "auto"};
`;
const EmptyTableHeading = styled(TableHeading)`
  min-width: 75px;
`;
export const RedirectToFarmerProfile = (poolAddress: string) => () => {
  navigate("/dashboard/farmer/" + poolAddress);
};

export type IUserRewards = {
  from: string;
  pool: string;
  profitValue: string;
  rewardAmountInDon: string;
  rewardAmountInUSD: string;
  timeStamp: string;
  tier: string;
  tierPer: string;
};
export type IPastReferrals = IUserRewards & {
  farmerImage: string;
  farmerName: string;

  slug: string;
};
const AnimationDiv = styled.div({
  minHeight: 500,
});
const StyledImage = styled.img`
  width: 45px;
  height: 45px;
`;
export const PastReferrals = memo(
  ({
    loading,
    pastReferrals,
  }: {
    loading: boolean;
    pastReferrals: IPastReferrals[];
  }) => {
    if (loading) {
      return (
        <AnimationDiv className="d-flex align-items-center justify-content-center">
          <Spinner animation="border" />
        </AnimationDiv>
      );
    }
    if (pastReferrals?.length === 0) {
      return null;
    }
    return (
      <>
        <Text
          tag="h4"
          fontWeight={800}
          fontSize={36}
          className="my-4"
          fontFamily="Work Sans"
        >
          Past Rewards
        </Text>
        <TableResponsive>
          <Table>
            <TableHead>
              <TableRow isHoverOnRow={false}>
                <CustomTableHeading className="py-4">#</CustomTableHeading>
                <EmptyTableHeading></EmptyTableHeading>
                <CustomTableHeading>FARMER NAME</CustomTableHeading>
                <CustomTableHeading>Referral Address</CustomTableHeading>
                <CustomTableHeading>User Profit</CustomTableHeading>
                <CustomTableHeading className="position-relative">
                  Tier
                  <span style={{ position: "absolute", right: -4 }}>
                    {" "}
                    <OverlayTrigger
                      placement="right"
                      delay={{ show: 250, hide: 400 }}
                      overlay={(props) => (
                        <Tooltip id="button-tooltip" {...props}>
                          Your tier level when the user materialized the profit
                        </Tooltip>
                      )}
                    >
                      <AiOutlineInfoCircle className="ml-1" />
                    </OverlayTrigger>
                  </span>
                </CustomTableHeading>
                <CustomTableHeading>Reward in DON</CustomTableHeading>
                <CustomTableHeading>Reward in USD</CustomTableHeading>
              </TableRow>
            </TableHead>
            <TableBody>
              {pastReferrals.map((investment, index) => {
                return (
                  <TableRow key={investment.timeStamp}>
                    <CustomTableData>{index + 1}</CustomTableData>
                    <CustomTableData>
                      <StyledImage src={investment.farmerImage} />
                    </CustomTableData>
                    <CustomTableData
                      cursor="pointer"
                      onClick={RedirectToFarmerProfile(investment.slug)}
                      className="font-weight-bold"
                    >
                      {investment.farmerName}
                    </CustomTableData>
                    <CustomTableData>
                      {hideAddress(investment.from, {
                        mask: "xxxxx",
                        size: 10,
                      })}
                    </CustomTableData>
                    <CustomTableData>
                      ${formatNum(toEther(investment.profitValue))}
                    </CustomTableData>
                    <CustomTableData>{investment.tier}</CustomTableData>
                    <CustomTableData className="bold">
                      {formatNum(toEther(investment.rewardAmountInDon))} DON
                    </CustomTableData>
                    <CustomTableData>
                      ${formatNum(toEther(investment.rewardAmountInUSD))}
                    </CustomTableData>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableResponsive>
      </>
    );
  }
);
