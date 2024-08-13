import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import Sidebar from "./Sidebar";

interface MainLayoutProps {
  children: React.ReactNode;
}

function MainLayout({children}: MainLayoutProps) {
  return (
    <div className="flex text-littleRockWhite-500 ">
      <Sidebar />
      <div className="flex-1">
        <Header />
        <main className="ml-16 mt-24 ">
          {/* Adjust margins as needed */}
          {children}
        </main>
        <Footer />
      </div>
    </div>
  );
}

export default MainLayout;
