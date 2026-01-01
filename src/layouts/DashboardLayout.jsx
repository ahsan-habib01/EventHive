import { useState } from "react";
import { Outlet } from "react-router";
import Sidebar from "../componets/Dashboard/Sidebar";

const DashboardLayout = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Navbar - Top */}

      {/* Main Area - Sidebar + Content */}
      <div className="flex flex-1 mt-1">
        {/* Sidebar */}
        <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />

        {/* Main Content */}
        <div className="flex-1 p-8 transition-all duration-300">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
