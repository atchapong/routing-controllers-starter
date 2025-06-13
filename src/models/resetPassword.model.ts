
// import mongoose from "mongoose"
// import { model, Schema, Document } from 'mongoose';
// import { resetPassword } from '@/interfaces/resetPassword.interface';

// const resetPasswordSchema = new Schema({
//   email: String,
//   reset_password_token: String,
//   timestamp: Date,
//   used : Boolean,
//   user_id: { 
//     type: Schema.Types.ObjectId, 
//     ref: 'resetpassword' 
//   },
//   createdAt: {
//     type: Date,
//     default: Date.now()
//   },
//   current_time: {
//     type: Date,
//     default: Date.now
//   }
// })


// const ResetPasswordModel = model<resetPassword & Document>('resetpassword', resetPasswordSchema);

// export default ResetPasswordModel