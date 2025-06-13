//model
import userModel from '@/models/user.model';

import { model, Schema, Document } from 'mongoose';
import { str } from 'envalid';

export default class MainService {
  public model : {
    user: typeof userModel
  } 
  
  constructor() {
    this.model = {
        user : userModel
    }
  }
}