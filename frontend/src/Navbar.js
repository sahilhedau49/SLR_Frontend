import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-gray-800 py-4 px-80">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white text-lg font-semibold">
          SLR
        </Link>
        <ul className="flex gap-4">
          <li className="ml-4">
            <Link
              to="https://adidas-clone-sahilhedau49.netlify.app/"
              className="text-white hover:text-gray-300"
            >
              ASL
            </Link>
          </li>
          <li className="ml-4">
            <Link to="/words" className="text-white hover:text-gray-300">
              Words
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
