import Constants from "expo-constants";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { userState, ProfileDetail, profilePictureDetail } from "@/types/types";
import { RootState } from "../store";
import { pickImage } from "@/backend/src/utils/imagePicker";
import { stat } from "fs";

const Host = Constants.expoConfig?.extra?.host || "http://192.168.0.3:5000";

const initialState: userState = {
  userProfile: null,
  status: "idle",
  error: null,
  profilePictureUploadStatus: "idle",
  profileSet: false,
};

export const createProfile = createAsyncThunk(
  "profile/createProfile",
  async (userProfileData: ProfileDetail, { rejectWithValue, getState }) => {
    try {
      const state = getState() as RootState;
      const token = state.auth.user?.token;

      const response = await axios.post(
        `${Host}/user/profile/create-profile`,
        userProfileData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      return response.data.data;
    } catch (error) {
      let errorMessage = "An unexpected error occurred. Please try again.";

      if (axios.isAxiosError(error)) {
        errorMessage =
          error.response?.data?.message ||
          "Failed to create user profile. please try again";
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }

      console.log("error creating profile", errorMessage);

      return rejectWithValue(errorMessage);
    }
  }
);

export const uploadProfilePicture = createAsyncThunk(
  "profile/uploadProfilePicture",
  async (_, { rejectWithValue, getState }) => {
    try {
      const imageFile = await pickImage();
      console.log(imageFile);
      if (!imageFile) return rejectWithValue("No image selected");

      const formData = new FormData();
      formData.append("photo", {
        uri: imageFile.uri,
        name: imageFile.name,
        type: imageFile.type,
      } as any);

      const state = getState() as RootState;
      const token = state.auth.user?.token;

      const response = await axios.put(
        `${Host}/user/profile/upload-picture`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response.data.data;
    } catch (error) {
      let errorMessage = "Failed to upload profile picture. Please try again";
      if (axios.isAxiosError(error)) {
        errorMessage = error.response?.data.message || errorMessage;
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }
      return rejectWithValue(errorMessage);
    }
  }
);

export const fetchUserProfile = createAsyncThunk(
  "profile/fetchProfile",
  async (_, { rejectWithValue, getState }) => {
    try {
      const state = getState() as RootState;
      const token = state.auth.user?.token;

      const response = await axios.get(`${Host}/user/profile/get-profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      return response.data.data;
    } catch (error) {
      let errorMessage = "Failed to fetch user profile";
      if (axios.isAxiosError(error)) {
        errorMessage = error.response?.data?.message || errorMessage;
      }
      return rejectWithValue(errorMessage);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createProfile.pending, (state) => {
        state.status = "loading";
        state.error= null
      })

      .addCase(
        createProfile.fulfilled,
        (state, action: PayloadAction<ProfileDetail>) => {
          state.status = "succeeded";
        
          state.userProfile = {
            ...action.payload,
            profilePicture: state.userProfile?.profilePicture || null,
          };
          state.profileSet = true
          state.error= null
        }
      )
      .addCase(createProfile.rejected, (state, action) => {
        (state.status = "failed"),
        (state.userProfile= null),
          (state.error =
            (action.payload as string) || "error creating profile");
      })

      .addCase(uploadProfilePicture.pending, (state) => {
        state.status = "loading";
        state.error= null
      })

      .addCase(
        uploadProfilePicture.fulfilled,
        (state, action: PayloadAction<profilePictureDetail>) => {
          state.profilePictureUploadStatus = 'succeeded'
          if (state.userProfile) {
            state.userProfile = {
              ...state.userProfile,
              profilePicture: action.payload.profilePicture,
            };
            state.error= null
          }
        }
      )

      .addCase(uploadProfilePicture.rejected, (state, action) => {
        state.error = (action.payload as string) || "failed to upload image";
        state.profilePictureUploadStatus = 'failed'
        
      })

      .addCase(fetchUserProfile.pending, (state) => {
        state.status = "loading";
        state.error= null
        
      })
      .addCase(
        fetchUserProfile.fulfilled,
        (state, action: PayloadAction<ProfileDetail>) => {
          state.status = "succeeded";
          state.userProfile = {
            ...action.payload,
            profilePicture: action.payload.profilePicture || null,
          };
          state.profileSet = true
          state.error= null
        }
      )
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.status = "failed";
       if(action.payload === 'profile not found'){
        state.profileSet = false
        state.error = null
        state.userProfile = null
       }else{
        state.error = (action.payload as string) || "failed to fetch profile";
       }
      });
  },
});

export default userSlice.reducer;
