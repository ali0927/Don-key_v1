import atl from "./images/atl.svg";
import nacf from "./images/nachologo.svg";

const DataEarning = [
  {
    id: "atl",
    comingSoon: false,
    logo: atl,
    harvestDisabled: false,
    priceFeed: "0x6926aeb5703e9533B5Dd9AC58A9101622588aDe6",
    priceFeedChain: 56,
    contractAddress: "0x4c02270Ea94EbdE2Ed254F1E3613fA3C6B1eA9eF",
    tokenAddress: "0x1fd991fb6c3102873ba68a4e6e6a87b3a5c10271",
    tokenInfo: (
      <>
        <p>
          {" "}
          Atlantis Loans is a decentralized non-custodial money market protocol
          where users can participate by borrowing or lending money through the
          protocol directly from BSC.‌ The Atlantis Loans protocol is autonomous
          and algorithmic with its parameters being controlled by governance
          proposals and yield curves.
        </p>
        <p>
          Current TVL is around $130mil The total supply of our governance token
          is 6,500,000 ATL The current supply is 240,000 ATL
        </p>

        <p>
          {" "}
          Around 900 users are supplying and 400 users are borrowing assets from
          the platform.
        </p>

        <p>
          Token:{" "}
          <a href="https://www.coingecko.com/en/coins/atlantis-loans">
            https://www.coingecko.com/en/coins/atlantis-loans
          </a>
        </p>
      </>
    ),
  },
  {
    id: "nacho",
    comingSoon: false,
    logo: nacf,
    harvestDisabled: true,
    contractAddress: "0x5343bEfd065295C624250943a0B115024ed15e70",
    priceFeed: "0xE6AdC9ceB38258c528e93400f378d7618f5aE14A",
    priceFeedChain: 137,
    tokenAddress: "0x948D0a28b600BDBd77AF4ea30E6F338167034181",
    price: "94",
    tokenChain: 137,
    tokenPrice: "94",
    tokenInfo: (
      <>
        <p>
          Nacho Finance was inspired by tomb.finance and is a seigniorage style
          algorithmic stablecoin protocol designed to bring high APRs with low
          fees to Ethereum holders on the Polygon Network.
        </p>
        <p>
          Nacho is on a mission to unlock the power of compound interest to
          sustainably build wealth everywhere. This is just the beginning of an
          ambitious ecosystem on the Nacho roadmap.
        </p>
        <p>
          Nacho Finance is a multi-token protocol that consists of the following
          three tokens: - Nacho Token (NACHO) (Medium of exchange) - Nacho
          Shares (NSHARE) (Governance &amp; Measure of protocol value) - Nacho
          Bonds (NBOND) (Change NACHO supply during contraction periods)
        </p>
        <p>
          $NSHARE tokens, which will be distributed to Don-key Mule Pool
          stakers, can be swapped for $NACHO tokens and wETH to stake on Nacho
          Finance to earn even more $NSHARE.
        </p>
      </>
    ),
  },
];

export default DataEarning;
