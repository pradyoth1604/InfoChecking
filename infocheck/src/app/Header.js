"use client";

import React from "react";

const Header = () => {
  return (
    <header className="bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 p-4">
      <div className="container mx-auto text-center">
        <h1 className="text-4xl font-extrabold text-white">InfoPeek</h1>
        <p className="text-lg text-white mt-2">
          Discover age, nationality, and gender by entering a name.
        </p>
      </div>
    </header>
  );
};

export default Header;
