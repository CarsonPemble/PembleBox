
import React from "react";
import { motion } from "framer-motion";
import { Play, Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const Navbar = ({ currentPage, setCurrentPage }) => {
  const navItems = [
    { id: "home", label: "Home" },
    { id: "get-started", label: "Getting Started" },
    { id: "suggest", label: "Suggestion Box" },
    { id: "donate", label: "Donate" },
  ];

  const NavItems = ({ className = "", onClick = () => {} }) => (
    <div className={className}>
      {navItems.map((item) => (
        <button
          key={item.id}
          onClick={() => {
            setCurrentPage(item.id);
            onClick();
          }}
          className={`text-foreground hover:text-primary transition-colors px-3 py-2 block w-full text-left ${
            currentPage === item.id ? "text-primary" : ""
          }`}
        >
          {item.label}
        </button>
      ))}
    </div>
  );

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
            className="hidden md:flex md:items-center md:space-x-4 lg:space-x-8 flex-nowrap"
          >
            <NavItems className="flex space-x-4" />
          </motion.div>

          <Sheet>
            <SheetTrigger className="md:hidden p-2">
              <Menu className="h-6 w-6 text-primary" />
            </SheetTrigger>
            <SheetContent className="bg-background border-l border-border">
              <div className="mt-8">
                <NavItems 
                  className="space-y-4" 
                  onClick={() => {
                    // Close the sheet by clicking its close button
                    document.querySelector('[data-radix-collection-item]')?.click();
                  }} 
                />
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
