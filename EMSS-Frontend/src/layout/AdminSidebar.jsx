import { NavLink } from "react-router-dom";

export default function AdminSidebar() {
  return (
    <aside className="sidebar">
      <h2 className="logo">EMS Admin</h2>

      <nav>
        <NavLink to="/admin/dashboard">Dashboard</NavLink>
        <NavLink to="/admin/employees">Employees</NavLink>
        <NavLink to="/admin/departments">Departments</NavLink>
        <NavLink to="/admin/leaves">Leaves</NavLink>
        <NavLink to="/admin/salary">Salary</NavLink>
      </nav>
    </aside>
  );
}
