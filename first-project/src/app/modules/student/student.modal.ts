import { Schema, model } from 'mongoose';
import {
  TGuardian,
  TLocalGuardian,
  TStudent,
  StudentModel,
  TUserName,
} from './student.interface';
import bcrypt from 'bcrypt';
import config from '../../config';

const userNameSchema = new Schema<TUserName>({
  firstName: {
    type: String,
    required: [true, 'First name is required'],
    // maxlength: [
    //   20,
    //   '{VALUE} is more than 20 characters. First name cannot be more than 20 characters',
    // ],
    // trim: true,
    // validate: {
    //   validator: function (value: string) {
    //     const firstNameStr = value.charAt(0).toUpperCase() + value.slice(1);

    //     return firstNameStr === value;
    //   },
    //   message: '{VALUE} is not in capitalize format',
    // },
  },
  middleName: {
    type: String,
    trim: true,
  },
  lastName: {
    type: String,
    required: [true, 'Last name is required'],
    trim: true,
    // validate: {
    //   validator: (value: string) => validator.isAlpha(value),
    //   message: '{VALUE} is not valid',
    // },
  },
});

const guardianSchema = new Schema<TGuardian>({
  fatherName: {
    type: String,
    required: [true, "Father's name is required"],
    trim: true,
  },
  fatherOccupation: {
    type: String,
    required: [true, "Father's occupation is required"],
    trim: true,
  },
  fatherContactNo: {
    type: String,
    required: [true, "Father's contact number is required"],
    trim: true,
  },
  motherName: {
    type: String,
    required: [true, "Mother's name is required"],
    trim: true,
  },
  motherOccupation: {
    type: String,
    required: [true, "Mother's occupation is required"],
    trim: true,
  },
  motherContactNo: {
    type: String,
    required: [true, "Mother's contact number is required"],
    trim: true,
  },
});

const localGuardianSchema = new Schema<TLocalGuardian>({
  name: {
    type: String,
    required: [true, "Local guardian's name is required"],
    trim: true,
  },
  occupation: {
    type: String,
    required: [true, "Local guardian's occupation is required"],
    trim: true,
  },
  contactNo: {
    type: String,
    required: [true, "Local guardian's contact number is required"],
    trim: true,
  },
  address: {
    type: String,
    required: [true, "Local guardian's address is required"],
    trim: true,
  },
});

const studentSchema = new Schema<TStudent, StudentModel>({
  id: {
    type: String,
    required: [true, 'Student ID is required'],
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
  },
  name: {
    type: userNameSchema,
    required: [true, 'Student name is required'],
  },
  gender: {
    type: String,
    enum: {
      values: ['male', 'female'],
      message: '{VALUE} is not valid. Only "male" or "female" is allowed',
    },
    required: [true, 'Gender is required'],
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'Email address is required'],
    trim: true,
    // validate: {
    //   validator: (value: string) => validator.isEmail(value),
    //   message: '{VALUE} is not a valid email type',
    // },
  },
  dateOfBirth: {
    type: String,
    trim: true,
  },
  contactNo: {
    type: String,
    required: [true, 'Contact number is required'],
    trim: true,
  },
  bloodGroup: {
    type: String,
    enum: {
      values: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
      message: '{VALUE} is not a valid blood group',
    },
    trim: true,
  },
  presentAddress: {
    type: String,
    required: [true, 'Present address is required'],
    trim: true,
  },
  permanentAddress: {
    type: String,
    required: [true, 'Permanent address is required'],
    trim: true,
  },
  guardian: {
    type: guardianSchema,
    required: [true, 'Guardian information is required'],
  },
  localGuardian: {
    type: localGuardianSchema,
    required: [true, 'Local guardian information is required'],
  },
  emergencyContactNo: {
    type: String,
    required: [true, 'Emergency contact number is required'],
    trim: true,
  },
  profileImg: {
    type: String,
    required: [true, 'Profile image is required'],
    trim: true,
  },
  isActive: {
    type: String,
    enum: {
      values: ['active', 'block'],
      message: '{VALUE} is not valid. Only "active" or "block" is allowed',
    },
    default: 'active',
    trim: true,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
});

// pre save middleware /hook
studentSchema.pre('save', async function (next) {
  console.log(this, `pre hook: we will save the data`);

  // hash password and save into DB
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this;
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_round),
  );
  next();
});
studentSchema.post('save', function (doc, next) {
  doc.password = '';
  next();
});

// query middleware
studentSchema.pre('find', function (next) {
  next();
});

// create a custom instance method
// studentSchema.methods.isUserExists = async function (id: string) {
//   const existingUser = await Student.findOne({ id });
//   return existingUser;
// };

// create a custom static method
studentSchema.statics.isUserExists = async function (id: string) {
  const existingUser = await Student.findOne({ id });
  return existingUser;
};

export const Student = model<TStudent, StudentModel>('Student', studentSchema);
