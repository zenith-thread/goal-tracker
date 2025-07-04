import {
  createEntityAdapter,
  createSlice,
  createSelector,
  nanoid,
} from "@reduxjs/toolkit";

const notesAdapter = createEntityAdapter({
  selectId: (note) => note.id,
  sortComparer: (a, b) => new Date(a.createdAt) - new Date(b.createdAt),
});

const notesSlice = createSlice({
  name: "notes",
  initialState: notesAdapter.getInitialState(),
  reducers: {
    /** payload: { tacticId, text, tags? } */
    addNote: {
      reducer: notesAdapter.addOne,
      prepare({ tacticId, text, tags = [] }) {
        return {
          payload: {
            id: nanoid(),
            tacticId,
            text,
            tags,
            createdAt: new Date().toISOString(),
          },
        };
      },
    },
    updateNote: notesAdapter.updateOne, // payload: { id, changes: { text, tags } }
    removeNote: notesAdapter.removeOne, // payload: id
  },
});

export const { addNote, updateNote, removeNote } = notesSlice.actions;
export const notesReducer = notesSlice.reducer;

export const {
  selectAll: selectAllNotes,
  selectById: selectNoteById,
  selectEntities: selectNoteEntities,
} = notesAdapter.getSelectors((state) => state.notes);

/** Selector: all notes for one tactic */
export const selectNotesByTactic = createSelector(
  [selectAllNotes, (_state, tacticId) => tacticId],
  (allNotes, tacticId) => allNotes.filter((n) => n.tacticId === tacticId)
);
