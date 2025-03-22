
import React from "react";
import { motion } from "framer-motion";
import { Play } from "lucide-react";

const Navbar = ({ currentPage, setCurrentPage }) => {
  const navItems = [
    { id: "home", label: "Home" },
    { id: "get-started", label: "Get Started" },
    { id: "suggest", label: "Suggestion Box" },
    { id: "donate", label: "Donate" },
  ];

  return (
    <nav className="bg-card border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center space-x-2"
          >
            <Play className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold gradient-text">PembleBox</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="hidden md:flex md:space-x-4 lg:space-x-8"
          >
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setCurrentPage(item.id)}
                className={`text-foreground hover:text-primary transition-colors px-3 py-2 ${
                  currentPage === item.id ? "text-primary" : ""
                }`}
              >
                {item.label}
              </button>
            ))}
          </motion.div>

          <div className="md:hidden">
            <button className="p-2">
              <svg
                className="h-6 w-6"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
