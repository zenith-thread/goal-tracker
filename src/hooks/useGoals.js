import { useDispatch, useSelector } from "react-redux";
import {
  addGoal,
  updateGoal,
  removeGoal,
  selectGoalsByQuarter,
  selectGoalById,
} from "../store/goals/goals.reducer";

export function useGoals(quarterId) {
  const dispatch = useDispatch();
  const goals = useSelector((state) => selectGoalsByQuarter(state, quarterId));

  const createGoal = ({ id, quarterId, title, description, deadline }) =>
    dispatch(
      addGoal({
        id,
        quarterId,
        title,
        description,
        deadline,
        status: "in progress",
      })
    );

  const editGoal = ({ id, changes }) => dispatch(updateGoal({ id, changes }));

  const deleteGoal = (id) => dispatch(removeGoal(id));

  const getGoal = (id) => useSelector((state) => selectGoalById(state, id));

  return {
    goals,
    createGoal,
    editGoal,
    deleteGoal,
    getGoal,
  };
}
