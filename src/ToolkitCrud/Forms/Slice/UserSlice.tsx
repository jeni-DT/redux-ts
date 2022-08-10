import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {};

interface stateModel {
  loading?: boolean;
  users?: any;
  error?: string;
}

export const fetchUsers = createAsyncThunk("user/fetchUsers", async () => {
  return await axios
    .get("http://localhost:8000/Booking")
    .then((response) => response.data);
});
export const addUsers: any = createAsyncThunk(
  "user.addUsers",
  (collections) => {
    return axios
      .post("http://localhost:8000/Booking", collections)
      .then((response) => response.data);
  }
);
export const deleteUsers: any = createAsyncThunk(
  "user/deleteUsers",
  async (deleted, { dispatch }) => {
    return axios
      .delete(`http://localhost:8000/Booking/${deleted}`)
      .then((response) => {
        dispatch(fetchUsers());
      });
  }
);
export const editUsers: any = createAsyncThunk(
  "user/editUsers",
  (changes: any) => {
    return axios
      .put(`http://localhost:8000/Booking/${changes.id}`, changes)
      .then((response) => response.data);
  }
);

const userSlice: any = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.pending, (state: stateModel) => {
      state.loading = true;
    });
    builder.addCase(fetchUsers.fulfilled, (state: stateModel, action) => {
      state.loading = false;
      state.users = action.payload;
      state.error = "";
    });
    builder.addCase(fetchUsers.rejected, (state: stateModel, action) => {
      state.loading = false;
      state.users = [];
      state.error = action.error.message;
    });
  },
});
export default userSlice;
