import { createSelector, createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// const providerFacebook = new FacebookAuthProvider();

export const fetchMeals = createAsyncThunk(
  "create/fetchMeals",
  async (_, thunkAPI) => {
    try {
      const res = await axios.get(
        "https://www.themealdb.com/api/json/v1/1/search.php?s=",
      );
      localStorage.setItem("meals", JSON.stringify(res.data.meals));
      return res.data.meals;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  },
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
        ((state.error = null), (state.meals = []));
      })
      .addCase(fetchMeals.fulfilled, (state, action) => {
        ((state.loading = false), (state.meals = action.payload));
      })
      .addCase(fetchMeals.rejected, (state, action) => {
        ((state.loading = false),
          (state.error = action.payload || "Unknown Error"));
      });
  },
});

export const fetchDrinks = createAsyncThunk(
  "create/fetchDrinks",
  async (_, thunkAPI) => {
    try {
      const res = await axios.get(
        "https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=Non_Alcoholic",
      );
      localStorage.setItem("drinks", JSON.stringify(res.data.drinks));
      return res.data.drinks;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  },
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
        ((state.error = null), (state.meals = []));
      })
      .addCase(fetchDrinks.fulfilled, (state, action) => {
        ((state.loading = false), (state.meals = action.payload));
      })
      .addCase(fetchDrinks.rejected, (state, action) => {
        ((state.loading = false),
          (state.error = action.payload || "Unknown Error"));
      });
  },
});

export const fetchSweets = createAsyncThunk(
  "create/fetchSweets",
  async (_, thunkAPI) => {
    try {
      const res = await axios.get(
        "https://www.themealdb.com/api/json/v1/1/filter.php?c=Dessert",
      );
      localStorage.setItem("sweets", JSON.stringify(res.data.meals));
      return res.data.meals;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  },
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
        ((state.error = null), (state.meals = []));
      })
      .addCase(fetchSweets.fulfilled, (state, action) => {
        ((state.loading = false), (state.meals = action.payload));
      })
      .addCase(fetchSweets.rejected, (state, action) => {
        ((state.loading = false),
          (state.error = action.payload || "Unknown Error"));
      });
  },
});

export const sweetsReducer = sweetSlice.reducer;

export const drinksReducer = drinkSlice.reducer;

export const mealsReducer = mealsSlice.reducer;

const selectMeals = (state) => state.meals;
const selectDrinks = (state) => state.drinks;
const selectSweets = (state) => state.sweet;

export const mealsDataSelector = createSelector([selectMeals], (meals) => {
  return meals.meals;
});
export const mealsLoadingSelector = createSelector([selectMeals], (meals) => {
  return meals.loading;
});
export const mealsErrorSelector = createSelector([selectMeals], (meals) => {
  return meals.error;
});

export const drinksDataSelector = createSelector([selectDrinks], (drinks) => {
  return drinks.meals;
});
export const drinksLoadingSelector = createSelector(
  [selectDrinks],
  (drinks) => {
    return drinks.loading;
  },
);
export const drinksErrorSelector = createSelector([selectDrinks], (drinks) => {
  return drinks.error;
});
export const sweetsDataSelector = createSelector([selectSweets], (sweets) => {
  return sweets.meals;
});
export const sweetsLoadingSelector = createSelector(
  [selectSweets],
  (sweets) => {
    return sweets.loading;
  },
);
export const sweetsErrorSelector = createSelector([selectSweets], (sweets) => {
  return sweets.error;
});
