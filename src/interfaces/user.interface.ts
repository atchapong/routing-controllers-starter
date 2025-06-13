import mongoose from 'mongoose';

export interface User {
  save()
  _id: string;
  email: string;
  password ?: string;
  created_at: string;
  updated_at: string;
  username: string;
  is_active: boolean;
  tel : string;
  bank_name: string;
  bank_account_name: string;
  bank_account_number: string;
  total_credit: number;
  register_domain: string;
  verified_status: string;
  accept_condition: boolean;
}