import { model, Schema, Document } from 'mongoose';
import { User } from '@/interfaces/user.interface';

const userSchema: Schema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
  password: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    index: true,
  },
  tel : {
    type: String,
    required: true,
  },
  bank_name : {
    type: String,
    required: true,
  },
  bank_account_name : {
    type: String,
    required: true,
  },
  bank_account_number : {
    type: String,
    required: true,
  },
  total_credit : {
    type: Number,
    default: 0,
    required: true,
  },
  register_domain : {
    type: String,
    default: "",
  },
  verified_status : {
    type: String,
    default: "padding",
  },
  accept_condition : {
    type: Boolean,
    default: true,
  },
  is_active: {
    type: Boolean,
    index: true,
    default: true,
  },
  created_at: {
    type: Date,
    default: Date.now(),
  },
  updated_at: {
    type: Date,
    default: Date.now(),
  },
});

const userModel = model<User & Document>('User', userSchema);

export default userModel;
