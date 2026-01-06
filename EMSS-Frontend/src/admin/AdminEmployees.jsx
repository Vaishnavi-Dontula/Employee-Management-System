import { useEffect, useState } from "react";
import api from "../api/axios";
import AdminEmployeeForm from "./AdminEmployeeForm";

export default function AdminEmployees() {
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const loadEmployees = async () => {
    const res = await api.get("/api/admin/employees");
    setEmployees(res.data);
  };

  useEffect(() => {
    loadEmployees();
  }, []);

  const deleteEmployee = async (id) => {
    if (!window.confirm("Delete employee?")) return;
    await api.delete(`/api/admin/employees/${id}`);
    loadEmployees();
  };

  return (
    <div className="page">
      <h2>Employee Management</h2>

      <AdminEmployeeForm
        selectedEmployee={selectedEmployee}
        onSaved={() => {
          setSelectedEmployee(null);
          loadEmployees();
        }}
      />

      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Emp ID</th>
            <th>Department</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {employees.map(emp => (
            <tr key={emp.id}>
              <td>{emp.fullName}</td>
              <td>{emp.email}</td>
              <td>{emp.employeeId}</td>
              <td>{emp.departmentName || "-"}</td>
              <td>
                <button onClick={() => setSelectedEmployee(emp)}>Edit</button>
                <button onClick={() => deleteEmployee(emp.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
