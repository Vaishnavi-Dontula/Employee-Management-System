import Header from "../Components/Header";
import Footer from "../Components/Footor";
import EmployeeSidebar from "./EmployeeSidebar";
import { Outlet } from "react-router-dom";


export default function EmployeeLayout() {
  // const navigate = useNavigate();

  // const logout = () => {
  //   localStorage.clear();
  //   navigate("/login");
  // };

  return (

    <div className="app-container">
      <Header />

    <div className="layout">
      <EmployeeSidebar />

      <main className="content">
        <div className="topbar">
          {/* <span>Welcome, Employee</span> */}
          {/* <button onClick={logout}>Logout</button> */}
        </div>

        <Outlet />
      </main>
      </div>
      
      <Footer />
      </div>
  );
}
