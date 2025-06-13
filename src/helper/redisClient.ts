import {createClient} from "redis";
const { promisify } = require("util");
const redisClient :any = createClient(); // default port 6379

redisClient.on("error", function (err) {
    redisClient.end(true);
  });
  
const getAsync = promisify(redisClient.get).bind(redisClient)
const setAsync = promisify(redisClient.set).bind(redisClient);
const delAsync = promisify(redisClient.del).bind(redisClient);

export  {redisClient , promisify, getAsync, setAsync, delAsync}