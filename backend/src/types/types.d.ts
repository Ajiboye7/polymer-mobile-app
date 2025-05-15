import { Model, Document } from "mongoose";

export interface IUser extends Document {
  _id: string;
  name: string;
  account: string;
  email: string;
  password: string;
  otp?: string;
  otpExpiry?: Date;
  isVerified?: boolean;
  identityType?: string;
  identityNumber?: string;
  pin?: string;
  pinSet?: boolean;
  accountType?: string;
  balance?: number;
}

export interface IUserModel extends Model<IUser> {
  signUp: (
    name: string,
    account: string,
    email: string,
    password: string,
    confirmPassword: string
  ) => Promise<IUser>;

  signIn: (email: string, password: string) => Promise<IUser>;
}

export interface IProfile extends Document {
  userId: Types.ObjectId;
  phoneNumber: string;
  address: string;
  nextOfKin: string;
  nextOfKinRelationship: string;
  profilePicture: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IProfileModel extends Model<IProfile> {
  profile: (
    phoneNumber: string,
    address: string,
    nextOfKin: string,
    nextOfKinRelationship: string,
    //profilePicture: string,
    userId: Types.ObjectId,

  ) => Promise<IProfile>;
}

export interface sendOtpProps {
  email: string;
  otp: string;
}
