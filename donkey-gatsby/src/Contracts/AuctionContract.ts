import BigNumber from "bignumber.js";
import { getWeb3 } from "don-components";
import { getERCContract } from "helpers";
import { cloneDeep, memoize } from "lodash";
import Web3 from "web3";

// Purpose of the contract to have only functions or methods
// All State variables will be stored in redux store instead of this object
class AuctionContract {
  viewContract: any;
  contract: any;
  address: string;
  chainId: number;
  initialized: boolean;
  connectedToWallet: boolean;
  constructor(address: string, chainId: number) {
    this.address = address;
    this.chainId = chainId;
    this.initialized = false;
    this.connectedToWallet = false;
    this.contract = null;
    this.viewContract = null;
  }

  debtMap: {
    [x: number]: string;
  } = {};

  async fetchDebtRatios(array: number[]) {
    const promises = array.map(async (num) => {
      this.debtMap[num] = new BigNumber(
        await this.viewContract.methods.maxLoanAllocation(num).call()
      )
        .dividedBy(100)
        .toFixed(0);
    });
    await Promise.all(promises);
    return this.debtMap;
  }

  estimatedRepaymentAmount = async ({
    userAddress,
  }: {
    userAddress: string;
  }) => {
    return await this.viewContract.methods
      .estimatedRepaymentAmount(userAddress)
      .call();
  };

  async forceRecovery({
    userAddress,
  }: {
    userAddress: string;
  }): Promise<boolean> {
    return await this.viewContract.methods.forceRecovery(userAddress).call();
  }

  async initialize() {
    const contractAbi = await import("JsonData/AuctionContract.json");
    const viewOnlyWeb3 = getWeb3(this.chainId);
    this.viewContract = new viewOnlyWeb3.eth.Contract(
      contractAbi.default as any,
      this.address
    );
    // this.contract =
    await this.fetchDebtRatios([0, 1, 2, 3, 4, 5]);
    this.initialized = true;
  }

  async connectToWallet(web3: Web3) {
    this.connectedToWallet = true;
    const contractAbi = await import("JsonData/AuctionContract.json");

    this.contract = new web3.eth.Contract(
      cloneDeep(contractAbi.default) as any,
      this.address
    );
  }
  async disconnectFromWallet() {
    this.contract = null;
    this.connectedToWallet = false;
  }
  releaseExcessLended = async ({userAddress}: {userAddress:string}) => {
    await this.contract.methods.releaseExcessLended().send({from: userAddress});
  }
  getauctionEndTime = async () => {
    return (await this.viewContract.methods.auctionEndTime().call()) as number;
  };
  getauctionStartTime = async () => {
    return (await this.viewContract.methods
      .auctionStartTime()
      .call()) as number;
  };

  isWhiteListed = async (poolAddress: string) => {
    const lpTokenAddress = await this.viewContract.methods
      .lpToken(poolAddress)
      .call();

    return (lpTokenAddress !==
      "0x0000000000000000000000000000000000000000") as boolean;
  };

  getFloorCommission = async (poolAddress: string) => {
    return new BigNumber(
      await this.viewContract.methods.floorCommission(poolAddress).call()
    )
      .dividedBy(100)
      .toNumber() as number;
  };

  getLoanTenure = async () => {
    return (await this.viewContract.methods.loanTenure().call()) as number;
  };

  bid = async ({
    lendedAmount,
    lpToken,
    comission,
    userAddress,
  }: {
    lpToken: string;
    lendedAmount: string;
    comission: string;
    userAddress: string;
  }) => {
    // approve lp for spend
    // call participate on contract
    await this.contract.methods
      .bid(lpToken, lendedAmount, comission)
      .send({ from: userAddress });
  };

  revokeBid = async ({ userAddress }: { userAddress: string }) => {
    // call revoke
    await this.contract.methods.revokeBid().send({ from: userAddress });
  };
  borrow = async ({ userAddress }: { userAddress: string }) => {
    await this.contract.methods.borrow().send({ from: userAddress });
  };

  getLoanTokenAddress = async () => {
    // console.log(this.address);
    return (await this.viewContract.methods.loanToken().call()) as string;
  };
  getOverduePenalty = async () => {
    return (await this.viewContract.methods.overduePenalty().call()) as string;
  }

  getLoanToken = async (web3: Web3) => {
    return await getERCContract(web3, await this.getLoanTokenAddress());
  };

  repayLoan = async ({
    userAddress,
    web3,
  }: {
    web3: Web3;

    userAddress: string;
  }) => {
    // call repay loan on contract
    // approve amount on underlying token to return
    const loanToken = await this.getLoanToken(web3);
    const weiAmount = await this.estimatedRepaymentAmount({
      userAddress,
    });
    const allowance = await loanToken.methods
      .allowance(userAddress, this.address)
      .call();
    if (new BigNumber(allowance).lt(weiAmount)) {
      await loanToken.methods
        .approve(this.address, weiAmount)
        .send({ from: userAddress });
    }
    await this.contract.methods.repay(weiAmount).send({ from: userAddress });
  };

  recoverLoan = async ({ userAddress }: { userAddress: string }) => {
    await this.contract.methods.recoverLoan().send({ from: userAddress });
  };

  isWinnerAnounced = async () => {
    return (await this.viewContract.methods
      .isWinnerAnnounced()
      .call()) as boolean;
  };

  isWinner = async ({ userAddress }: { userAddress: string }) => {
    return (await this.viewContract.methods
      .isWinner(userAddress)
      .call()) as boolean;
  };

  getUserInfo = async ({ userAddress }: { userAddress: string }) => {
    // fetch userInfo from contract;

    try {
      const userInfo = await this.viewContract.methods
        .userInfo(userAddress)
        .call();
      return {
        lptoken: userInfo.lpToken,
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
        loanSettled: userInfo.loanSettled,
      };
    } catch (e) {
      throw Error("Error in Get UserInfo");
    }
  };

  getMaxDebtMap = () => {
    return this.debtMap;
  };

  getParticpantList = async () => {
    return (await this.viewContract.methods
      .getParticipateList()
      .call()) as string[];
  };

  getWinnerList = async () => {
    return (await this.viewContract.methods.getWinnerList().call()) as string[];
  };

  getParticipantCount = async () => {
    return 2;
  };
}

export const getAuctionContract = memoize(
  (address: string, chainId: number) => {
    return new AuctionContract(address, chainId);
  }
);
