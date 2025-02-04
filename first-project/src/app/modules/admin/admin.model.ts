import mongoose, { Schema } from 'mongoose';
import { TAdmin, AdminModel } from './admin.interface'; // Adjust the import path as needed
import AppError from '../../errors/AppError';
import { StatusCodes } from 'http-status-codes';

const adminSchema = new Schema<TAdmin, AdminModel>({
  id: { type: String, required: true, unique: true },
  user: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
  designation: { type: String, required: true },
  name: {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
  },
  gender: { type: String, enum: ['male', 'female'], required: true },
  dateOfBirth: { type: Date },
  email: { type: String, required: true, unique: true },
  contactNo: { type: String, required: true },
  emergencyContactNo: { type: String, required: true },
  bloodGroup: {
    type: String,
    enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
  },
  presentAddress: { type: String, required: true },
  permanentAddress: { type: String, required: true },
  profileImg: { type: String, required: true },
  isDeleted: { type: Boolean, default: false },
});

adminSchema.statics.isUserExists = async function (id: string) {
  const existingAdmin = await Admin.findOne({ id, isDeleted: false });
  return existingAdmin;
};

adminSchema.pre('save', async function (next) {
  try {
    const res = await Admin.findOne({ email: this.email });
    if (res) {
      throw new AppError(StatusCodes.BAD_REQUEST, 'User already exists');
    }
  } catch (error) {
    next(error as Error);
  }
  next();
});

adminSchema.pre('find', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

adminSchema.pre('findOne', function (next) {
  this.merge({ isDeleted: { $ne: true } });
  next();
});

adminSchema.pre('findOneAndUpdate', function (next) {
  this.merge({ isDeleted: { $ne: true } });
  next();
});
export const Admin = mongoose.model<TAdmin, AdminModel>('Admin', adminSchema);
