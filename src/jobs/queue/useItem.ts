// import Bull from 'bull';
// import itemService from '@services/item.service';
// import inventoriesModel from '@models/inventories.model';
// import connectQueue from '@/jobs/queue/connectQueue';

// export default class useItemQueue {
//   public redis: {
//     port: number;
//     host: string;
//   };
//   public queue: any;
//   public itemService: itemService;
//   public inventory: typeof inventoriesModel;

//   constructor(redis: any) {
//     this.redis = redis;
//     this.queue = connectQueue('useItemQueue');
//     this.addQueue();
//     this.itemService = new itemService();;
//     this.inventory = inventoriesModel;
//   }

//   public async addQueue() {
//     const repeatable = await this.queue.getRepeatableJobs();
//     await Promise.all(repeatable.map(job => this.queue.removeRepeatableByKey(job.key)));
//     await this.queue.clean(0, 'delayed');

//     this.queue.process(async (job, done) => {
//       console.log('===== Add queue use item =======');
//       console.log('job.data.id_gen',job.data.id_gen)

//       await new Promise(resolve => setTimeout(resolve, 1000));
      
//       try {
//         const item_save = await this.itemService.distoyItemData(job.data.id_gen);

//         if (item_save) {
//           const inventory_data: any = await this.inventory.findOne({ player_id: job.data.player_id });
//           const itemDelete = inventory_data.item.filter(data => {

//             if(data.id_gen.toString() != job.data.id_gen) {
//               return data
//             }

//           });

//             await this.inventory.updateOne({ player_id: job.data.player_id },{ $set: { item: itemDelete }});
          

//         }

//         done(false);
//       } catch (error) {
//         done(error.message);
//       }

//       return;
//     });

//     this.queue.on('completed', async (job, done) => {
//       console.log('===== Job queue use item Sccess =======');
//       job.remove();
//     });

//     this.queue.on('failed', (job, error) => {
//       console.log('===== Job queue use item Fail =======');
//       console.log(error);
//     });
//   }
// }
