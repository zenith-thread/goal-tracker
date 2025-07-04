import { useState } from "react";
import { useNotes } from "../hooks/useNotes";

import NoteItem from "./NoteItem";

const NotesSection = ({ tacticId }) => {
  const { notes, createNote, editNote, deleteNote } = useNotes(tacticId);
  const [draft, setDraft] = useState("");

  return (
    <div className="mt-2 pl-6">
      <p className="text-sm font-semibold">Notes:</p>

      <ul className="space-y-2 mb-2">
        {notes.map((note) => (
          <NoteItem
            key={note.id}
            note={note}
            deleteNote={deleteNote}
            editNote={(id, text) => {
              /* passed into the debounced effect */
              editNote(id, text);
            }}
          />
        ))}
      </ul>

      <div className="flex space-x-2">
        <input
          className="border p-1 flex-1"
          placeholder="New note"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
        />
        <button
          className="bg-blue-500 text-white px-2"
          onClick={() => {
            createNote(draft);
            setDraft("");
          }}
        >
          Add Note
        </button>
      </div>
    </div>
  );
};

export default NotesSection;
