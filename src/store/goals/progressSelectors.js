import { createSelector } from "@reduxjs/toolkit";
import { selectTacticsByGoal } from "../tactics/tactics.reducer";
import { selectObstaclesByGoal } from "../obstacles/obstacles.reducer";
import { selectGoalsByQuarter } from "./goals.reducer";

/** % of tactics completed (0–100) */
export const selectTacticCompletionPercent = (state, goalId) => {
  const all = selectTacticsByGoal(state, goalId);
  if (!all.length) return 0;
  const done = all.filter((t) => t.isCompleted).length;
  return Math.round((done / all.length) * 100);
};

/** count of obstacles overcome */
export const selectOverallObstacleCount = (state, goalId) =>
  selectObstaclesByGoal(state, goalId).filter((o) => o.isOvercome).length;

export const selectGoalOverallPercent = createSelector(
  [
    (state, goalId) => selectTacticsByGoal(state, goalId),
    (state, goalId) => selectObstaclesByGoal(state, goalId),
  ],
  (tactics, obstacles) => {
    const total = tactics.length + obstacles.length;
    if (total === 0) return 0;
    const done =
      tactics.filter((t) => t.isCompleted).length +
      obstacles.filter((o) => o.isOvercome).length;
    return Math.round((done / total) * 100);
  }
);

/**
 * Returns an object mapping goalId → its overall percent,
 * for every goal in a given quarter.
 * Memoized so it only recomputes when the goals or their percents change.
 */
export const selectGoalPercentsByQuarter = createSelector(
  [
    // 1) the list of goals in this quarter
    (state, quarterId) => selectGoalsByQuarter(state, quarterId),
    // 2) the quarterId itself (to include in memo cache key)
    (_state, quarterId) => quarterId,
    // 3) the full state, needed to compute each goal's percent
    (state) => state,
  ],
  (goals, _qId, state) => {
    const acc = {};
    for (const g of goals) {
      acc[g.id] = selectGoalOverallPercent(state, g.id);
    }
    return acc;
  }
);
