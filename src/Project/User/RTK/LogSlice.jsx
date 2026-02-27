import {
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../Firebase/Firebase";
import { signOut } from "firebase/auth";
import { sendPasswordResetEmail } from "firebase/auth";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const providerGoogle = new GoogleAuthProvider();

const storedUser = JSON.parse(localStorage.getItem("user"));

const initialAuthState = {
  user: storedUser || null,
  loading: false,
  error: null,
};

export const loginWithGoogle = createAsyncThunk(
  "create/google",
  async (_, thunkAPI) => {
    try {
      const result = await signInWithPopup(auth, providerGoogle);
      const user = result.user;
      localStorage.setItem("user", JSON.stringify(user));
      return user;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  },
);

const googleSlice = createSlice({
  name: "google",
  initialState: initialAuthState,
  reducers: {
    logout: (state) => {
      state.user = null;
      localStorage.removeItem("user");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginWithGoogle.pending, (state) => {
        state.loading = true;
        ((state.error = null), (state.user = null));
      })
      .addCase(loginWithGoogle.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        localStorage.setItem("user", JSON.stringify(action.payload));
      })
      .addCase(loginWithGoogle.rejected, (state, action) => {
        ((state.loading = false),
          (state.error = action.payload || "Unknown Error"));
      });
  },
});

// export const loginWithFacebook = createAsyncThunk(
//   "create/facebook",
//   async (_, thunkAPI) => {
//     try {
//       const result = await signInWithPopup(auth, providerFacebook);
//       const user = result.user;
//       localStorage.setItem("user", JSON.stringify(user));

//       console.log("Facebook User:", user);
//       return user;
//     } catch (err) {
//       return thunkAPI.rejectWithValue(err.message);
//     }
//   }
// );

// const facebookSlice = createSlice({
//   name: "facebook",
//   initialState: initialAuthState,
//   reducers: {
//     logout: (state) => {
//       state.user = null;
//       localStorage.removeItem("user");
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(loginWithFacebook.pending, (state) => {
//         state.loading = true;
//         (state.error = null), (state.user = null);
//       })
//       .addCase(loginWithFacebook.fulfilled, (state, action) => {
//         state.loading = false;
//         state.user = action.payload;
//         localStorage.setItem("user", JSON.stringify(action.payload));
//       })
//       .addCase(loginWithFacebook.rejected, (state, action) => {
//         (state.loading = false),
//           (state.error = action.payload || "Unknown Error");
//       });
//   },
// });

export const loginWithEmail = createAsyncThunk(
  "create/email",
  async ({ email, password }, thunkAPI) => {
    try {
      const result = await signInWithEmailAndPassword(
        auth,
        email.trim(),
        password.trim(),
      );

      localStorage.setItem("user", JSON.stringify(result.user));

      return result.user;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

const emailSlice = createSlice({
  name: "email",
  initialState: initialAuthState,
  reducers: {
    logout: (state) => {
      state.user = null;
      localStorage.removeItem("user");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginWithEmail.pending, (state) => {
        state.loading = true;
        ((state.error = null), (state.user = null));
      })
      .addCase(loginWithEmail.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        localStorage.setItem("user", JSON.stringify(action.payload)); // ✅ حفظ بعد login
      })
      .addCase(loginWithEmail.rejected, (state, action) => {
        ((state.loading = false),
          (state.error = action.payload || "Unknown Error"));
      });
  },
});

export const resetPassword = createAsyncThunk(
  "auth/resetPassword",
  async (email, thunkAPI) => {
    try {
      await sendPasswordResetEmail(auth, email.trim());
      return "Reset email sent";
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);
const resetSlice = createSlice({
  name: "reset",
  initialState: {
    loading: false,
    success: false,
    error: null,
  },
  reducers: {
    clearResetState: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(resetPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(resetPassword.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const resetReducer = resetSlice.reducer;
export const { clearResetState } = resetSlice.actions;

const resetSelect = (state) => state.reset;

export const resetSuccessSelector = createSelector([resetSelect], (resent) => {
  return resent.success;
});

export const resetLoadingSelector = createSelector([resetSelect], (resent) => {
  return resent.loading;
});
export const resetErrorSelector = createSelector([resetSelect], (resent) => {
  return resent.error;
});

export const emailReducer = emailSlice.reducer;

// export const facebookReducer = facebookSlice.reducer;

export const googleReducer = googleSlice.reducer;

export const logout = () => async (dispatch) => {
  try {
    await signOut(auth);

    localStorage.setItem("isAdmin", false);
  } catch (err) {
    console.log("Firebase signOut error:", err);
  }

  dispatch(googleSlice.actions.logout());
  // dispatch(facebookSlice.actions.logout());
  dispatch(emailSlice.actions.logout());
  localStorage.removeItem("user");
};

import { createSelector } from "@reduxjs/toolkit";

const selectGoogleAuth = (state) => state.google;
const selectEmailAuth = (state) => state.email;

export const selectCurrentUser = createSelector(
  [selectGoogleAuth, selectEmailAuth],
  (google, email) => {
    return google.user || email.user || null;
  },
);

export const selectAuthLoading = createSelector(
  [selectGoogleAuth, selectEmailAuth],
  (google, email) => google.loading || email.loading,
);
export const selectAuthError = createSelector(
  [selectGoogleAuth, selectEmailAuth],
  (google, email) => google.error || email.error,
);
