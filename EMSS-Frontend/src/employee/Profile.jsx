import { useEffect, useState } from "react";
import api from "../api/axios";


export default function Profile() {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    api.get("/api/employee/profile")
      .then((res) => setProfile(res.data))
      .catch((err) => console.error(err));
  }, []);

  if (!profile) return <p className="loading">Loading profile...</p>;

  return (
    <div className="profile-container">
      <div className="profile-card">
        <h2 className="profile-title">My Profile</h2>

        <table className="profile-table">
          <tbody>
            <tr>
              <td>Name</td>
              <td>{profile.fullName}</td>
            </tr>
            <tr>
              <td>Email</td>
              <td>{profile.email}</td>
            </tr>
            <tr>
              <td>Employee ID</td>
              <td>{profile.employeeId}</td>
            </tr>
            <tr>
              <td>Role</td>
              <td>{profile.role}</td>
            </tr>
            <tr>
              <td>Department</td>
              <td>{profile.departmentName || "-"}</td>
            </tr>
            <tr>
              <td>Gender</td>
              <td>{profile.gender || "-"}</td>
            </tr>
            <tr>
              <td>Date of Birth</td>
              <td>{profile.dob || "-"}</td>
            </tr>
            <tr>
              <td>Marital Status</td>
              <td>{profile.maritalStatus || "-"}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
