import { useEffect, useState } from "react";
import api from "../api/axios";

export default function AdminLeaves() {
  const [leaves, setLeaves] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadLeaves = async () => {
      try {
        const res = await api.get("/api/admin/leaves");
        setLeaves(res.data);
      } catch {
        setError("Failed to load leave requests");
      }
    };

    loadLeaves();
  }, []);

  const approveLeave = async (id) => {
    try {
      await api.put(`/api/admin/leaves/${id}/approve`);
      window.location.reload(); // simple & safe
    } catch {
      alert("Approve failed");
    }
  };

  const rejectLeave = async (id) => {
    try {
      await api.put(`/api/admin/leaves/${id}/reject`);
      window.location.reload();
    } catch {
      alert("Reject failed");
    }
  };

  return (
    <div className="page">
      <h2>Leave Approvals</h2>

      {error && <p className="error">{error}</p>}

      <table className="table">
        <thead>
          <tr>
            <th>Employee</th>
            <th>Type</th>
            <th>From</th>
            <th>To</th>
            <th>Reason</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {leaves.map((l) => (
              <tr key={l.id}>
                  <td>{l.employeeName}</td>
              <td>{l.userName}</td>
              <td>{l.leaveType}</td>
              <td>{l.startDate}</td>
              <td>{l.endDate}</td>
              <td>{l.reason}</td>
              <td>{l.status}</td>
              <td>
                {l.status === "PENDING" && (
                  <>
                    <button onClick={() => approveLeave(l.id)}>
                      Approve
                    </button>
                    <button onClick={() => rejectLeave(l.id)}>
                      Reject
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}