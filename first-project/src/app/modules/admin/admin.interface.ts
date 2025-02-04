import { Model, Types } from 'mongoose';

export type TAdmin = {
  id: string;
  user: Types.ObjectId;
  designation: string;
  name: {
    firstName: string;
    lastName: string;
  };
  gender: 'male' | 'female';
  dateOfBirth?: Date;
  email: string;
  contactNo: string;
  emergencyContactNo: string;
  bloodGroup?: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
  presentAddress: string;
  permanentAddress: string;
  profileImg: string;
  isDeleted: boolean;
};

export interface AdminModel extends Model<TAdmin> {
  isUserExists(id: string): Promise<TAdmin | null>;
}
