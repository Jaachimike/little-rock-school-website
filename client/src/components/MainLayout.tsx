import React from "react";
import Header from "./Header";
import Footer from "./Footer";

interface MainLayoutProps {
  children: React.ReactNode;
}

function MainLayout({children}: MainLayoutProps) {
  return (
    <div>
      {/* <Sidebar /> */}
      <Header />
      <main className=" mt-24 ">
        {/* Adjust margins as needed */}
        {children}
      </main>
      <Footer />
    </div>
  );
}

export default MainLayout;
