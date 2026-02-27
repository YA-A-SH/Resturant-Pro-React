import { configureStore } from "@reduxjs/toolkit";
import { mealsReducer, drinksReducer, sweetsReducer } from "./Dishe'sSlice";
import {
  googleReducer,
  // facebookReducer,
  emailReducer,
  resetReducer,
} from "./LogSlice";
import { usersReducer } from "./ElseSlice";
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
