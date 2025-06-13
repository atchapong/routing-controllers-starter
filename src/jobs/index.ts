// import mongoose from 'mongoose';
// import express from 'express';
// import IncreateFpPointJob from '@/jobs/schedule/IncreateFpPoint';
// import useItemQueue from '@/jobs/queue/useItem';
// import { BullMonitorExpress } from '@bull-monitor/express';
// import { BullAdapter } from "@bull-monitor/root/dist/bull-adapter";

// export default class Job {
//     public app : express.Application;
//     public redis_config : {
//         port: number, 
//         host: string
//     }
//     public moniter : any = null

//     constructor(app) {
//         this.app = app
//         this.redis_config = {
//             port : parseInt(process.env.REDIS_PORT),
//             host : process.env.REDIS_HOST
//         }
//         this.initialize()
//     }

//     public async initialize() {
//         try {
//             let data : any[] = []
//             //add job
//             let IncreateFpPoint = new IncreateFpPointJob(this.redis_config);
//             data.push(new BullAdapter(IncreateFpPoint.job))

//             //add queue
//             let useItem = new useItemQueue(this.redis_config);
//             data.push(new BullAdapter(useItem.queue))
  

//             const monitor = new BullMonitorExpress({
//                 queues: data,
//                 gqlIntrospection: true,
//                 metrics: {
//                   collectInterval: { hours: 1 },
//                   maxMetrics: 100,
//                   blacklist: ['1'],
//                 },
//               });
          
//               await monitor.init();
//               this.app.use('/queue', monitor.router);
//         } catch (error) {
//             console.log('error',error)
//         }
//     }

// }
