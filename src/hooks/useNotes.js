import { useDispatch, useSelector } from "react-redux";
import {
  addNote,
  updateNote,
  removeNote,
  selectNotesByTactic,
  selectNoteById,
} from "../store/notes/notes.reducer";

export function useNotes(tacticId) {
  const dispatch = useDispatch();
  const notes = useSelector((state) => selectNotesByTactic(state, tacticId));

  const createNote = (text) => dispatch(addNote({ tacticId, text }));

  const editNote = (id, text) =>
    dispatch(updateNote({ id, changes: { text } }));

  const deleteNote = (id) => dispatch(removeNote(id));

  const getNote = (id) => useSelector((state) => selectNoteById(state, id));

  return {
    notes,
    createNote,
    editNote,
    deleteNote,
    getNote,
  };
}
