import Constants from "expo-constants";
import { BalanceState } from "@/types/types";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import axios from "axios";

const Host = Constants.expoConfig?.extra?.host || "http://192.168.0.3:5000";

const initialState: BalanceState = {
  amount: null,
  status: "idle",
  error: null,
};

export const fetchBalance = createAsyncThunk(
  "balance/fetch",
  async (_, { rejectWithValue, getState }) => {
    try {
      const state = getState() as RootState;
      const token = state.auth.user?.token;

      const response = await axios.get(`${Host}/user/balance/get-balance`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      return response.data.data.balance;
    } catch (error) {
      let errorMessage = "An unexpected error occurred. please try again";
      if (axios.isAxiosError(error)) {
        errorMessage =
          error.response?.data?.message || error|| "Failed to fetch balance";
      } 

      console.log("error fetching balance", errorMessage);

      return rejectWithValue(errorMessage);
    }
  }
);

export const deductBalance = createAsyncThunk(
  "balance/deduct",
  async (amount: number, { rejectWithValue, getState }) => {
    try {
      const state = getState() as RootState;
      const token = state.auth.user?.token;

      const response = await axios.post(
        `${Host}/user/balance/deduct-balance`,
        { amount },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      return response.data.data.newBalance;
    } catch (error) {
      let errorMessage = "An unexpected error occurred. please try again";
      if (axios.isAxiosError(error)) {
        errorMessage =
          error.response?.data?.message || "Failed to deduct amount";
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }

      console.log("error deducting amount", errorMessage);

      return rejectWithValue(errorMessage);
    }
  }
);

const balanceSlice = createSlice({
  name: "balance",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBalance.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })

      .addCase(
        fetchBalance.fulfilled,
        (state, action: PayloadAction<number>) => {
          state.status = "succeeded";
          state.amount = action.payload;
          state.error= null
          //console.log('balance state', state)
        }
       
      )

      .addCase(fetchBalance.rejected, (state, action) => {
        state.status= "failed"
        state.amount = null
        state.error = (action.payload as string) || "failed to fetch balance";
      })

      .addCase(deductBalance.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })

      .addCase(
        deductBalance.fulfilled,
        (state, action: PayloadAction<number>) => {
          state.status = "succeeded";
          state.amount = action.payload;
          state.error= null
        }
      )

      .addCase(deductBalance.rejected, (state, action) => {
        state.status= "failed"
        state.amount = null
        state.error = (action.payload as string) || "failed to deduct balance";
      });
  },
});

export default balanceSlice.reducer;
