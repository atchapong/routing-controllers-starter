// import Bull from 'bull';
// import PlayerService from '@/services/users.service';

// export default class IncreateFpPointJob {
//   public redis: {
//     port: number;
//     host: string;
//   };
//   public job : any;
//   public player : PlayerService;

//    constructor(redis: any) {
//     this.redis = redis;
//     this.job = new Bull('increateFpPoint', { redis: this.redis })
//     this.addQueue();
//     this.player = new PlayerService()
//   }

//   public async addQueue() {
//         const repeatable = await this.job.getRepeatableJobs();
//         await Promise.all(repeatable.map((job) => this.job.removeRepeatableByKey(job.key)));
//         await this.job.clean(0, 'delayed');

//       const queue = this.job.add({ name: 'increateFpPoint' }, { repeat: {  cron:"0 0 * * *"}, removeOnComplete: true, removeOnFail: true });

//       this.job.process(async (job,done) => {
//         console.log('===== Job increateFpPoint Running =======')
        
//         try {
//             await this.player.increateFpPoint()
//             done(false)
//         } catch (error) {
//             done(error.message)
//         }

//         return 
//       });
//       this.job.on("completed", async (job,done) => {
//         console.log('===== Job increateFpPoint Sccess =======')
//         job.remove()
//       });

//       this.job.on("failed", (job, error) => {
//         console.log('===== Job increateFpPoint Fail =======')
//         console.log(error)
//       });
//   }

// }
