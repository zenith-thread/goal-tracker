import { combineReducers } from "@reduxjs/toolkit";

// reducers
import { quartersReducer } from "./quarters/quarters.reducer";
import { tacticsReducer } from "./tactics/tactics.reducer";
import { goalsReducer } from "./goals/goals.reducer";
import { obstacleReducer } from "./obstacles/obstacles.reducer";
import { notesReducer } from "./notes/notes.reducer";
import { themeReducer } from "./theme/theme.reducer";

export const rootReducer = combineReducers({
  quarters: quartersReducer,
  goals: goalsReducer,
  tactics: tacticsReducer,
  obstacles: obstacleReducer,
  notes: notesReducer,
  theme: themeReducer,
});
