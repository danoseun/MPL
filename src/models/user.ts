import mongoose from 'mongoose';
import { isValidEmail } from '../utils/helper';
import { CreateUserDto } from '../dto/user';

const userSchema = new mongoose.Schema({
  fullname: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true,
    lowercase: true,
    validate(value: string) {
      if (!isValidEmail(value)) {
        throw new Error('Email is invalid')
      }
    },
  },
  password: {
    type: String,
    required: true,
    minlength: 7,
    trim: true,
  },
  role: {
    type: String,
    default: 'user',
    enum: ['user', 'admin'],
  },
})

export const User = mongoose.model<CreateUserDto>('User', userSchema);
