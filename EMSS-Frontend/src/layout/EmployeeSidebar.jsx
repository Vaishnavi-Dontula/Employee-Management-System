import { NavLink } from "react-router-dom";

export default function EmployeeSidebar() {
  return (
    <aside className="sidebar">
      <h2 className="logo">EMS</h2>

      <nav>
        <NavLink to="/employee/dashboard">Dashboard</NavLink>
        <NavLink to="/employee/profile">Profile</NavLink>
        <NavLink to="/employee/leaves">Leaves</NavLink>
        <NavLink to="/employee/salary">Salary</NavLink>
      </nav>
    </aside>
  );
}
