// src/store/theme/themeSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mode: "light", // or "dark"
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleThemeMode: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
    setThemeMode: (state, action) => {
      state.mode = action.payload; // "light" or "dark"
    },
  },
});

export const { toggleThemeMode, setThemeMode } = themeSlice.actions;

export const themeReducer = themeSlice.reducer;
