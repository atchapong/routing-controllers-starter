// import connectQueue from '@/jobs/queue/connectQueue';

// const queueOptions = {
//     // jobId, uncoment this line if your want unique jobid
//     removeOnComplete: true, // remove job if complete
//     delay: 1, // 1 = 60000 min in ms
//     attempts: 1, // attempt if job is error retry 1 times
//     lifo : true,
//     limiter: {
//         max: 50,
//         duration: 600000
//     }
// };

// export default class producer {
//     public queueOptions : typeof queueOptions
//     public connectQueue : any;

//     constructor() {
//         this.queueOptions = queueOptions
//         this.connectQueue = connectQueue
//     }


//     public async useItemQueue(data : any) {
//         return await this.connectQueue('useItemQueue').add(data, this.queueOptions)
//     }
// }