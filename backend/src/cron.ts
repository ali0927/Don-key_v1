import cron from "node-cron";
import axios from "axios";
import { prisma } from "./database";

const YearnVault = prisma.yearn_vaults;


type IJob = {
    schedule: string;
    job: () => Promise<void>,
    runOnStart?: boolean
}
const Jobs: IJob[] = [{
    schedule: "0 */4 * * *",
    runOnStart: true,
    job: async () => {
        try {
            console.log("Running Cron Job at ", new Date());
            const resp = await axios.get("https://api.yearn.tools/vaults?apy=true");
            const array: any[] = resp.data.filter((item: any) => item.apy);
            for (let i = 0; i < array.length; i++) {
                const item = array[i];
                const exists = await YearnVault.findFirst({ where: { name: item.name } });
                const data = {
                    tokenName: item.tokenName,
                    tokenIcon: item.tokenIcon,
                    tokenSymbol: item.tokenSymbol,
                    strategyName: item.strategyName,
                    symbol: item.symbol,
                    apy_symbol: item.apy.symbol,
                    apy_apyOneMonthSample: item.apy.apyOneMonthSample,
                    apy_apyOneWeekSample: item.apy.apyOneWeekSample,
                    apy_tokenAddress: item.apy.tokenAddress,
                    tokenAddress:item.tokenAddress,
                    apy_description: item.apy.description,
                    vaultIcon: item.vaultIcon,
                    address: item.address,
                    timestamp: new Date(),
                }
                if (exists) {
                    await YearnVault.update({ where: { name: item.name }, data })
                } else {
                    await YearnVault.create({
                        data: {
                            name: item.name,
                            ...data,
                        },
                    });
                }
            }
            console.log("Cron Job Completed at ", new Date());
        } catch (e) {
            console.log("An Error Occured in cron job", e, new Date());
        }
    }
}]


const scheduleJobs = () => {
    console.log("Scheduling Cron Jobs");
    Jobs.forEach(async ({job,schedule,runOnStart})  => {
        if(runOnStart){
            await job();
        }
        cron.schedule(schedule, job);
    })
}
if(process.env.NODE_ENV === "production"){
    scheduleJobs();
}
