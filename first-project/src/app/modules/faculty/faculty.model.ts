import mongoose, { Schema } from 'mongoose';
import { TFaculty, FacultyModel } from './faculty.interface'; // Adjust import path

const facultySchema = new Schema<TFaculty, FacultyModel>({
  id: { type: String, required: true, unique: true },
  user: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  designation: { type: String, required: true },
  name: {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
  },
  gender: {
    type: String,
    enum: ['male', 'female'],
    required: true,
  },
  dateOfBirth: { type: Date },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  contactNo: { type: String, required: true },
  emergencyContactNo: { type: String, required: true },
  bloodGroup: {
    type: String,
    enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
  },
  presentAddress: { type: String, required: true },
  permanentAddress: { type: String, required: true },
  profileImg: { type: String, required: true, default: '' },
  academicDepartment: {
    type: Schema.Types.ObjectId,
    ref: 'AcademicDepartment',
    required: true,
  },
  isDeleted: { type: Boolean, default: false },
});

// Static method to check if faculty exists
facultySchema.statics.isUserExists = async function (id: string) {
  const existingFaculty = await this.findOne({
    id,
    isDeleted: false,
  }).select('-__v');
  return existingFaculty;
};

// Query middleware to filter out deleted faculties
facultySchema.pre('find', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

facultySchema.pre('findOne', function (next) {
  this.merge({ isDeleted: { $ne: true } });
  next();
});

facultySchema.pre('findOneAndUpdate', function (next) {
  this.merge({ isDeleted: { $ne: true } });
  next();
});

export const Faculty = mongoose.model<TFaculty, FacultyModel>(
  'Faculty',
  facultySchema,
);
