
import { model, Schema, Document } from 'mongoose';
import { VerifyUsers } from '@interfaces/verifyUser.interface';

const verifyUserSchema: Schema = new Schema({
    user_id: Schema.Types.ObjectId,
    otp_number: {
        type: String,
        required: true,
    },
    exp_date: {
        type: Date,
        required: true,
    },
    is_active : {
        type: Boolean,
        default: true
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date,
        default: Date.now
    },

});

const verifyUsersModel = model<VerifyUsers & Document>('verifyUsers', verifyUserSchema);

export default verifyUsersModel;

