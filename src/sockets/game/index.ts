import { Server, Socket } from 'socket.io'
import { isEmpty, IdValidId } from '@utils/util';
import socketAuthorize from "@/middlewares/socketAuthorize"

import userService from '@/services/users.service'



class gameSocket {
  public io: any
  public lobby: any
  public redisClient : any

  public userService : userService



  public room: any
  constructor(io: Server, pubClient : any, socketInfo : any) {
    
    this.io = io.of('/' + socketInfo)
    this.redisClient = pubClient
    this.room = []
    // MIDDLEWARES AUTH REQUEST
    // AuthorizeSocket(this.io)
    this.connection()
    this.userService = new userService()
  }

  connection() {

   /**
    * A function that is called when a client connects to the server.
    * @param {Socket} socket - Socket
    * @param [callback] - A function that will be called when the connection is made.
    * @returns Nothing.
    */
    const onConnection = async (socket: any ,  callback?: (
      response: any, 
      error: any
    ) => void)=> {

        try {
              var handshakeData : any = socket.request;
              console.log('onConnection',socket.request.user);
              socket.data = handshakeData._query
          

              socket.on("disconnect", async () => {
                console.log('disconnect',socket.id);
              })
        } catch (error) {
          socket.disconnect()
          return error.message
        }


    }



    this.io
    .use(socketAuthorize)
    .on("connection", onConnection)

  }
}

export default gameSocket

