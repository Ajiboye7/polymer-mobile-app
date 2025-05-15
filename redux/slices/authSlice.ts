import Constants from "expo-constants";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import {
  AuthState,
  SignUpDetails,
  SignInDetails,
  IdentityDetails,
  IdentityNumberDetails,
  CreatePinDetails,
  BaseUser,
  FullUser,
  IdentityPayload,
  IdentityNumberPayload,
  VerificationPayload,
  PinStatusPayload,
  accountTypeDetails,
  accountTypePayload,
} from "@/types/types";
import { RootState } from "../store";

const Host = Constants.expoConfig?.extra?.host || "http://192.168.0.3:5000";

const initialState: AuthState = {
  user: null,
  status: "idle",
  error: null,
};

export const signUp = createAsyncThunk(
  "auth/signUp",
  async (userData: SignUpDetails, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${Host}/api/auth/sign-up`, userData);
      return response.data.data.user;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data.message || error.message);
      }
      return rejectWithValue("An unexpected error occurred. Please try again.");
    }
  }
);

export const signIn = createAsyncThunk(
  "auth/signIn",
  async (userData: SignInDetails, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${Host}/api/auth/sign-in`, userData);
      return response.data.data.user;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data?.message || error.message);
      }
      return rejectWithValue("An unexpected error occurred. Please try again.");
    }
  }
);

export const refreshToken = createAsyncThunk(
  "auth/refreshToken",
  async (_, { rejectWithValue, getState }) => {
    try{
      const state = getState() as RootState
      const token = state.auth.user?.token
      const response = await axios.get(
        `${Host}/api/auth/refresh-token`,{
          headers : {
            Authorization: `Bearer ${token}`,
            'Content-Type' : "application/json"
          },
        }
      );
      return response.data.data
    }catch(error){
      if(axios.isAxiosError(error)){
        return rejectWithValue(error.response?.data.message || error.message)
      }
      return rejectWithValue('failed to refresh token')
    }
  }
);

export const IdentityType = createAsyncThunk(
  "auth/identityType",
  async ({ identityType }: IdentityDetails, { rejectWithValue, getState }) => {
    try {
      const state = getState() as RootState;
      const token = state.auth.user?.token;
      const response = await axios.put(
        `${Host}/api/auth/add-identity-type`,
        {
          identityType,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      return response.data.data;
    } catch (error) {
      let errorMessage = "Failed to update identity";
      if (axios.isAxiosError(error)) {
        errorMessage =
          error.response?.data?.message || error.message || errorMessage;
      }
      return rejectWithValue(errorMessage);
    }
  }
);

export const identityNumber = createAsyncThunk(
  "auth/identityNumber",
  async (
    { identityNumber }: IdentityNumberDetails,
    { rejectWithValue, getState }
  ) => {
    try {
      const state = getState() as RootState;
      const token = state.auth.user?.token;
      const response = await axios.put(
        `${Host}/api/auth/add-identity-number`,
        {
          identityNumber,
        },

        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      return response.data.data;
    } catch (error) {
      let errorMessage = "Failed to add Identity Number";
      if (axios.isAxiosError(error)) {
        errorMessage =
          error.response?.data?.message || error.message || errorMessage;
      }
      return rejectWithValue(errorMessage);
    }
  }
);

export const accountType = createAsyncThunk(
  "auth/accountType",
  async (
    { accountType }: accountTypeDetails,
    { rejectWithValue, getState }
  ) => {
    try {
      const state = getState() as RootState;
      const token = state.auth.user?.token;
      const response = await axios.put(
        `${Host}/api/auth/add-account-type`,
        {
          accountType,
        },

        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      return response.data.data;
    } catch (error) {
      let errorMessage = "Failed to add account type";
      if (axios.isAxiosError(error)) {
        errorMessage =
          error.response?.data?.message || error.message || errorMessage;
      }
      return rejectWithValue(errorMessage);
    }
  }
);

export const createPin = createAsyncThunk(
  "auth/createPin",
  async ({ pin }: CreatePinDetails, { rejectWithValue, getState }) => {
    try {
      const state = getState() as RootState;
      const token = state.auth.user?.token;
      const response = await axios.put(
        `${Host}/api/auth/create-pin`,
        {
          pin,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      return response.data.data;
    } catch (error) {
      let errorMessage = "Failed to create pin";
      if (axios.isAxiosError(error)) {
        errorMessage =
          error.response?.data?.message || error.message || errorMessage;
      }
      return rejectWithValue(errorMessage);
    }
  }
);

{
}

export const confirmPin = createAsyncThunk(
  "auth/confirmPin",
  async ({ pin }: CreatePinDetails, { rejectWithValue, getState }) => {
    try {
      const state = getState() as RootState;
      const token = state.auth.user?.token;
      const response = await axios.post(
        `${Host}/api/auth/confirm-pin`,
        {
          pin,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      return response.data.data;
    } catch (error) {
      let errorMessage = "Failed to create pin";
      if (axios.isAxiosError(error)) {
        errorMessage =
          error.response?.data?.message || error.message || errorMessage;
      }
      return rejectWithValue(errorMessage);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    signOut: (state) => {
      // console.log('user signed out', state);
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(signUp.pending, (state) => {
      state.status = "loading";
    });
    {
    }
    builder
      .addCase(signUp.fulfilled, (state, action: PayloadAction<BaseUser>) => {
        state.status = "succeeded";
        state.user = {
          ...action.payload,
          pinSet: false,
          isVerified: false,
        };
        state.error = null;
      })
      .addCase(signUp.rejected, (state, action) => {
        state.status= "failed"
        state.user = null
        state.error = (action.payload as string) || "Sign up failed";
      });

    {
    }

    builder

      .addCase(signIn.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })

      .addCase(signIn.fulfilled, (state, action: PayloadAction<FullUser>) => {
        state.status = "succeeded";
        state.user = action.payload;
        state.error = null;
        //console.log(state)
      })

      .addCase(signIn.rejected, (state, action) => {
        state.status= "failed"
        state.user = null
        state.error = (action.payload as string) || "Sign in failed";
      })

      .addCase(refreshToken.pending, (state )=>{
        state.status = 'loading'
        state.error = null
      })
      .addCase(refreshToken.fulfilled, (state, action: PayloadAction<{newToken: string}>)=>{
        if(state.user){
          state.user = {
            ...state.user,
            refreshedToken: action.payload.newToken
          }
          state.error= null
        }
      })

      .addCase(refreshToken.rejected, (state, action) => {
        state.error = (action.payload as string) || "Failed to refresh token";
        state.user = null;
        state.status = "failed";
      })

      

      .addCase(
        IdentityType.fulfilled,
        (state, action: PayloadAction<IdentityPayload>) => {
          if (state.user) {
            state.user = {
              ...state.user,
              identityType: action.payload.identityType,
            };
            state.error= null
          }
        }
      )
      .addCase(IdentityType.rejected, (state, action) => {
        state.error = (action.payload as string) || "Failed to update identity";
        state.status= "failed"
        state.user = null
      })

      .addCase(
        identityNumber.fulfilled,
        (state, action: PayloadAction<IdentityNumberPayload>) => {
          if (state.user) {
            state.user = {
              ...state.user,
              identityNumber: action.payload.identityNumber,
            };
            state.error= null
          }
        }
      )
      .addCase(identityNumber.rejected, (state, action) => {
        state.error =
          (action.payload as string) || "Failed to add identity number";
          state.status= "failed"
          state.user = null
      })

      .addCase(
        createPin.fulfilled,
        (state, action: PayloadAction<PinStatusPayload>) => {
          if (state.user) {
            state.user = {
              ...state.user,
              pinSet: action.payload.pinSet,
            };
            state.error= null
          }
        }
      )
      .addCase(createPin.rejected, (state, action) => {
        state.error = (action.payload as string) || "Failed to create pin";
        state.status= "failed"
        state.user = null
      })

      .addCase(
        confirmPin.fulfilled,
        (state, action: PayloadAction<VerificationPayload>) => {
          if (state.user) {
            state.user = {
              ...state.user,
              isVerified: action.payload.isVerified,
            };
            state.error= null
          }
        }
      )
      .addCase(confirmPin.rejected, (state, action) => {
        state.error = (action.payload as string) || "Failed to verify pin";
        state.status= "failed"
        state.user = null
      })

      .addCase(
        accountType.fulfilled,
        (state, action: PayloadAction<accountTypePayload>) => {
          if (state.user) {
            state.user = {
              ...state.user,
              accountType: action.payload.accountType,
            };
            state.error= null
          }
        }
      )
      .addCase(accountType.rejected, (state, action) => {
        state.error =
          (action.payload as string) || "Failed to add account type";
          state.status= "failed"
          state.user = null
      });
  },
});

export default authSlice.reducer;
export const { signOut } = authSlice.actions;
