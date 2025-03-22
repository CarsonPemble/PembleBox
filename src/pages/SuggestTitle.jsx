
import React from "react";
import { motion } from "framer-motion";
import { Button } from "../components/ui/button";
import { useToast } from "../components/ui/use-toast";
import { Check, Clock, Trash2 } from "lucide-react";

const SuggestTitle = () => {
  const { toast } = useToast();
  const [formData, setFormData] = React.useState({
    type: "",
    title: "",
    details: "",
  });
  const [suggestions, setSuggestions] = React.useState([]);
  const [isAdmin, setIsAdmin] = React.useState(false);

  const contentTypes = ["Movies", "TV Shows", "Audiobooks", "Music", "Other"];

  React.useEffect(() => {
    // Load suggestions from localStorage initially
    const savedSuggestions = JSON.parse(localStorage.getItem("suggestions") || "[]");
    setSuggestions(savedSuggestions);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.type || !formData.title) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    const newSuggestion = {
      ...formData,
      id: Date.now(),
      date: new Date().toISOString(),
      status: "pending"
    };

    // Update local state and localStorage
    const updatedSuggestions = [newSuggestion, ...suggestions];
    setSuggestions(updatedSuggestions);
    localStorage.setItem("suggestions", JSON.stringify(updatedSuggestions));

    toast({
      title: "Success!",
      description: "Your suggestion has been submitted. Thank you!",
    });

    setFormData({ type: "", title: "", details: "" });
  };

  const toggleSuggestionStatus = (id) => {
    if (!isAdmin) return;

    const updatedSuggestions = suggestions.map(suggestion =>
      suggestion.id === id
        ? { ...suggestion, status: suggestion.status === "pending" ? "added" : "pending" }
        : suggestion
    );

    setSuggestions(updatedSuggestions);
    localStorage.setItem("suggestions", JSON.stringify(updatedSuggestions));
  };

  const removeSuggestion = (id, e) => {
    e.stopPropagation();
    if (!isAdmin) return;

    const updatedSuggestions = suggestions.filter(suggestion => suggestion.id !== id);
    setSuggestions(updatedSuggestions);
    localStorage.setItem("suggestions", JSON.stringify(updatedSuggestions));

    toast({
      title: "Removed",
      description: "Suggestion has been removed",
    });
  };

  return (
    <div className="max-w-2xl mx-auto space-y-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-4"
      >
        <h1 className="text-4xl font-bold gradient-text">Suggestion Box</h1>
        <p className="text-xl text-muted-foreground">
          Help us grow our library with your suggestions
        </p>
      </motion.div>

      <motion.form
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        onSubmit={handleSubmit}
        className="space-y-6"
      >
        <div className="space-y-2">
          <label className="block text-sm font-medium text-foreground">
            Content Type
          </label>
          <div className="flex flex-wrap gap-2">
            {contentTypes.map((type) => (
              <button
                key={type}
                type="button"
                onClick={() => setFormData({ ...formData, type })}
                className={`text-primary border border-primary rounded-lg px-4 py-2 transition-all ${
                  formData.type === type 
                    ? "bg-primary text-primary-foreground" 
                    : "hover:bg-primary/10"
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-foreground">
            Title
          </label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            placeholder="Enter title name"
            className="w-full px-3 py-2 rounded-lg bg-card border border-border text-foreground"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-foreground">
            More Information
          </label>
          <textarea
            value={formData.details}
            onChange={(e) =>
              setFormData({ ...formData, details: e.target.value })
            }
            placeholder="Author, year, or specific version notes..."
            className="w-full px-3 py-2 rounded-lg bg-card border border-border text-foreground min-h-[100px]"
          />
        </div>

        <Button type="submit" className="w-full">
          Submit Suggestion
        </Button>
      </motion.form>

      {suggestions.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold text-foreground">Suggestions</h2>
            <button
              onClick={() => setIsAdmin(!isAdmin)}
              className="text-sm text-primary hover:underline"
            >
              Please Don't Touch
            </button>
          </div>
          <div className="space-y-2">
            {suggestions.map((suggestion) => (
              <div
                key={suggestion.id}
                className="bg-card p-4 rounded-lg border border-border"
                onClick={() => toggleSuggestionStatus(suggestion.id)}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-foreground">
                      {suggestion.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {suggestion.type} • {new Date(suggestion.date).toLocaleDateString()}
                    </p>
                    {suggestion.details && (
                      <p className="text-sm text-muted-foreground mt-2">
                        {suggestion.details}
                      </p>
                    )}
                    {suggestion.status === "added" && (
                      <p className="text-green-500 text-sm mt-2">
                        Added to the server
                      </p>
                    )}
                  </div>
                  <div className="flex items-center space-x-2">
                    {suggestion.status === "added" ? (
                      <Check className="h-5 w-5 text-green-500" />
                    ) : (
                      <Clock className="h-5 w-5 text-primary" />
                    )}
                    {isAdmin && (
                      <button
                        onClick={(e) => removeSuggestion(suggestion.id, e)}
                        className="p-1 hover:bg-accent rounded-lg transition-colors"
                      >
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SuggestTitle;
