import cron from "node-cron";
import { IJob } from "./IJob";
import { PancakeCronJob } from "./PancakeCronJob";

import { YearnCronJob } from "./YearnCronJob";


const Jobs: IJob[] = [YearnCronJob, PancakeCronJob]


const scheduleJobs = () => {
    console.log("Scheduling Cron Jobs");
    Jobs.forEach(async ({job,schedule,runOnStart,JobName})  => {
        const newJob = async () => {
            try {
                console.log(`Running ${JobName} at `, new Date());
                await job()
                console.log(`Cron Job ${JobName} Completed at `, new Date());
            }catch(e){
                console.log(`An Error Occured in  ${JobName}`, e, new Date());
            }
            
        }
        if(runOnStart){
            await newJob();
        }
        cron.schedule(schedule, newJob);
    })
}
if(process.env.NODE_ENV === "production"){
    scheduleJobs();
}
