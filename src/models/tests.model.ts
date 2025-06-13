import { model, Schema, Document } from 'mongoose';
import { Test } from '@interfaces/tests.interface';

const testSchema: Schema = new Schema({
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  is_active: {
    type: Boolean,
    default: true,
  },
});

const testModel = model<Test & Document>('Test', testSchema);

export default testModel;
