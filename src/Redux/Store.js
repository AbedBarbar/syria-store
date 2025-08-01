import { configureStore } from "@reduxjs/toolkit";

import menuReducer from "./MenuSlice";



const store = configureStore({
  reducer: {
    menu:menuReducer
  }
});



export default  store ;
