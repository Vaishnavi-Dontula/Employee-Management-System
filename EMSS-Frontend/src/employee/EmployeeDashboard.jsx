import { useEffect, useState } from "react";
import api from "../api/axios";

export default function EmployeeDashboard() {
  const [profile, setProfile] = useState(null);
  const [leaves, setLeaves] = useState([]);
  const [salaries, setSalaries] = useState([]);

  useEffect(() => {
    api.get("/api/employee/profile")
      .then(res => setProfile(res.data));

    api.get("/api/employee/leaves")
      .then(res => setLeaves(res.data));

    api.get("/api/employee/salary")
      .then(res => setSalaries(res.data))
      .catch(err => console.error("Salary error:", err));
  }, []);

  const approvedLeaves = leaves.filter(l => l.status === "APPROVED").length;

 const latestSalary = salaries.length > 0
  ? salaries.reduce((latest, current) =>
      new Date(current.paymentDate) > new Date(latest.paymentDate)
        ? current
        : latest
    )
  : null;

  return (
    <div className="emp-dashboard">
      <h2>Welcome, {profile?.fullName}</h2>

      <div className="card-grid">
        <div className="dash-card">
          <h4>Total Leaves</h4>
          <p>{leaves.length}</p>
        </div>

        <div className="dash-card">
          <h4>Approved Leaves</h4>
          <p>{approvedLeaves}</p>
        </div>

        <div className="dash-card">
          <h4>Latest Salary</h4>
          <p>
            ₹ {latestSalary ? latestSalary.netSalary : "N/A"}
          </p>
        </div>

        <div className="dash-card">
          <h4>Role</h4>
          <p>{profile?.role}</p>
        </div>
      </div>
    </div>
  );
}
