// src/features/tactics/hooks.js

import { useDispatch, useSelector } from "react-redux";
import {
  addTactic,
  updateTactic,
  removeTactic,
  toggleTactic,
  selectTacticsByGoal,
  selectTacticById,
} from "../store/tactics/tactics.reducer";

export function useTactics(goalId) {
  const dispatch = useDispatch();

  // ← import and use the selector here
  const tactics = useSelector((state) => selectTacticsByGoal(state, goalId));

  const createTactic = (title) => dispatch(addTactic({ goalId, title }));

  const editTactic = (id, changes) => dispatch(updateTactic({ id, changes }));

  const deleteTactic = (id) => dispatch(removeTactic(id));

  const flipTactic = (id) => dispatch(toggleTactic(id));

  const getTactic = (id) => useSelector((state) => selectTacticById(state, id));

  return {
    tactics,
    createTactic,
    editTactic,
    deleteTactic,
    flipTactic,
    getTactic,
  };
}
