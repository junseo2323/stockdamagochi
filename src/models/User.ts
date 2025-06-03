//MongoDB 스키마 셋팅
//USERS

import {Schema, model, models} from 'mongoose';

const UserSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true }, 
  password: { type: String, required: true },
  createdAt: { type: Number, default: () => Date.now() } // createdAt 기본값 설정
});

const User = models.User || model('User', UserSchema);
export default User;