import {
  createSlice,
  createEntityAdapter,
  createSelector,
} from "@reduxjs/toolkit";

const goalsAdaptor = createEntityAdapter({
  selectId: (goal) => goal.id,
  sortComparer: (a, b) => new Date(a.deadline) - new Date(b.deadline),
});

const INITIAL_STATE = goalsAdaptor.getInitialState();

const goalsSlice = createSlice({
  name: "goals",
  initialState: INITIAL_STATE,
  reducers: {
    addGoal: goalsAdaptor.addOne,
    updateGoal: goalsAdaptor.updateOne,
    removeGoal: goalsAdaptor.removeOne,
  },
});

export const { addGoal, updateGoal, removeGoal } = goalsSlice.actions;

export const goalsReducer = goalsSlice.reducer;

export const {
  selectAll: selectAllGoals,
  selectById: selectGoalById,
  selectEntities: selectGoalEntities,
} = goalsAdaptor.getSelectors((state) => state.goals);

/** Selector: all goals belonging to a quarter */
export const selectGoalsByQuarter = createSelector(
  [selectAllGoals, (_state, quarterId) => quarterId],
  (allGoals, quarterId) => allGoals.filter((g) => g.quarterId === quarterId)
);
