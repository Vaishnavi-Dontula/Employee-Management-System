import { Routes, Route } from "react-router-dom";
import Login from "./auth/Login";
import ProtectedRoute from "./auth/ProtectedRoute";
import AdminDashboard from "./admin/AdminDashboard";
import EmployeeDashboard from "./employee/EmployeeDashboard";
import Profile from "./employee/Profile";
import Salary from "./employee/Salary";
import ApplyLeave from "./employee/ApplyLeave";
import Leave from "./employee/Leave";
import AdminLeaves from "./admin/AdminLeaves";
import Departments from "./admin/Departments";
import AdminSalary from "./admin/AdminSalary";
import AdminEmployees from "./admin/AdminEmployees";
import AdminLayout from "./layout/AdminLayout";
import EmployeeLayout from "./layout/EmployeeLayout";

function App() {
  return (
// App.js
<Routes>
      <Route path="/" element={<Login />} />
       <Route path="/login" element={<Login />} />

  {/* ADMIN */}
  <Route
    path="/admin"
    element={
      <ProtectedRoute role="ADMIN">
        <AdminLayout />
      </ProtectedRoute>
    }
  >
    <Route path="dashboard" element={<AdminDashboard />} />
    <Route path="employees" element={<AdminEmployees />} />
    <Route path="departments" element={<Departments />} />
    <Route path="leaves" element={<AdminLeaves />} />
    <Route path="salary" element={<AdminSalary />} />
  </Route>

  {/* EMPLOYEE */}
  <Route
    path="/employee"
    element={
      <ProtectedRoute role="EMPLOYEE">
        <EmployeeLayout />
      </ProtectedRoute>
    }
  >
    <Route path="dashboard" element={<EmployeeDashboard />} />
    <Route path="profile" element={<Profile />} />
    <Route path="salary" element={<Salary />} />
    <Route
  path="/employee/leaves"
  element={
    <ProtectedRoute role="EMPLOYEE">
      <Leave />
    </ProtectedRoute>
  }
/>

  </Route>
</Routes>

  );
}

export default App;
