import { configureStore } from "@reduxjs/toolkit";
import auth from "./authSlice";
import posts from "./postSlice";

const store = configureStore({

    reducer:{posts,auth},
}
)

export default store;
