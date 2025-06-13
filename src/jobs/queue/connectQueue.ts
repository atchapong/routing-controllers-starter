// import Bull from 'bull'
// let bullqueue : any = [];
// /**
//  * It creates a new Bull queue with the given name and connects it to the Redis server
//  * @param name - The name of the queue.
//  */
//  const connectQueue = (name) => {
//     if(bullqueue[name]) {
//         return bullqueue[name]
//     } else {
//         const queue = new Bull(name, {
//             redis: { port: parseInt(process.env.REDIS_PORT), host: process.env.REDIS_HOST },
//         })
//         bullqueue[name] = queue
//     }
   
//   return bullqueue[name];
// };


// export default connectQueue 
 