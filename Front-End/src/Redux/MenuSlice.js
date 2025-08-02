import { createSlice } from "@reduxjs/toolkit";

//Checks for expired items in localStorage
function getWithExpiry(key) {
  const itemStr = localStorage.getItem(key);
  if (!itemStr) {
    // If the item doesn't exist, return null
    return null;
  }

  const item = JSON.parse(itemStr);
  const now = new Date();

  if (now.getTime() > item.expiry) {
    // If the item has expired, remove it and return null
    localStorage.removeItem(key);
    return null;
  }

  // Otherwise, return the item's value
  return item.value;
}


export const menuSlice = createSlice({
  name: "menu",
  initialState: {
    isOpen: false,
    showLog: false,
    registered: getWithExpiry("registered") || false,
    accountState: "Login",
  },
  reducers: {
    toggleMenu: (state) => {
      state.isOpen = !state.isOpen;
    },
    toggleShowLog: (state) => {
      state.showLog = !state.showLog;
    },
    toggleRegistered: (state) => {
      state.registered = !state.registered;
      const now = new Date();
      const item = {
        value: state.registered,
        expiry: now.getTime() + 3600000,
      };
      localStorage.setItem("registered", JSON.stringify(item));
    },
    toggleAccountState: (state) => {
      state.accountState =
        state.accountState === "Login" ? "Register" : "Login";
    },
  },
});
export const { toggleMenu, toggleShowLog, toggleRegistered, toggleAccountState } =
  menuSlice.actions;
export default menuSlice.reducer;
