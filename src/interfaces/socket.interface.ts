interface DateConstructor {
  new(): Date
}

export interface SocketProps {
  id: string,
  address: any,
  createdAt?: Date,
  updatedAt?: Date,
}

export interface SocketOnlineProps {
  id: string,
  address: string,
}

export interface SocketClientProps {
  address: string,
}

export interface SocketMessageProps {
  room: string,
  address: string,
  message: string,
  isGif: boolean,
  username?: string,
  avatar?: number,
  role?: string,
  readed?: boolean,
  date?: string,
}