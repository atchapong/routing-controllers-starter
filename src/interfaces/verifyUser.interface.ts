
import mongoose from 'mongoose';

export interface VerifyUsers {
  _id: string;
  user_id: string | mongoose.Types.ObjectId;
  exp_date: Date;
  is_active: boolean;
  created_at: Date;
  updated_at: Date;
}