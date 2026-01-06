import { useEffect, useState } from "react";
import api from "../api/axios";

export default function AdminEmployeeForm({ selectedEmployee, onSaved }) {

  const emptyForm = {
    fullName: "",
    email: "",
    password: "",
    role: "EMPLOYEE",
    employeeId: "",
    gender: "",
    dob: "",
    maritalStatus: "",
    departmentId: ""
  };

  const [form, setForm] = useState(emptyForm);
  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    api.get("/api/admin/departments").then(res => setDepartments(res.data));
  }, []);

  useEffect(() => {
    if (selectedEmployee) {
      setForm({
        ...selectedEmployee,
        departmentId: selectedEmployee.departmentId || ""
      });
    } else {
      setForm(emptyForm);
    }
  }, [selectedEmployee]);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submit = async e => {
    e.preventDefault();

    if (selectedEmployee) {
      await api.put(`/api/admin/employees/${selectedEmployee.id}`, form);
    } else {
      await api.post("/api/admin/employees", form);
    }

    onSaved();
  };

  return (
    <form onSubmit={submit} className="card">
      <h3>{selectedEmployee ? "Edit Employee" : "Add Employee"}</h3>

      <input name="fullName" placeholder="Full Name" value={form.fullName} onChange={handleChange} />
      <input name="email" placeholder="Email" value={form.email} onChange={handleChange} />

      {!selectedEmployee && (
        <input type="password" name="password" placeholder="Password" value={form.password} onChange={handleChange} />
      )}

      <input name="employeeId" placeholder="Employee ID" value={form.employeeId} onChange={handleChange} />

      <select name="gender" value={form.gender} onChange={handleChange}>
        <option value="">Gender</option>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
      </select>

      <input type="date" name="dob" value={form.dob} onChange={handleChange} />

      <select name="maritalStatus" value={form.maritalStatus} onChange={handleChange}>
        <option value="">Marital Status</option>
        <option value="Single">Single</option>
        <option value="Married">Married</option>
      </select>

      <select name="departmentId" value={form.departmentId} onChange={handleChange}>
        <option value="">Department</option>
        {departments.map(d => (
          <option key={d.id} value={d.id}>{d.name}</option>
        ))}
      </select>

      <button type="submit">
        {selectedEmployee ? "Update" : "Add"}
      </button>
    </form>
  );
}
