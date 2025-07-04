import { selectGoalsByQuarter } from "../goals/goals.reducer";
import { selectTacticsByGoal } from "../tactics/tactics.reducer";
import { selectObstaclesByGoal } from "../obstacles/obstacles.reducer";

export const selectQuarterOverallPercent = (state, quarterId) => {
  const goals = selectGoalsByQuarter(state, quarterId);
  let doneCount = 0,
    totalCount = 0;

  goals.forEach((goal) => {
    const tacs = selectTacticsByGoal(state, goal.id);
    const obs = selectObstaclesByGoal(state, goal.id);

    doneCount += tacs.filter((tac) => tac.isCompleted).length;
    doneCount += obs.filter((ob) => ob.isOvercome).length;

    totalCount += tacs.length + obs.length;
  });

  if (totalCount === 0) return 0;
  return Math.round((doneCount / totalCount) * 100);
};
