import { useState } from "react";
import { useObstacles } from "../hooks/useObstacles";
import { selectOverallObstacleCount } from "../store/goals/progressSelectors";
import { useSelector } from "react-redux";

export default function ObstacleList({ goalId }) {
  const {
    obstacles,
    createObstacle,
    flipObstacle,
    deleteObstacle,
    editObstacle,
  } = useObstacles(goalId);
  const [desc, setDesc] = useState("");
  const [editingObstacleId, setEditingObstacleId] = useState(null);
  const [editObstacleDesc, setEditObstacleDesc] = useState("");
  const count = useSelector((state) =>
    selectOverallObstacleCount(state, goalId)
  );

  const handleAdd = () => {
    if (!desc) return;
    createObstacle(desc);
    setDesc("");
  };

  const handleSaveEdit = (obstacleId) => {
    if (!editObstacleDesc) return;
    editObstacle(obstacleId, { description: editObstacleDesc });
    setEditingObstacleId(null);
  };

  return (
    <div>
      <p className="text-sm">Obstacles overcome: {count}</p>
      <ul className="pl-4 list-disc space-y-1">
        {obstacles.map((o) => (
          <li key={o.id} className="flex items-center space-x-2">
            {editingObstacleId === o.id ? (
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  className="border p-1 flex-1"
                  value={editObstacleDesc}
                  onChange={(e) => setEditObstacleDesc(e.target.value)}
                />
                <button
                  className="bg-green-500 text-white px-2"
                  onClick={() => handleSaveEdit(o.id)}
                >
                  Save
                </button>
                <button
                  className="text-gray-500"
                  onClick={() => setEditingObstacleId(null)}
                >
                  Cancel
                </button>
              </div>
            ) : (
              <>
                <input
                  type="checkbox"
                  checked={o.isOvercome}
                  onChange={() => flipObstacle(o.id)}
                />
                <span className={o.isOvercome ? "line-through" : ""}>
                  {o.description}
                </span>
                <button
                  className="text-blue-500"
                  onClick={() => {
                    setEditingObstacleId(o.id);
                    setEditObstacleDesc(o.description);
                  }}
                >
                  Edit
                </button>
                <button
                  className="text-red-500 text-sm"
                  onClick={() => deleteObstacle(o.id)}
                >
                  ✕
                </button>
              </>
            )}
          </li>
        ))}
      </ul>
      <div className="flex space-x-2 mt-1">
        <input
          className="border p-1 flex-1"
          placeholder="New obstacle"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        />
        <button className="bg-gray-700 text-white px-2" onClick={handleAdd}>
          Add
        </button>
      </div>
    </div>
  );
}
