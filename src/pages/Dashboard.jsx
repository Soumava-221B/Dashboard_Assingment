import React, { useState } from "react";
import Navbar from "../components/Navbar";
import DashboardHeader from "../components/dashboard/DashboardHeader";
import DashboardMain from "../components/dashboard/DashboardMain";

const Dashboard = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  return (
    <>
      <header>
        <Navbar onSearch={handleSearch} />
      </header>
      <main className="bg-blue-50 flex flex-col">
        <DashboardHeader />
        <div className="flex-1">
          <DashboardMain searchQuery={searchQuery} />
        </div>
      </main>
    </>
  );
};

export default Dashboard;