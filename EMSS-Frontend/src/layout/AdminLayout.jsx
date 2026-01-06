import Header from "../Components/Header";
import Footer from "../Components/Footor";
import AdminSidebar from "./AdminSidebar";
import { Outlet } from "react-router-dom";

export default function AdminLayout() {
  return (

    <div className="app-container">
      <Header />
      
    <div className="layout">
      <AdminSidebar />
      <main className="content">
        <Outlet />
      </main>
      </div>
      <Footer />
    </div>
  );
}
