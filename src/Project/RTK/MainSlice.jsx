import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import {
  GoogleAuthProvider,
  FacebookAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../Firebase/Firebase";
import { signOut } from "firebase/auth";
import { sendPasswordResetEmail } from "firebase/auth";

const providerGoogle = new GoogleAuthProvider();
const providerFacebook = new FacebookAuthProvider();

export const fetchMeals = createAsyncThunk(
  "create/fetchMeals",
  async (_, thunkAPI) => {
    try {
      const res = await axios.get(
        "https://www.themealdb.com/api/json/v1/1/search.php?s="
      );
      localStorage.setItem("meals", JSON.stringify(res.data.meals));
      return res.data.meals;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);
const mealsSlice = createSlice({
  name: "meal",
  initialState: {
    meals: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMeals.pending, (state) => {
        state.loading = true;
        (state.error = null), (state.meals = []);
      })
      .addCase(fetchMeals.fulfilled, (state, action) => {
        (state.loading = false), (state.meals = action.payload);
      })
      .addCase(fetchMeals.rejected, (state, action) => {
        (state.loading = false),
          (state.error = action.payload || "Unknown Error");
      });
  },
});

export const fetchDrinks = createAsyncThunk(
  "create/fetchDrinks",
  async (_, thunkAPI) => {
    try {
      const res = await axios.get(
        "https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=Non_Alcoholic"
      );
      localStorage.setItem("drinks", JSON.stringify(res.data.drinks));
      return res.data.drinks;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);
const drinkSlice = createSlice({
  name: "drink",
  initialState: {
    meals: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDrinks.pending, (state) => {
        state.loading = true;
        (state.error = null), (state.meals = []);
      })
      .addCase(fetchDrinks.fulfilled, (state, action) => {
        (state.loading = false), (state.meals = action.payload);
      })
      .addCase(fetchDrinks.rejected, (state, action) => {
        (state.loading = false),
          (state.error = action.payload || "Unknown Error");
      });
  },
});

export const fetchSweets = createAsyncThunk(
  "create/fetchSweets",
  async (_, thunkAPI) => {
    try {
      const res = await axios.get(
        "https://www.themealdb.com/api/json/v1/1/filter.php?c=Dessert"
      );
      localStorage.setItem("sweets", JSON.stringify(res.data.meals));
      return res.data.meals;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);
const sweetSlice = createSlice({
  name: "sweet",
  initialState: {
    meals: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSweets.pending, (state) => {
        state.loading = true;
        (state.error = null), (state.meals = []);
      })
      .addCase(fetchSweets.fulfilled, (state, action) => {
        (state.loading = false), (state.meals = action.payload);
      })
      .addCase(fetchSweets.rejected, (state, action) => {
        (state.loading = false),
          (state.error = action.payload || "Unknown Error");
      });
  },
});

export const sweetsReducer = sweetSlice.reducer;

export const drinksReducer = drinkSlice.reducer;

export const mealsReducer = mealsSlice.reducer;

// Auth ///////////////////////////

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
      console.log("Google User:", user);
      localStorage.setItem("user", JSON.stringify(user));
      return user;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
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
        (state.error = null), (state.user = null);
      })
      .addCase(loginWithGoogle.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        localStorage.setItem("user", JSON.stringify(action.payload));
      })
      .addCase(loginWithGoogle.rejected, (state, action) => {
        (state.loading = false),
          (state.error = action.payload || "Unknown Error");
      });
  },
});

export const loginWithFacebook = createAsyncThunk(
  "create/facebook",
  async (_, thunkAPI) => {
    try {
      const result = await signInWithPopup(auth, providerFacebook);
      const user = result.user;
      localStorage.setItem("user", JSON.stringify(user));

      console.log("Facebook User:", user);
      return user;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

const facebookSlice = createSlice({
  name: "facebook",
  initialState: initialAuthState,
  reducers: {
    logout: (state) => {
      state.user = null;
      localStorage.removeItem("user");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginWithFacebook.pending, (state) => {
        state.loading = true;
        (state.error = null), (state.user = null);
      })
      .addCase(loginWithFacebook.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        localStorage.setItem("user", JSON.stringify(action.payload));
      })
      .addCase(loginWithFacebook.rejected, (state, action) => {
        (state.loading = false),
          (state.error = action.payload || "Unknown Error");
      });
  },
});

export const loginWithEmail = createAsyncThunk(
  "create/email",
  async ({ email, password }, thunkAPI) => {
    try {
      const result = await signInWithEmailAndPassword(
        auth,
        email.trim(),
        password.trim()
      );

      localStorage.setItem("user", JSON.stringify(result.user));
      console.log("Logged In User:", result.user);
      return result.user;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
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
        (state.error = null), (state.user = null);
      })
      .addCase(loginWithEmail.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        localStorage.setItem("user", JSON.stringify(action.payload)); // ✅ حفظ بعد login
      })
      .addCase(loginWithEmail.rejected, (state, action) => {
        (state.loading = false),
          (state.error = action.payload || "Unknown Error");
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
  }
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

export const emailReducer = emailSlice.reducer;

export const facebookReducer = facebookSlice.reducer;

export const googleReducer = googleSlice.reducer;

export const logout = () => async (dispatch) => {
  try {
    await signOut(auth);
  } catch (err) {
    console.log("Firebase signOut error:", err);
  }

  dispatch(googleSlice.actions.logout());
  dispatch(facebookSlice.actions.logout());
  dispatch(emailSlice.actions.logout());
  localStorage.removeItem("user");
};
