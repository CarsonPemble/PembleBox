
import React from "react";
import { motion } from "framer-motion";
import { Button } from "../components/ui/button";
import { Coffee, Copy, ExternalLink } from "lucide-react";
import { useToast } from "../components/ui/use-toast";

const Donations = () => {
  const { toast } = useToast();
  const bitcoinAddress = "3NP6WPF1x1CZh2R3vFEprvUc3oTpNAdBtg";

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(bitcoinAddress);
    toast({
      title: "Copied!",
      description: "Bitcoin address copied to clipboard",
    });
  };

  return (
    <div className="max-w-2xl mx-auto space-y-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-4"
      >
        <h1 className="text-4xl font-bold gradient-text">Support PembleBox</h1>
        <p className="text-xl text-muted-foreground">
          Help keep the entertainment flowing
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="grid gap-6"
      >
        <div className="bg-card p-6 rounded-xl shadow-lg text-center space-y-4">
          <Coffee className="h-12 w-12 mx-auto text-primary" />
          <h2 className="text-2xl font-semibold text-foreground">Buy me a Coffee</h2>
          <p className="text-muted-foreground">
            Please consider supporting to keep the server running.
          </p>
          <a
            href="https://buymeacoffee.com/carsonpemble"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-full"
          >
            <Button size="lg" className="w-full">
              <span className="mr-2">Visit My Donation Page</span>
              <ExternalLink className="h-4 w-4" />
            </Button>
          </a>
        </div>

        <div className="bg-card p-6 rounded-xl shadow-lg text-center space-y-4">
          <h2 className="text-2xl font-semibold text-foreground">Bitcoin Donation</h2>
          <div className="aspect-square max-w-[200px] mx-auto bg-white rounded-xl p-4">
            <img  alt="Bitcoin QR Code" class="w-full h-full" src="https://images.unsplash.com/photo-1655804472974-67e35a039ec6" />
          </div>
          <div className="flex items-center gap-2 bg-background p-3 rounded-lg">
            <code className="flex-1 text-sm text-foreground overflow-x-auto">
              {bitcoinAddress}
            </code>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleCopyAddress}
              className="shrink-0 bg-primary text-primary-foreground hover:bg-primary/90"
            >
              <Copy className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Donations;
