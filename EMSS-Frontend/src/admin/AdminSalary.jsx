import { useEffect, useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:8080/api/admin/salary";

export default function AdminSalary() {

  const [salaries, setSalaries] = useState([]);
  const [form, setForm] = useState({
    id: null,
    userId: "",
    basicSalary: "",
    allowances: "",
    deductions: "",
    month: "",
    year: "",
    paymentDate: ""
  });

  const token = localStorage.getItem("token");

  /* ================= LOAD SALARIES ================= */
  const loadSalaries = () => {
    axios.get(API_URL, {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => setSalaries(res.data))
    .catch(err => console.error(err));
  };

  useEffect(() => {
    loadSalaries();
  }, []);

  /* ================= FORM HANDLERS ================= */
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const resetForm = () => {
    setForm({
      id: null,
      userId: "",
      basicSalary: "",
      allowances: "",
      deductions: "",
      month: "",
      year: "",
      paymentDate: ""
    });
  };

  /* ================= ADD / UPDATE ================= */
  const submitSalary = () => {

    const payload = {
      userId: Number(form.userId),
      basicSalary: Number(form.basicSalary),
      allowances: Number(form.allowances),
      deductions: Number(form.deductions),
      month: Number(form.month),
      year: Number(form.year),
      paymentDate: form.paymentDate
    };

    if (form.id) {
      // UPDATE
      axios.put(`${API_URL}/${form.id}`, payload, {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(() => {
        loadSalaries();
        resetForm();
      });
    } else {
      // ADD
      axios.post(API_URL, payload, {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(() => {
        loadSalaries();
        resetForm();
      });
    }
  };

  /* ================= EDIT ================= */
  const editSalary = (s) => {
    setForm({
      id: s.id,
      userId: s.userId,
      basicSalary: s.basicSalary,
      allowances: s.allowances,
      deductions: s.deductions,
      month: s.month,
      year: s.year,
      paymentDate: s.paymentDate
    });
  };

  /* ================= DELETE ================= */
  const deleteSalary = (id) => {
    if (!window.confirm("Delete this salary?")) return;

    axios.delete(`${API_URL}/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(() => loadSalaries());
  };

  /* ================= UI ================= */
  return (
    <div style={{ padding: 20 }}>

      <h2>Salary Management</h2>

      {/* ===== FORM ===== */}
      <div style={{ marginBottom: 20 }}>
        <input name="userId" placeholder="Employee ID"
          value={form.userId} onChange={handleChange} />

        <input name="basicSalary" placeholder="Basic Salary"
          value={form.basicSalary} onChange={handleChange} />

        <input name="allowances" placeholder="Allowances"
          value={form.allowances} onChange={handleChange} />

        <input name="deductions" placeholder="Deductions"
          value={form.deductions} onChange={handleChange} />

        <input name="month" placeholder="Month"
          value={form.month} onChange={handleChange} />

        <input name="year" placeholder="Year"
          value={form.year} onChange={handleChange} />

        <input type="date" name="paymentDate"
          value={form.paymentDate} onChange={handleChange} />

        <br /><br />

        <button onClick={submitSalary}>
          {form.id ? "Update Salary" : "Add Salary"}
        </button>

        {form.id && (
          <button onClick={resetForm} style={{ marginLeft: 10 }}>
            Cancel
          </button>
        )}
      </div>

      {/* ===== TABLE ===== */}
      <table border="1" width="100%">
        <thead>
          <tr>
            <th>Employee</th>
            <th>Month</th>
            <th>Year</th>
            <th>Basic</th>
            <th>Net</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {salaries.map(s => (
            <tr key={s.id}>
              <td>{s.userName}</td>
              <td>{s.month}</td>
              <td>{s.year}</td>
              <td>{s.basicSalary}</td>
              <td>{s.netSalary}</td>
              <td>
                <button onClick={() => editSalary(s)}>Edit</button>
                <button
                  style={{ marginLeft: 5 }}
                  onClick={() => deleteSalary(s.id)}>
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
