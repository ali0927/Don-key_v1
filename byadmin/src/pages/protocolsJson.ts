export const protocolList = [
    {
        "id": 1,
        "name": "YFI",
        "website": "https://yearn.finance/",
        "toolbarImageURL": "https://byfinance.s3.us-east-2.amazonaws.com/toolbar_yfi.png",
        "showOnToolbar": "1",
        "edgeColor": "#1C44CF",
        "description": "yearn.finance (or YFI coin) is a governance token a group of protocols on Ethereum which allow users to optimize their earnings on DeFi products such as lending and trading.",
        "vertexImageURL": "https://byfinance.s3.us-east-2.amazonaws.com/P_YFI.png",
        "mediumImageURL": null,
        "actions": [
            {
                "id": 5,
                "protocolId": 1,
                "name": "Deposit",
                "description": "Deposit",
                "icon": "https://byfinance.s3.us-east-2.amazonaws.com/deposit-icon.svg"
            },
            {
                "id": 6,
                "protocolId": 1,
                "name": "Withdrawal",
                "description": "Withdrawal",
                "icon": "https://byfinance.s3.us-east-2.amazonaws.com/withdraw-icon.svg"
            }
        ],
        "base64": "data:image/png;base64,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"
    },
    {
        "id": 2,
        "name": "Uniswap",
        "website": "https://app.uniswap.org/#/",
        "toolbarImageURL": "https://byfinance.s3.us-east-2.amazonaws.com/toolbar_uniswap.png",
        "showOnToolbar": "1",
        "edgeColor": "#FF3999",
        "description": "Uniswap is a decentralized exchange (DEX) that makes it easy for users to swap an ERC-20 token for another ERC-20 token without the need of a centralized intermediary. With a DEX, traders do not have to deposit their tokens on an exchange and be exposed to the security risks of a centralized exchange. ",
        "vertexImageURL": "https://byfinance.s3.us-east-2.amazonaws.com/P_UNISWAP.png",
        "mediumImageURL": null,
        "actions": [
            {
                "id": 7,
                "protocolId": 2,
                "name": "SwapToken",
                "description": "Swap Token",
                "icon": null
            },
            {
                "id": 8,
                "protocolId": 2,
                "name": "AddLiquidity",
                "description": "Add Liquidity",
                "icon": "https://byfinance.s3.us-east-2.amazonaws.com/addliquidity.svg\r\n"
            },
            {
                "id": 9,
                "protocolId": 2,
                "name": "RemoveLiquidity",
                "description": "Remove Liquidity",
                "icon": "https://byfinance.s3.us-east-2.amazonaws.com/removeliquidity.svg"
            }
        ],
        "base64": "data:image/png;base64,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"
    },
    {
        "id": 3,
        "name": "AAVE",
        "website": "https://aave.com/",
        "toolbarImageURL": "https://byfinance.s3.us-east-2.amazonaws.com/toolbar_aave.png",
        "showOnToolbar": "1",
        "edgeColor": "#5D6D99",
        "description": "ave is a decentralized money market protocol where users can lend and borrow cryptocurrency across 20 different assets as collateral.",
        "vertexImageURL": "https://byfinance.s3.us-east-2.amazonaws.com/P_AAVE.png",
        "mediumImageURL": null,
        "actions": [
            {
                "id": 10,
                "protocolId": 3,
                "name": "FlashLoan",
                "description": "Flash Loan",
                "icon": null
            },
            {
                "id": 11,
                "protocolId": 3,
                "name": "Deposit",
                "description": "Deposit",
                "icon": "https://byfinance.s3.us-east-2.amazonaws.com/deposit-icon.svg"
            },
            {
                "id": 12,
                "protocolId": 3,
                "name": "Withdrawal",
                "description": "Withdrawal",
                "icon": null
            }
        ],
        "base64": "data:image/png;base64,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"
    },
    {
        "id": 4,
        "name": "Compound",
        "website": "https://compound.finance/",
        "toolbarImageURL": "https://byfinance.s3.us-east-2.amazonaws.com/toolbar_compound.png",
        "showOnToolbar": "1",
        "edgeColor": "#02A978",
        "description": "Compound is a decentralized blockchain protocol that allows users to lend or borrow selected cryptocurrencies. It establishes money markets by pooling assets together and algorithmically setting interest rates based on supply and demand of assets.",
        "vertexImageURL": "https://byfinance.s3.us-east-2.amazonaws.com/P_COMPOUND.png",
        "mediumImageURL": null,
        "actions": [
            {
                "id": 13,
                "protocolId": 4,
                "name": "Supply",
                "description": "Supply",
                "icon": "https://byfinance.s3.us-east-2.amazonaws.com/supply.svg"
            },
            {
                "id": 14,
                "protocolId": 4,
                "name": "Withdrawal",
                "description": "Withdrawal",
                "icon": "https://byfinance.s3.us-east-2.amazonaws.com/withdraw-icon.svg"
            },
            {
                "id": 15,
                "protocolId": 4,
                "name": "Repay",
                "description": "Repay",
                "icon": "https://byfinance.s3.us-east-2.amazonaws.com/repay.svg"
            },
            {
                "id": 16,
                "protocolId": 4,
                "name": "CollectComp",
                "description": "Collect Comp",
                "icon": null
            },
            {
                "id": 17,
                "protocolId": 4,
                "name": "Borrow",
                "description": "Borrow",
                "icon": null
            }
        ],
        "base64": "data:image/png;base64,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"
    },
    {
        "id": 5,
        "name": "Harvest",
        "website": "https://harvest.finance/",
        "toolbarImageURL": "https://byfinance.s3.us-east-2.amazonaws.com/toolbar_harvest.png",
        "showOnToolbar": "1",
        "edgeColor": "#AC9107",
        "description": "Harvest Finance is an automatic yield farming protocol that helps traders take advantage of the latest DeFi platforms with the highest yield.",
        "vertexImageURL": "https://byfinance.s3.us-east-2.amazonaws.com/P_HARVEST.png",
        "mediumImageURL": null,
        "actions": [],
        "base64": "data:image/png;base64,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"
    },
    {
        "id": 6,
        "name": "Curve",
        "website": "https://www.curve.fi/",
        "toolbarImageURL": "https://byfinance.s3.us-east-2.amazonaws.com/toolbar_curve.png",
        "showOnToolbar": "1",
        "edgeColor": "#507ce3",
        "description": "Curve is a stable swap automated market making (AMM) protocol aimed at creating deep on-chain liquidity allowing traders to swap between two similar tokens with minimal slippage. For example if you have Tether (USDT), and you would like to swap to USD Coin (USDC), and both are US dollars stablecoins. When swapping on an orderbook exchange, you are most likely to incur a large slippage due to lack of liquidity. If you were to swap on another AMM such as Uniswap or Balancer, you would also incur a large slippage due to their constant product formula. Curve aimed to bring slippage to near zero with its deep liquidity and advanced bonding curve.",
        "vertexImageURL": "https://byfinance.s3.us-east-2.amazonaws.com/P_CURVE.png",
        "mediumImageURL": null,
        "actions": [
            {
                "id": 18,
                "protocolId": 6,
                "name": "SwapStable",
                "description": "Swap Stable",
                "icon": null
            },
            {
                "id": 19,
                "protocolId": 6,
                "name": "SwapBTC",
                "description": "Swap BTC",
                "icon": null
            },
            {
                "id": 20,
                "protocolId": 6,
                "name": "AddLiquidity",
                "description": "Add Liquidity",
                "icon": "https://byfinance.s3.us-east-2.amazonaws.com/addliquidity.svg"
            },
            {
                "id": 21,
                "protocolId": 6,
                "name": "RemoveLiquidity",
                "description": "Remove Liquidity",
                "icon": "https://byfinance.s3.us-east-2.amazonaws.com/removeliquidity.svg"
            },
            {
                "id": 22,
                "protocolId": 6,
                "name": "StakeToken",
                "description": "Stake Token",
                "icon": null
            },
            {
                "id": 23,
                "protocolId": 6,
                "name": "ClaimCRV",
                "description": "Claim CRV",
                "icon": null
            }
        ],
        "base64": "data:image/png;base64,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"
    },
    {
        "id": 7,
        "name": "Balancer",
        "website": "https://balancer.finance/",
        "toolbarImageURL": "https://byfinance.s3.us-east-2.amazonaws.com/toolbar_balancer.png",
        "showOnToolbar": "1",
        "edgeColor": "#1E1E1E",
        "description": "Balancer is a non-custodial portfolio manager, liquidity provider, and price sensor",
        "vertexImageURL": "https://byfinance.s3.us-east-2.amazonaws.com/P_BALANCER.png",
        "mediumImageURL": null,
        "actions": [
            {
                "id": 24,
                "protocolId": 7,
                "name": "SwapToken",
                "description": "Swap Token",
                "icon": null
            },
            {
                "id": 25,
                "protocolId": 7,
                "name": "AddLiquidity",
                "description": "Add Liquidity",
                "icon": "https://byfinance.s3.us-east-2.amazonaws.com/addliquidity.svg"
            },
            {
                "id": 26,
                "protocolId": 7,
                "name": "RemoveLiquidity",
                "description": "Remove Liquidity",
                "icon": null
            }
        ],
        "base64": "data:image/png;base64,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"
    },
    {
        "id": 8,
        "name": "1Inch",
        "website": "https://1inch.exchange/",
        "toolbarImageURL": "https://byfinance.s3.us-east-2.amazonaws.com/toolbar_1inch.png",
        "showOnToolbar": "1",
        "edgeColor": "#1B314F",
        "description": "1inch exchange is a decentralized exchange (DEX) aggregator to help users discover the best trade prices for tokens. Instead of swapping tokens from a single liquidity pool of a DEX, 1inch will aggregate across different pools and suggest the most efficient way to trade tokens.",
        "vertexImageURL": "https://byfinance.s3.us-east-2.amazonaws.com/P_1INCH.png",
        "mediumImageURL": null,
        "actions": [
            {
                "id": 27,
                "protocolId": 8,
                "name": "SwapToken",
                "description": "Swap Token",
                "icon": null
            }
        ],
        "base64": "data:image/png;base64,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"
    },
    {
        "id": 9,
        "name": "MakerDAO",
        "website": "https://makerdao.com/en/",
        "toolbarImageURL": "https://byfinance.s3.us-east-2.amazonaws.com/toolbar_maker.png",
        "showOnToolbar": "1",
        "edgeColor": "#1AAB9B",
        "description": "The Maker token has two core functions: i) governance and ii) recapitalization. In terms of governance, MKR token holders are responsible for monitoring, participating, and voting on proposals or changes to ensure the overall health of the Maker protocol. This is done via two types of polls which are executed through smart contracts: i) proposal polling and ii) executive polling.",
        "vertexImageURL": "https://byfinance.s3.us-east-2.amazonaws.com/P_MAKER.png",
        "mediumImageURL": null,
        "actions": [
            {
                "id": 1,
                "protocolId": 9,
                "name": "Deposit Colleteral",
                "description": "Deposit ETH colleteral",
                "icon": null
            },
            {
                "id": 2,
                "protocolId": 9,
                "name": "Generate DAI",
                "description": "Generate DAI",
                "icon": null
            },
            {
                "id": 3,
                "protocolId": 9,
                "name": "Repay",
                "description": "Repay debt",
                "icon": null
            },
            {
                "id": 4,
                "protocolId": 9,
                "name": "Withdrawal",
                "description": "Withdrawal colleteral",
                "icon": null
            }
        ],
        "base64": "data:image/png;base64,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"
    },
    {
        "id": 10,
        "name": "BY",
        "website": "https://by.finance",
        "toolbarImageURL": "https://byfinance.s3.us-east-2.amazonaws.com/P_BY.png",
        "showOnToolbar": "0",
        "edgeColor": "#313130",
        "description": "BY Finance",
        "vertexImageURL": "https://byfinance.s3.us-east-2.amazonaws.com/P_BY.png",
        "mediumImageURL": null,
        "actions": [],
        "base64": "data:image/png;base64,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"
    }
]