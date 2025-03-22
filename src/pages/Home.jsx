
import React from "react";
import { motion } from "framer-motion";
import { Button } from "../components/ui/button";
import { Film, Music, Headphones, Library } from "lucide-react";

const StatCard = ({ icon: Icon, title, value }) => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    className="bg-card p-6 rounded-xl shadow-lg"
  >
    <div className="flex items-center space-x-4">
      <Icon className="h-8 w-8 text-primary" />
      <div>
        <h3 className="text-lg font-semibold text-foreground">{title}</h3>
        <p className="text-2xl font-bold gradient-text">{value}</p>
      </div>
    </div>
  </motion.div>
);

const Home = ({ setCurrentPage }) => {
  return (
    <div className="space-y-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-4"
      >
        <h1 className="text-4xl md:text-6xl font-bold gradient-text">
          Welcome to PembleBox
        </h1>
        <p className="text-xl text-muted-foreground">
          Your gateway to endless entertainment, completely free!
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard icon={Film} title="Movies" value="1,000+" />
        <StatCard icon={Library} title="Kid Movies" value="200+" />
        <StatCard icon={Headphones} title="Audiobooks" value="50+" />
        <StatCard icon={Music} title="TV Shows" value="100+" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-center space-y-6"
      >
        <div className="max-w-2xl mx-auto space-y-4">
          <h2 className="text-2xl font-semibold text-foreground">
            Experience Entertainment Like Never Before
          </h2>
          <p className="text-muted-foreground">
            Join our growing community and get instant access to a vast library of
            content. Movies, TV shows, music, and audiobooks - all in one place,
            all for free!
          </p>
        </div>

        <Button 
          size="lg" 
          className="bg-primary text-primary-foreground"
          onClick={() => setCurrentPage("get-started")}
        >
          Get Started Now
        </Button>
      </motion.div>
    </div>
  );
};

export default Home;
