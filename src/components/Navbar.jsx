"use client";
import React, { useState } from "react";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <nav className="fixed right-10 top-8 z-50 ">
      <div
        className="w-14 h-auto will-change-transform cursor-pointer"
        onClick={() => setMenuOpen((prev) => !prev)}
      >
        <img
          src={menuOpen ? "/menu-close.png" : "/menu-open.png"}
          alt=""
          className={`w-full h-full object-fit transition-all duration-700 ease-out ${!menuOpen && "scale-110"}`}
        />
      </div>
    </nav>
  );
};

export default Navbar;
