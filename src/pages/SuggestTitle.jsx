
import React from "react";
import { motion } from "framer-motion";
import { Button } from "../components/ui/button";
import { useToast } from "../components/ui/use-toast";
import { Check, Clock, Trash2 } from "lucide-react";
import { supabase } from "../lib/supabase";

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
    // Fetch initial suggestions
    fetchSuggestions();

    // Set up real-time subscription
    const channel = supabase
      .channel('suggestions_channel')
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'suggestions'
      }, (payload) => {
        fetchSuggestions();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchSuggestions = async () => {
    try {
      const { data, error } = await supabase
        .from('suggestions')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setSuggestions(data || []);
    } catch (error) {
      console.error('Error fetching suggestions:', error);
      toast({
        title: "Error",
        description: "Failed to load suggestions",
        variant: "destructive",
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.type || !formData.title) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    try {
      const { error } = await supabase
        .from('suggestions')
        .insert([{
          title: formData.title,
          type: formData.type,
          details: formData.details,
          status: 'pending'
        }]);

      if (error) throw error;

      toast({
        title: "Success!",
        description: "Your suggestion has been submitted. Thank you!",
      });

      setFormData({ type: "", title: "", details: "" });
    } catch (error) {
      console.error('Error inserting suggestion:', error);
      toast({
        title: "Error",
        description: "Failed to submit suggestion",
        variant: "destructive",
      });
    }
  };

  const toggleSuggestionStatus = async (id) => {
    if (!isAdmin) return;

    try {
      const suggestion = suggestions.find(s => s.id === id);
      const newStatus = suggestion.status === "pending" ? "added" : "pending";
      
      const { error } = await supabase
        .from('suggestions')
        .update({ 
          status: newStatus,
          is_added: newStatus === "added"
        })
        .eq('id', id);

      if (error) throw error;
    } catch (error) {
      console.error('Error updating suggestion:', error);
      toast({
        title: "Error",
        description: "Failed to update suggestion status",
        variant: "destructive",
      });
    }
  };

  const removeSuggestion = async (id, e) => {
    e.stopPropagation();
    if (!isAdmin) return;

    try {
      const { error } = await supabase
        .from('suggestions')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Removed",
        description: "Suggestion has been removed",
      });
    } catch (error) {
      console.error('Error removing suggestion:', error);
      toast({
        title: "Error",
        description: "Failed to remove suggestion",
        variant: "destructive",
      });
    }
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
                      {suggestion.type} • {new Date(suggestion.created_at).toLocaleDateString()}
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
