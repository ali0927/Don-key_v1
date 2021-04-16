import { IProtocolFromAPI } from "don-builder";
import pancakeToolbarImage from "./images/pancake.png";
import SwapTokenIcon from "./images/swaptokenicon.svg"
import { PancakeSwapToken } from "./Components/PancakeSwapToken";
import pancakeVertext from "./images/pancakevertex.svg"

export const pancakeConfig: IProtocolFromAPI = {
  description: "The #1 AMM and yield farm on Binance Smart Chain.↵",
  edgeColor: "#009AA6",
  name: "Pancake Swap",
  showOnToolbar: true,
  toolbarImageURL:pancakeToolbarImage,
  vertextImage: pancakeVertext,
  website: "https://pancakeswap.finance/",
  actions: {
    "Swap Token": {
      icon: SwapTokenIcon,
      Comp: PancakeSwapToken
    }
  },
};
