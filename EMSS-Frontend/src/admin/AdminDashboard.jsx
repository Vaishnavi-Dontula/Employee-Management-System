import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios";

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    api.get("/api/admin/dashboard/stats")
      .then(res => setStats(res.data))
      .catch(() => setError("Failed to load dashboard stats"));
  }, []);

  if (error) return <p className="error">{error}</p>;
  if (!stats) return <p>Loading dashboard...</p>;

  return (
    <div className="page">
      <h2>Welcome To Admin Dashboard</h2>

      {/* ================= STATS SECTION ================= */}
      <div className="stats-grid">
        <StatCard title="Employees" value={stats.totalEmployees} />
        <StatCard title="Departments" value={stats.totalDepartments} />
        <StatCard title="Monthly Payroll" value={`₹${stats.totalPayroll}`} />
        <StatCard title="Total Leaves" value={stats.totalLeaves} />
        <StatCard title="Pending Leaves" value={stats.pendingLeaves} />
        <StatCard title="Approved Leaves" value={stats.approvedLeaves} />
        <StatCard title="Rejected Leaves" value={stats.rejectedLeaves} />
      </div>

      {/* ================= ACTION LINKS ================= */}
      <h3 style={{ marginTop: "40px" }}>Quick Actions</h3>

      <div className="cards">
        <Link to="/admin/leaves" className="card">
          Manage Leaves
        </Link>

        <Link to="/admin/departments" className="card">
          Manage Departments
        </Link>

        <Link to="/admin/employees" className="card">
          Manage Employees
        </Link>

        <Link to="/admin/salary" className="card">
          Salary Management
        </Link>
      </div>
    </div>
  );
}

/* ================= STAT CARD ================= */

function StatCard({ title, value }) {
  return (
    <div className="stat-card">
      <p className="stat-title">{title}</p>
      <h3 className="stat-value">{value}</h3>
    </div>
  );
}
