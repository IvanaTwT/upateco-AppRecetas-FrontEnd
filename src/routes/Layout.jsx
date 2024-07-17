import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { AuthProvider } from "../components/contexts/AuthContext";

export default function Layout() {
  return (
    <AuthProvider>
      <div className="container">
        <Navbar />
        <Outlet />
        <Footer />
      </div>
    </AuthProvider>
  );
}
