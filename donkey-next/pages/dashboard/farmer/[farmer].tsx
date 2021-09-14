import { NavBar } from "components/Navbar";
import { Footer } from "components/Footer";
import { USDViewProvider } from "contexts/USDViewContext";
import { RefreshProvider } from "components/LotteryForm/useRefresh";
import { useCallback, useState } from "react";
// import { GetStaticPaths, GetStaticProps } from "next";

export default function Dashboard() {

  const [isInUsd, setIsInUsd] = useState(false);

  const toggleCurrency = useCallback(() => {
    setIsInUsd((val) => !val);
  }, []);

  return (
    <USDViewProvider
    value={{
      isUSD: isInUsd,
      toggle: toggleCurrency,
    }}
  >
    <RefreshProvider>
      <div style={{ background: "#F4F4F4" }}>
        <NavBar variant="loggedin" />
        {/* <FarmerBioFromApi farmerId={farmerId} /> */}
        <Footer />
      </div>
    </RefreshProvider>
  </USDViewProvider>
  );
}

// const FARMER_QUERY = `
//   query farmerInfo($id: String) {
//     farmers(where: { guid_eq: $id, active_eq: true, status_in: ["active"] }) {
//       name
//       description
//       farmerImage {
//         url
//       }
//       active
//       twitter
//       telegram
//       guid
//       farmerfee
//       performancefee
//       poolAddress
//       poolVersion
//       network {
//         name
//         chainId
//         symbol
//       }
//       strategies {
//         name
//         apy
//         created_at
//         id
//         entranceFees
//         info
//         exitFees
//         swapInFees
//         swapOutFees
//         description
//         strategyImage {
//           url
//         }
//         token {
//           boostApy
//         }
//       }
//     }
//   }
// `;


// export const getStaticPaths: GetStaticPaths = async (context) => {
//   // const 
//   return {
//     paths: [{params: {}}],
//     fallback: "blocking"
//   }
// }

// export const getStaticProps: GetStaticProps = async (context) => {
//   return {
//     props: {}
//   }
// }