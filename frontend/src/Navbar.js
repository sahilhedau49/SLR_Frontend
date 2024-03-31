import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-gray-800 py-4 px-20">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white text-lg font-semibold">
          SLR
        </Link>
        <ul className="flex">
          <li className="ml-4">
            <Link to="/model" className="text-white hover:text-gray-300">
              Model
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
