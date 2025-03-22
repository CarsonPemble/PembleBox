
import React from "react";
import { motion } from "framer-motion";
import { useToast } from "./components/ui/use-toast";
import { Toaster } from "./components/ui/toaster";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import GetStarted from "./pages/GetStarted";
import SuggestTitle from "./pages/SuggestTitle";
import Donations from "./pages/Donations";

export default function App() {
  const [currentPage, setCurrentPage] = React.useState("home");

  const renderPage = () => {
    switch (currentPage) {
      case "home":
        return <Home setCurrentPage={setCurrentPage} />;
      case "get-started":
        return <GetStarted />;
      case "suggest":
        return <SuggestTitle />;
      case "donate":
        return <Donations />;
      default:
        return <Home setCurrentPage={setCurrentPage} />;
    }
  };

  return (
    <div className="min-h-screen bg-background dark">
      <Navbar currentPage={currentPage} setCurrentPage={setCurrentPage} />
      <motion.main
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto px-4 py-8"
      >
        {renderPage()}
      </motion.main>
      <Toaster />
    </div>
  );
}
