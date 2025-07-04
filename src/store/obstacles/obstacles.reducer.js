import {
  createSlice,
  createEntityAdapter,
  createSelector,
  nanoid,
} from "@reduxjs/toolkit";

const obstaclesAdaptor = createEntityAdapter({
  selectId: (obstacle) => obstacle.id,
});

const INITIAL_STATE = obstaclesAdaptor.getInitialState();

const obstaclesSlice = createSlice({
  name: "obstacles",
  initialState: INITIAL_STATE,
  reducers: {
    addObstacle: {
      reducer: obstaclesAdaptor.addOne,
      prepare: ({ goalId, description, tacticId = null }) => ({
        payload: {
          id: nanoid(),
          goalId,
          description,
          tacticId,
          isOvercome: false,
        },
      }),
    },
    updateObstacle: obstaclesAdaptor.updateOne,
    removeObstacle: obstaclesAdaptor.removeOne,
    /** payload: { id } */
    toggleObstacle: (state, { payload: id }) => {
      const o = state.entities[id];
      if (o) o.isOvercome = !o.isOvercome;
    },
  },
});

export const { addObstacle, updateObstacle, removeObstacle, toggleObstacle } =
  obstaclesSlice.actions;

export const obstacleReducer = obstaclesSlice.reducer;

export const { selectAll: selectAllObstacles, selectById: selectObstacleById } =
  obstaclesAdaptor.getSelectors((state) => state.obstacles);

/** Selector: obstacles for a specific goal */
export const selectObstaclesByGoal = createSelector(
  [selectAllObstacles, (_state, goalId) => goalId],
  (all, goalId) => all.filter((o) => o.goalId === goalId)
);
