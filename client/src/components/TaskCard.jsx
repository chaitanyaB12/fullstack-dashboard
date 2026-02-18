import { useRef, useEffect } from "react";

const TaskCard = ({
  task,
  editingId,
  setEditingId,
  editTitle,
  setEditTitle,
  update,
  del
}) => {
  const ref = useRef(null);

  // Close edit mode on outside click
  useEffect(() => {
    const handler = (e) => {
      if (
        editingId === task._id &&
        ref.current &&
        !ref.current.contains(e.target)
      ) {
        setEditingId(null);
        setEditTitle("");
      }
    };

    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [editingId, task._id, setEditingId, setEditTitle]);

  return (
    <div
      ref={ref}
      className="bg-white/90 backdrop-blur rounded-xl shadow-md border border-gray-200 p-5 hover:shadow-lg transition"
    >
      {editingId === task._id ? (
        <div className="flex flex-col gap-3">
          <input
            className="border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            autoFocus
          />

          <div className="flex justify-end gap-3">
            <button
              onClick={() => update(task._id)}
              className="bg-black text-white px-4 py-1 rounded hover:bg-gray-800"
            >
              Save
            </button>

            <button
              onClick={() => {
                setEditingId(null);
                setEditTitle("");
              }}
              className="border px-4 py-1 rounded hover:bg-gray-100"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <>
          <p className="text-gray-800 mb-4 wrap-break-words font-medium">
            {task.title}
          </p>

          <div className="flex justify-end gap-3">
            <button
              onClick={() => {
                setEditingId(task._id);
                setEditTitle(task.title);
              }}
              className="text-sm border px-4 py-1 rounded hover:bg-gray-100"
            >
              Edit
            </button>

            <button
              onClick={() => del(task._id)}
              className="text-sm border border-red-400 text-red-500 px-4 py-1 rounded hover:bg-red-50"
            >
              Delete
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default TaskCard;
