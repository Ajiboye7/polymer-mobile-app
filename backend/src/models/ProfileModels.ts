import mongoose, { Schema } from "mongoose";
import { IProfile, IProfileModel } from "../types/types";
import { isValidPhoneNumber} from "libphonenumber-js";

const ProfileSchema = new Schema<IProfile, IProfileModel>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    phoneNumber: {
      type: String,
      required: [true, "Phone number is required"],
      unique: true,
      trim: true,
    },
    address: {
      type: String,
      required: [true, "Address is required"],
      trim: true,
    },
    nextOfKin: {
      type: String,
      required: [true, "Next of kin is required"],
      trim: true,
    },
    nextOfKinRelationship: {
      type: String,
      required: [true, "Next of kin relationship is required"],
      trim: true,
    },

    profilePicture: {
      type: String,
      default: null,
    },
  },
  { timestamps: true }
);

ProfileSchema.statics.profile = async function (
  phoneNumber: string,
  address: string,
  nextOfKin: string,
  nextOfKinRelationship: string,
  userId: string ,


) {
  try {
    if (
      !phoneNumber ||
      !address ||
      !nextOfKin ||
      !nextOfKinRelationship
     
    ) {
      throw new Error("All fields are to be filled");
    }

    const formattedPhone = phoneNumber.startsWith("0")
      ? "+234" + phoneNumber.slice(1)
      : phoneNumber;

    if (!isValidPhoneNumber(formattedPhone)) {
      throw Error("Invalid phone number format");
    }

    const UserProfile = await this.create({
      userId,
      phoneNumber,
      address,
      nextOfKin,
      nextOfKinRelationship,
    });

    return UserProfile;
  } catch (error) {
    if (error instanceof Error) {
      throw error; 
    }
    throw new Error("An unexpected error occurred while creating profile");
  }
};

export default mongoose.model<IProfile, IProfileModel>(
  "Profile",
  ProfileSchema
);
