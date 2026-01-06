import { useEffect, useState } from "react";
import api from "../api/axios";

export default function Departments() {
  const [departments, setDepartments] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");

  const loadDepartments = () => {
    api.get("/api/admin/departments")
      .then(res => setDepartments(res.data))
      .catch(() => setError("Failed to load departments"));
  };

  useEffect(() => {
    loadDepartments();
  }, []);

  const addDepartment = async (e) => {
    e.preventDefault();
    try {
      await api.post("/api/admin/departments", {
        name,
        description,
      });
      setName("");
      setDescription("");
      loadDepartments();
    } catch {
      setError("Department already exists");
    }
  };

  const deleteDepartment = async (id) => {
    if (!window.confirm("Delete department?")) return;
    await api.delete(`/api/admin/departments/${id}`);
    loadDepartments();
  };

  return (
    <div className="page">
      <h2>Departments</h2>

      {error && <p className="error">{error}</p>}

      <form onSubmit={addDepartment} className="form">
        <input
          placeholder="Department Name"
          value={name}
          onChange={e => setName(e.target.value)}
          required
        />
        <input
          placeholder="Description"
          value={description}
          onChange={e => setDescription(e.target.value)}
        />
        <button>Add</button>
      </form>

      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {departments.map(d => (
            <tr key={d.id}>
              <td>{d.name}</td>
              <td>{d.description}</td>
              <td>
                <button
                  className="danger"
                  onClick={() => deleteDepartment(d.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
