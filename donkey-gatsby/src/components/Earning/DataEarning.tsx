import atl from "./images/atl.svg";

const DataEarning = [
  {
    id: "atl",
    comingSoon: false,
    logo: atl,
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
];

export default DataEarning;
