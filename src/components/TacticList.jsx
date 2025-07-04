import { useState } from "react";
import { useTactics } from "../hooks/useTactics";
import { selectTacticCompletionPercent } from "../store/goals/progressSelectors";
import { useSelector } from "react-redux";
import NotesSection from "./NotesSection";

export default function TacticList({ goalId }) {
  const { tactics, createTactic, flipTactic, deleteTactic, editTactic } =
    useTactics(goalId);
  const [newTitle, setNewTitle] = useState("");
  const [editingTacticId, setEditingTacticId] = useState(null);
  const [editTacticTitle, setEditTacticTitle] = useState("");
  const percent = useSelector((state) =>
    selectTacticCompletionPercent(state, goalId)
  );

  const handleAdd = () => {
    if (!newTitle) return;
    createTactic(newTitle);
    setNewTitle("");
  };

  const handleSaveEdit = (tacticId) => {
    if (!editTacticTitle) return;
    editTactic(tacticId, { title: editTacticTitle });
    setEditingTacticId(null);
  };

  return (
    <div className="mb-3">
      <p className="text-sm">Tactics ({percent}% done)</p>
      {tactics.map((t) => (
        <div key={t.id} className="mb-2 border p-2">
          {editingTacticId === t.id ? (
            <div className="flex items-center space-x-2">
              <input
                type="text"
                className="border p-1 flex-1"
                value={editTacticTitle}
                onChange={(e) => setEditTacticTitle(e.target.value)}
              />
              <button
                className="bg-green-500 text-white px-2"
                onClick={() => handleSaveEdit(t.id)}
              >
                Save
              </button>
              <button
                className="text-gray-500"
                onClick={() => setEditingTacticId(null)}
              >
                Cancel
              </button>
            </div>
          ) : (
            <div className="flex items-center justify-between">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={t.isCompleted}
                  onChange={() => flipTactic(t.id)}
                />
                <span className={t.isCompleted ? "line-through" : ""}>
                  {t.title}
                </span>
              </label>
              <div className="space-x-2">
                <button
                  className="text-blue-500"
                  onClick={() => {
                    setEditingTacticId(t.id);
                    setEditTacticTitle(t.title);
                  }}
                >
                  Edit
                </button>
                <button
                  className="text-red-500"
                  onClick={() => deleteTactic(t.id)}
                >
                  ✕
                </button>
              </div>
            </div>
          )}
          <NotesSection tacticId={t.id} />
        </div>
      ))}

      <div className="flex space-x-2 mt-1">
        <input
          className="border p-1 flex-1"
          placeholder="New tactic"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
        />
        <button className="bg-gray-700 text-white px-2" onClick={handleAdd}>
          Add
        </button>
      </div>
    </div>
  );
}
