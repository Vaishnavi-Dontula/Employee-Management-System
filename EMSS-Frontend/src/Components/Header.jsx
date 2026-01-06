import { useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();
//   const name = localStorage.getItem("name");

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <header className="header">
      <h2>Employee Management System</h2>

      <div className="header-right">
        {/* <span>Welcome, {name}</span> */}
        <button onClick={logout}>Logout</button>
      </div>
    </header>
  );
}
