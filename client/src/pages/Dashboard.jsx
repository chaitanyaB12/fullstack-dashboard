import { useState, useEffect, useContext } from "react";
import api from "../api/axios";
import Navbar from "../components/NavBar";
import { AuthContext } from "../context/AuthContext";
import TaskCard from "../components/TaskCard";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const { token } = useContext(AuthContext);
  const nav = useNavigate();


  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState("");

  useEffect(() => {
    if (!token) return;

    api
      .get("/tasks", { headers: { authorization: token } })
      .then((res) => setTasks(res.data));
  }, [token]);

  const add = async () => {
      if (!token) {
        nav("/login");
        return;
      }
    
      if (!title.trim()) return;
    
      const res = await api.post(
        "/tasks",
        { title },
        { headers: { authorization: token } }
      );

  setTasks([...tasks, res.data]);
  setTitle("");
};


 const del = async (id) => {
  if (!token) {
    nav("/login");
    return;
  }

  await api.delete(`/tasks/${id}`, {
    headers: { authorization: token },
  });

  setTasks(tasks.filter((t) => t._id !== id));
};


 const update = async (id) => {
  if (!token) {
    nav("/login");
    return;
  }

  const res = await api.put(
    `/tasks/${id}`,
    { title: editTitle },
    { headers: { authorization: token } }
  );

  setTasks(tasks.map((t) => (t._id === id ? res.data : t)));
  setEditingId(null);
  setEditTitle("");
};


  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-linear-to-br from-slate-400 to-slate-200 py-12 px-4">
        <div className="max-w-5xl mx-auto">

          <h2 className="text-2xl font-semibold text-center mb-10">
            My Tasks
          </h2>

          {/* Add Task */}
          <div className="flex flex-col sm:flex-row gap-3 mb-10">
            <input
              className="border rounded-md p-3 flex-1 focus:outline-none focus:ring-2 focus:ring-black"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter a new task..."
            />

            <button
              onClick={add}
              className="bg-black text-white px-10 py-3 rounded-md hover:bg-gray-800"
            >
              Add Task
            </button>
          </div>

          {/* Empty State */}
          {tasks.length === 0 && (
            <p className="text-center text-gray-500">
              No tasks yet. Add one above 👆
            </p>
          )}

          {/* Task Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {tasks.map((t) => (
              <TaskCard
                key={t._id}
                task={t}
                editingId={editingId}
                setEditingId={setEditingId}
                editTitle={editTitle}
                setEditTitle={setEditTitle}
                update={update}
                del={del}
              />
            ))}
          </div>

        </div>
      </div>
    </>
  );
};

export default Dashboard;