
import React from "react";
import { motion } from "framer-motion";
import { Button } from "../components/ui/button";
import { useToast } from "../components/ui/use-toast";
import { ExternalLink } from "lucide-react";

const GetStarted = () => {
  const { toast } = useToast();
  const [email, setEmail] = React.useState("");

  const steps = [
    {
      title: "Create an account on Plex",
      description: "Visit plex.tv/sign-up to create your account.",
      link: "https://www.plex.tv/sign-up/",
    },
    {
      title: "Download the Plex App",
      description: "Install the Plex app from the app store on your phone or TV. Or watch from your computer with this link.",
      link: "https://app.plex.tv/desktop/",
    },
    {
      title: "Share your Plex details",
      description: "Use the form below to send me your username or email",
    },
    {
      title: "Accept the friend request",
      description: "Please allow up to 24 hours for me to send you a friend request.",
    },
    {
      title: "Find PembleBox",
      description: "Log into Plex and look for PembleBox under the More tab in the side bar",
    },
    {
      title: "Start Watching",
      description: "Enjoy the movies and shows!",
    },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      toast({
        title: "Error",
        description: "Please enter your Plex username or email",
        variant: "destructive",
      });
      return;
    }

    try {
      // Send email using a serverless function or email service
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          to: "carsonpemble777@gmail.com",
          subject: "PembleBox New User Request",
          text: `New user request from: ${email}`,
        }),
      });

      if (!response.ok) throw new Error("Failed to send email");

      toast({
        title: "Success!",
        description: "We'll send you an invite within 24 hours!",
      });
      setEmail("");
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit request. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-4"
      >
        <h1 className="text-4xl font-bold gradient-text">Getting Started</h1>
        <p className="text-xl text-muted-foreground">
          Follow these simple steps to begin your entertainment journey
        </p>
      </motion.div>

      <div className="aspect-video rounded-xl overflow-hidden bg-card">
        <div className="w-full h-full flex items-center justify-center">
          <p className="text-muted-foreground">Video tutorial coming soon</p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {steps.map((step, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-card p-6 rounded-xl shadow-lg"
          >
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold">
                  {index + 1}
                </div>
                <h3 className="font-semibold text-foreground">{step.title}</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                {step.description}
              </p>
              {step.link && (
                <a
                  href={step.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 text-primary hover:underline"
                >
                  <span>Visit Link</span>
                  <ExternalLink className="h-4 w-4" />
                </a>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      <motion.form
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        onSubmit={handleSubmit}
        className="max-w-md mx-auto space-y-4"
      >
        <div className="space-y-2">
          <label className="block text-sm font-medium text-foreground">
            Your Plex Username or Email
          </label>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your Plex username or email"
            className="w-full px-3 py-2 rounded-lg bg-card border border-border text-foreground"
          />
        </div>
        <Button type="submit" className="w-full">
          Submit
        </Button>
      </motion.form>
    </div>
  );
};

export default GetStarted;
