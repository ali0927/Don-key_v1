import { getWeb3 } from "don-components";
import moment from "moment";
import Web3 from "web3";

// Purpose of the contract to have only functions or methods
// All State variables will be stored in redux store instead of this object
export class AuctionContract {
    
  viewContract: any;
  contract: any;

  async initialize({
    connectedWeb3,
    auctionAddress,
    chainId,
  }: {
    connectedWeb3: Web3;
    auctionAddress: string;
    chainId: number;
  }) {
    const contractAbi = await import("JsonData/BEP20Token.json");
    const viewOnlyWeb3 = getWeb3(chainId);
    this.viewContract = new viewOnlyWeb3.eth.Contract(
      contractAbi.abi as any,
      auctionAddress
    );
    this.contract = new connectedWeb3.eth.Contract(
      contractAbi.abi as any,
      auctionAddress
    );
  }

  getauctionEndTime = async () => {
    return moment().add("2", "d").toDate();
  };
  getauctionStartTime = async () => {
    return moment().toDate();
  };

  participate = async ({}: {
    lpToken: string;
    lendedAmount: string;
    comission: string;
  }) => {
    // approve lp for spend
    // call participate on contract
    alert("Called Participate");
  };

  revokeParticipation = async () => {
    // call revoke
    alert("Called Revoke Participation");
  };
  repayLoan = async ({}: { tokenAddress: string; amount: string }) => {
    // call repay loan on contract
    // approve amount on underlying token to return
    alert("Called Repay Loan");
  };

  recoverLoan = async ({}: {}) => {
    alert("Recover Loan");
  };

  getUserInfo = async ({ userAddress }: { userAddress: string }) => {
    // fetch userInfo from contract;
    //
    return {
      lptoken: "sss",
      lpamount: "000",
      lendedAmount: "10",
      borrowedAmount: "1",
      borrowedAmountInUSD: "100",
      settlementTime: "1000000",
      propossedFeeAmount: "4",
    };
  };

  getMaxDebtRatio = async ({tier}: {tier: 0 | 1})  => {
    return {0: "50", 1: "70"}[tier];
  }


  getParticpantList = async () => {
    return ["", ""];
  };

  getParticipantCount = async () => {
    return 2;
  };
}
