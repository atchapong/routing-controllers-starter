import { Server, Socket } from 'socket.io'
import parser from 'socket.io-parser'
import { createAdapter } from "@socket.io/redis-adapter";
import { createClient } from "redis";

import {
  SocketProps,
  SocketClientProps,
  SocketMessageProps,
} from '@/interfaces/socket.interface'
import * as http from 'http';
import gameSocket from "@/sockets/game"
import {redisClient} from "@/helper/redisClient";

/* We create a new socket server using the socket.io library. 
We create a new */
class SocketIOController {

  public count: number
  public io: any
  private server: http.Server
  public optionsIO: Object = {
    parser,
    cors: {
      origin: true,
      pingTimeout: 30000,
      allowedHeaders: [
        'X-Requested-With',
        'Content-Type',
        'Authorization'
      ],
      credentials: true
    },
    transports: [
      "polling",
      "websocket"
    ]
  }

/**
 * It creates a new instance of the multiplayer class and the redisSocket class.
 * @param {any} server - The server object that the socket.io server is running on.
 */
   constructor(server: any) {
    this.io = new Server(server, this.optionsIO)
    const pubClient = redisClient
      
    this.count = 0
    this.io.sockets.setMaxListeners(100);

    new gameSocket(this.io, pubClient, 'game-play')
  }

};

export default SocketIOController