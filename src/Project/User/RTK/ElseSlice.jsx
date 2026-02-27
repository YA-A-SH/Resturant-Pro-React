import { createSelector, createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchFakeUser = createAsyncThunk(
  "create/fetchUsers",
  async (_, thunkAPI) => {
    try {
      const res = await axios.get("https://jsonplaceholder.typicode.com/users");

      const user = res.data.map((u) => ({
        id: u.id,
        name: u.name,
        gender: "N/A",
        email: u.email,
        phone: u.phone,
        city: u.address.city,
        image: `https://i.pravatar.cc/150?u=${u.id}`,
        isBlocked: false,
        isVerified: false,
      }));

      return user;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  },
);

const usersSlice = createSlice({
  name: "user",
  initialState: {
    users: [],
    loading: false,
    error: null,
  },
  reducers: {
    toggleVerified: (state, action) => {
      const userId = action.payload;
      const user = state.users.find((user) => user.id === userId);
      if (user) {
        user.isVerified = !user.isVerified;
      }
    },
    toggleBlocked: (state, action) => {
      const userId = action.payload;
      const user = state.users.find((user) => user.id === userId);
      if (user) {
        user.isBlocked = !user.isBlocked;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFakeUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFakeUser.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchFakeUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Unknown Error";
      });
  },
});

export const usersReducer = usersSlice.reducer;
export const { toggleVerified, toggleBlocked } = usersSlice.actions;

const selectUsers = (state) => state.users;
export const selectUserData = createSelector(
  [selectUsers],
  (user) => user.users,
);
export const selectUserLoading = createSelector(
  [selectUsers],
  (user) => user.loading,
);
export const selectUserError = createSelector(
  [selectUsers],
  (user) => user.error,
);
export const selectUserById = createSelector(
  [selectUserData, (state, userId) => userId],
  (users, userId) => users.find((u) => u.id === userId),
);

