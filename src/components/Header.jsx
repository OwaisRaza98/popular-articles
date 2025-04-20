import React from "react";

const Header = () => {
  return (
    <header className="flex items-center justify-between px-6 py-4 bg-white shadow-md">
      <div className="flex items-center gap-3">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/4/40/New_York_Times_logo_variation.jpg"
          alt="NYTimes Logo"
          className="h-10 w-auto"
        />
        <h1 className="text-xl font-bold text-gray-800">
          NY Times Most Popular Articles
        </h1>
      </div>
    </header>
  );
};

export default Header;
