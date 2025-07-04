import { useState, useEffect } from "react";

const NoteItem = ({ note, editNote, deleteNote }) => {
  const [localText, setLocalText] = useState(note.text);

  // 1. Sync if external text changes
  useEffect(() => {
    if (note.text !== localText) {
      setLocalText(note.text);
    }
  }, [note.text]);

  // 2. Debounce dispatch of editNote
  useEffect(() => {
    const handler = setTimeout(() => {
      if (localText !== note.text) {
        editNote(note.id, localText);
      }
    }, 300);

    return () => clearTimeout(handler);
  }, [localText, note.id, note.text, editNote]);

  return (
    <li className="flex items-start space-x-2">
      <textarea
        className="border p-1 flex-1"
        value={localText}
        onChange={(e) => setLocalText(e.target.value)}
      />
      <button
        className="text-red-500 self-start"
        onClick={() => deleteNote(note.id)}
      >
        ✕
      </button>
    </li>
  );
};

export default NoteItem;
