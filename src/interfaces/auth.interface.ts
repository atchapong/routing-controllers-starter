import { Request } from 'express';
import { User } from '@/interfaces/user.interface';

export interface DataStoredInToken {
  _id: string;
}

export interface TokenData {
  token: string;
  expires_in: number;
}

export interface RequestWithUser extends Request {
  user: User;
}
