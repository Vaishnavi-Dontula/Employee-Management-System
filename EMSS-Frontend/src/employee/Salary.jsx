import { useEffect, useState } from "react";
import api from "../api/axios";

export default function Salary() {

  const [salaries, setSalaries] = useState([]);

  useEffect(() => {
    api.get("/api/employee/salary")
      .then(res => setSalaries(res.data));
  }, []);

  return (
    <div className="page">
      <h2>My Salary</h2>

      <table className="table">
        <thead>
          <tr>
            <th>Month</th>
            <th>Basic</th>
            <th>Net</th>
            <th>Payment Date</th>
          </tr>
        </thead>
        <tbody>
          {salaries.map(s => (
            <tr key={s.id}>
              <td>{s.month}/{s.year}</td>
              <td>{s.basicSalary}</td>
              <td>{s.netSalary}</td>
              <td>{s.paymentDate}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
