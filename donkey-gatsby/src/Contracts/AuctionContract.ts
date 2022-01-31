import { getWeb3 } from "don-components";
import Web3 from "web3";

// Purpose of the contract to have only functions or methods
// All State variables will be stored in redux store instead of this object
export class AuctionContract {
    
  viewContract: any;
  contract: any;
  address: string
  constructor(address: string) {
    this.address = address;
  }
  debtMap: {
    [x: number]: number
  } = {}

  async initializeTiers (array: number[]){
    const promises = array.map(async num => {
      this.debtMap[num] = await this.viewContract.methods.maxLoanAllocation(num).call();
       
    })
    await Promise.all(promises);
   
  }

  async initialize({
    connectedWeb3,
    chainId,
  }: {
    connectedWeb3: Web3;
    auctionAddress: string;
    chainId: number;
  }) {
    const contractAbi = await import("JsonData/AuctionContract.json");
    const viewOnlyWeb3 = getWeb3(chainId);
    this.viewContract = new viewOnlyWeb3.eth.Contract(
      contractAbi as any,
      this.address
    );
    this.contract = new connectedWeb3.eth.Contract(
      contractAbi as any,
      this.address
    );
    await this.initializeTiers([0,1,2,3,4,5]);
  }

  getauctionEndTime = async () => {
    return await this.viewContract.methods.auctionEndTime().call() as number
  };
  getauctionStartTime = async () => {
    return await this.viewContract.methods.auctionStartTime().call() as number
  };

  bid = async ({lendedAmount, lpToken, comission, userAddress}: {
    lpToken: string;
    lendedAmount: string;
    comission: string;
    userAddress: string;
  }) => {
    // approve lp for spend
    // call participate on contract
    await this.contract.methods.bid(lpToken, lendedAmount, comission).send({from: userAddress });
   
  };

  revokeBid = async ({userAddress}: {userAddress: string}) => {
    // call revoke
    await this.contract.methods.revokeBid().send({from: userAddress });

  };
  repayLoan = async ({}: { tokenAddress: string; amount: string }) => {
    // call repay loan on contract
    // approve amount on underlying token to return
    alert("Called Repay Loan");
  };

  recoverLoan = async ({userAddress}: {userAddress: string}) => {

    await this.contract.methods.recoverLoan().send({from: userAddress });
   
  };

  getUserInfo = async ({ userAddress }: { userAddress: string }) => {
    // fetch userInfo from contract;
    //

    const userInfo = await this.viewContract.methods.userInfo(userAddress).call();
    return {
      lptoken: userInfo.lpToken,
      lpamount: userInfo.lpAmount,
      lendedAmount: userInfo.lendedAmount,
      borrowedAmount: userInfo.borrowedAmount,
      estimatedBorrowedAmount: userInfo.estimatedBorrowAmount,
      borrowedAmountInUSD: userInfo.borrowedAmountInUSD,
      borrowedTime: userInfo.borrowedTime,
      settlementTime: userInfo.settlementTime,
      commissionAmount: userInfo.commissionAmount,
      commissionInPer: userInfo.commissionInPer,
      participationTime: userInfo.participationTime,
      loanSettlementTime: userInfo.loanSettlementTime,
      tier: userInfo.tier,
      loanSettled: userInfo.loanSettled
    };
  };

  getMaxDebtRatio = async ({tier}: {tier: number})  => {
    
    return this.debtMap[tier];
  }


  getParticpantList = async () => {
    return await this.viewContract.methods.getParticipateList().call() as string[];
  };

  getWinnerList = async () => {
    return await this.viewContract.methods.getWinnerList().call() as string[];
  }

  getParticipantCount = async () => {
    return 2;
  };
}
