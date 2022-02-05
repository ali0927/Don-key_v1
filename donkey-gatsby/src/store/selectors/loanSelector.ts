import { isOneOf } from "helpers";
import {  IStoreState } from "interfaces";
import memoizeOne from "memoize-one";

export const createLoanSelector = () => {
  return memoizeOne(
    (loans: IStoreState["auctions"]["loans"], lpAddress: string) => {
      if (
        isOneOf(loans.status, ["FETCH_SUCCESS"])
      ) {
        const loanList = loans.data;
        return loanList.find((item) => item.lpAddress === lpAddress);
      }
      return null;
    }
  );
};

export const loanSelector = createLoanSelector();
