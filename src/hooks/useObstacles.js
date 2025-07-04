import { useDispatch, useSelector } from "react-redux";
import {
  addObstacle,
  updateObstacle,
  removeObstacle,
  toggleObstacle,
  selectObstaclesByGoal,
  selectObstacleById,
} from "../store/obstacles/obstacles.reducer";

export function useObstacles(goalId) {
  const dispatch = useDispatch();
  const obstacles = useSelector((state) =>
    selectObstaclesByGoal(state, goalId)
  );

  const createObstacle = (description, tacticId = null) =>
    dispatch(addObstacle({ goalId, description, tacticId }));

  const editObstacle = (id, changes) =>
    dispatch(updateObstacle({ id, changes }));

  const deleteObstacle = (id) => dispatch(removeObstacle(id));

  const flipObstacle = (id) => dispatch(toggleObstacle(id));

  const getObstacle = (id) =>
    useSelector((state) => selectObstacleById(state, id));

  return {
    obstacles,
    createObstacle,
    editObstacle,
    deleteObstacle,
    flipObstacle,
    getObstacle,
  };
}
