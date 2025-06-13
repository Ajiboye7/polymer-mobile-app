import mongoose from "mongoose";
import { Schema } from "mongoose";
import { IUser, IUserModel } from "../types/types";
import validator from "validator";
import bcrypt from "bcrypt";
import { generateOTP } from "../utils/send-otp";
import { sendOtpEmail } from "../utils/send-otp";

const UserSchema = new Schema<IUser, IUserModel>({
  name: {
    type: String,
    required: true,
  },

  account: {
    type: String,
    required: true,
    unique: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },

  password: {
    type: String,
    required: true,
  },

  otp: {
    type: String,
  },

  otpExpiry: {
    type: Date,
  },

  pin: {
    type: String,
    required: false,
  },
  pinSet: {
    type: Boolean,
    default: false,
  },

  isVerified: {
    type: Boolean,
   default: false,
  },

  accountType: {
    type: String,
    required: false,
  },

  identityType: { type: String, enum: ["bvn", "nin"] },

  identityNumber: {
    type: String,
    required: false,
  },

  balance: {
    type: Number,  
    default: 113000,
    min: [0, 'Balance cannot be negative']
  }
});

UserSchema.statics.signUp = async function (
  name: string,
  account: string,
  email: string,
  password: string,
  confirmPassword: string
) {
  try {
   if (!name?.trim() || !email?.trim() || !password?.trim() || !confirmPassword?.trim() || !account?.trim()) {
  throw new Error("All fields are required");
}

    if (password !== confirmPassword) {
      throw new Error("Passwords do not match");
    }

    // // Start a MongoDB session for transactions
    // const session = await mongoose.startSession();
    // // Begin the transaction to ensure atomicity
    // session.startTransaction();

    try {
      if (!validator.isEmail(email)) {
        throw new Error("Please enter a valid email");
      }

      // // Check for existing account within the transaction session
      // const accountExists = await this.findOne({ account }).session(session);
      const accountExists = await this.findOne({ account });
      if (accountExists) {
        throw new Error("Account number already exists");
      }

      if (!validator.isStrongPassword(password)) {
        throw new Error("Password not strong enough");
      }

      const normalizedEmail = email.toLowerCase();
      // // Check for existing email within the transaction session
      // const exists = await this.findOne({ email: normalizedEmail }).session(session);
      const exists = await this.findOne({ email: normalizedEmail });
      if (exists) {
        throw new Error("Email already exists");
      }

      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(password, salt);

      const otp = generateOTP();
      const otpExpiry = new Date(Date.now() + 10 * 60 * 1000);

      try {
        await sendOtpEmail({ email, otp: otp.toString() });
      } catch (error) {
        console.error("Failed to send OTP email:", error);
        throw new Error("Failed to send OTP email. Please try again.");
      }

      // // Create the user within the transaction session
      // const user = await this.create(
      //   [{
      //     name,
      //     account,
      //     email: normalizedEmail,
      //     password: hash,
      //     otp,
      //     otpExpiry,
      //   }],
      //   { session }
      // );
      const user = await this.create({
        name,
        account,
        email: normalizedEmail,
        password: hash,
        otp,
        otpExpiry,
      });

      // // Commit the transaction to save changes
      // await session.commitTransaction();
      // // End the session
      // session.endSession();

      // // Return the first user from the array (transactional create returns an array)
      // return user[0];
      return user;

    } catch (error) {
      // // If an error occurs, abort the transaction to rollback changes
      // await session.abortTransaction();
      // // End the session
      // session.endSession();
      throw error;
    }
  } catch (error) {
    console.error("SignUp error:", error);
    throw error;
  }
};

UserSchema.statics.signIn = async function (email: string, password: string) {
  if (!email?.trim() || !password?.trim()) {
  throw new Error("Email and password are required");
}
  if (!validator.isEmail(email)) {
    throw new Error("Please enter a valid email");
  }

  const normalizedEmail = email.toLowerCase();
  const user = await this.findOne({ email: normalizedEmail });

  if (!user) {
    //throw new Error("User does not exist");
    throw new Error ("Incorrect Credentials")
  }

  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    throw new Error ("Incorrect Credentials")
  }

  return user;
};

export default mongoose.model<IUser, IUserModel>("User", UserSchema);
