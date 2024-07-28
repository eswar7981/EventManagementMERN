import { configureStore } from "@reduxjs/toolkit";
import UserReducer from "./User";

const store = configureStore({
  reducer: {
    user: UserReducer,
  },
});

export default store;