import axios from "axios";
import { prisma } from "./database";
import { IJob } from "./IJob";

const PancakeTokens = prisma.pancakeSwapTokens;
const PancakePairs = prisma.pancakeSwapPairs;

export const PancakeCronJob: IJob = {
	schedule: "*/3 * * * *",
    JobName: "Pancake Cron Job",
    runOnStart: true,
	job: async () => {
		const [res1, res2] = await Promise.all([
			axios.get("https://api.pancakeswap.finance/api/v1/price"),
			axios.get("https://api.pancakeswap.finance/api/v1/stat"),
		]);
		const prices = res1.data.prices;
		const tokens = Object.keys(prices);

		for (let i = 0; i < tokens.length; i++) {
            const name = tokens[i]
			const exists = await PancakeTokens.findFirst({
				where: { name },
			});
			const data = {
				lastUpdated: new Date(),
				name,
				price: prices[tokens[0]],
			};

		
			if (!exists) {
				await PancakeTokens.create({
					data,
				});
			} else {
				 await PancakeTokens.update({
					where: {
						id: exists.id,
					},
					data,
				});
			}
		}
        console.log("Starting Pairs")
		const tradePairs = res2.data.trade_pairs;

		for (let i = 0; i < tradePairs.length; i++) {
			const pair = tradePairs[i];
			const base_symbol = pair.base_symbol;
			const quote_symbol = pair.quote_symbol;
			const exists1 = await PancakeTokens.findFirst({
				where: { name: base_symbol },
			});
			const exists2 = await PancakeTokens.findFirst({
				where: { name: quote_symbol },
			});
			if (exists1 && exists2) {
				const pairExists = await PancakePairs.findFirst({
					where: {
						base_symbol: exists1.id,
						quote_symbol: exists2.id,
					},
				});

				const data = {
					lastUpdated: new Date(),
					base_symbol: exists1.id,
					quote_symbol: exists2.id,
					last_price: pair.last_price,
					pair_contract: pair.swap_pair_contract,
				};

				if (!pairExists) {
					await PancakePairs.create({ data });
				} else {
					await PancakePairs.update({
						data,
						where: { id: pairExists.id },
					});
				}
			}
		}
	},
};
