import { useEffect, useState } from "react";
import api from "../api/axios";

export default function Leave() {
  const [leaves, setLeaves] = useState([]);
  const [form, setForm] = useState({
    leaveType: "Casual",
    startDate: "",
    endDate: "",
    reason: "",
  });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const loadLeaves = () => {
    api
      .get("/api/employee/leaves")
      .then((res) => setLeaves(res.data))
      .catch(() => setError("Failed to load leaves"));
  };

  useEffect(() => {
    loadLeaves();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      await api.post("/api/employee/leaves", form);
      setMessage("Leave applied successfully");
      setForm({
        leaveType: "CASUAL",
        startDate: "",
        endDate: "",
        reason: "",
      });
      loadLeaves();
    } catch {
      setError("Failed to apply leave");
    }
  };

  return (
    <div className="page">
      <h2>Apply Leave</h2>

      {message && <p className="success">{message}</p>}
      {error && <p className="error">{error}</p>}

      <form className="leave-form" onSubmit={handleSubmit}>
        <select
          value={form.leaveType}
          onChange={(e) =>
            setForm({ ...form, leaveType: e.target.value })
          }
        >
          <option value="Casual">Casual</option>
                  <option value="Sick">Sick</option>
                  <option value="Annual">Annual</option>
                  <option value="Maternity">Maternity</option>
                  <option value="Paternity">Paternity</option>
        </select>

        <input
          type="date"
          value={form.startDate}
          onChange={(e) =>
            setForm({ ...form, startDate: e.target.value })
          }
          required
        />

        <input
          type="date"
          value={form.endDate}
          onChange={(e) =>
            setForm({ ...form, endDate: e.target.value })
          }
          required
        />

        <textarea
          placeholder="Reason"
          value={form.reason}
          onChange={(e) =>
            setForm({ ...form, reason: e.target.value })
          }
          required
        />

        <button>Apply Leave</button>
      </form>

      <h3>My Leave History</h3>

      {leaves.length === 0 ? (
        <p>No leaves applied</p>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>Type</th>
              <th>From</th>
              <th>To</th>
              <th>Status</th>
              <th>Comment</th>
            </tr>
          </thead>
          <tbody>
            {leaves.map((l) => (
              <tr key={l.id}>
                <td>{l.leaveType}</td>
                <td>{l.startDate}</td>
                <td>{l.endDate}</td>
                <td>
                  <span className={`status ${l.status}`}>
                    {l.status}
                  </span>
                </td>
                <td>{l.adminComment || "-"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
