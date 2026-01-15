import { configureStore } from "@reduxjs/toolkit";
import {
  mealsReducer,
  drinksReducer,
  sweetsReducer,
  googleReducer,
  // facebookReducer,
  usersReducer,
  emailReducer,
  resetReducer,
} from "./MainSlice";
export const store = configureStore({
  reducer: {
    meals: mealsReducer,
    drinks: drinksReducer,
    sweet: sweetsReducer,
    google: googleReducer,
    // facebook: facebookReducer,
    email: emailReducer,
    reset: resetReducer,
    users: usersReducer,
  },
});
