import {
  createSlice,
  createEntityAdapter,
  createSelector,
  nanoid,
} from "@reduxjs/toolkit";

const tacticsAdapter = createEntityAdapter({
  selectId: (tactic) => tactic.id,
});

const INITIAL_STATE = tacticsAdapter.getInitialState();

const tacticsSlice = createSlice({
  name: "tactics",
  initialState: INITIAL_STATE,
  reducers: {
    /** payload: { goalId, title } */
    addTactic: {
      reducer: tacticsAdapter.addOne,
      prepare: ({ goalId, title }) => ({
        payload: {
          id: nanoid(),
          goalId,
          title,
          isCompleted: false,
        },
      }),
    },

    /** payload: { id, changes } */
    updateTactic: tacticsAdapter.updateOne,

    /** payload: id */
    removeTactic: tacticsAdapter.removeOne,

    /** payload: id */
    toggleTactic: (state, { payload: id }) => {
      const t = state.entities[id];
      if (t) t.isCompleted = !t.isCompleted;
    },
  },
});

export const { addTactic, updateTactic, removeTactic, toggleTactic } =
  tacticsSlice.actions;

export const tacticsReducer = tacticsSlice.reducer;

export const { selectAll: selectAllTactics, selectById: selectTacticById } =
  tacticsAdapter.getSelectors((state) => state.tactics);

/** Selector: tactics for a specific goal */
export const selectTacticsByGoal = createSelector(
  [selectAllTactics, (_state, goalId) => goalId],
  (all, goalId) => all.filter((t) => t.goalId === goalId)
);
