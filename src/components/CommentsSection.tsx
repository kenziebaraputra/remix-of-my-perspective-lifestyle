import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { MessageCircle, Send } from "lucide-react";

interface Comment {
  id: string;
  author_name: string;
  content: string;
  created_at: string;
}

interface CommentsSectionProps {
  storyId: string;
}

const CommentsSection = ({ storyId }: CommentsSectionProps) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [name, setName] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const fetchComments = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("comments")
      .select("id, author_name, content, created_at")
      .eq("story_id", storyId)
      .order("created_at", { ascending: false });
    setLoading(false);
    if (!error && data) setComments(data);
  };

  useEffect(() => {
    fetchComments();
  }, [storyId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !content.trim()) {
      toast.error("Please enter your name and a comment.");
      return;
    }
    if (name.length > 80) { toast.error("Name is too long."); return; }
    if (content.length > 1000) { toast.error("Comment is too long (max 1000 characters)."); return; }

    setSubmitting(true);
    const { error } = await supabase.from("comments").insert({
      story_id: storyId,
      author_name: name.trim(),
      content: content.trim(),
    });
    setSubmitting(false);

    if (error) {
      toast.error("Could not post comment. Please try again.");
    } else {
      toast.success("Comment posted!");
      setName("");
      setContent("");
      fetchComments();
    }
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <section className="mb-16">
      <h2 className="text-2xl font-bold mb-8 flex items-center gap-3">
        <MessageCircle className="w-6 h-6" />
        Comments
        {comments.length > 0 && (
          <span className="text-base font-normal text-muted-foreground">({comments.length})</span>
        )}
      </h2>

      {/* Comment Form */}
      <form onSubmit={handleSubmit} className="mb-10 p-6 rounded-2xl bg-card space-y-4">
        <h3 className="text-lg font-semibold">Leave a comment</h3>
        <input
          type="text"
          placeholder="Your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          maxLength={80}
          className="w-full px-4 py-3 rounded-xl border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring transition-all"
          required
        />
        <textarea
          placeholder="Share your thoughts on this story…"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          maxLength={1000}
          rows={4}
          className="w-full px-4 py-3 rounded-xl border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring transition-all resize-none"
          required
        />
        <div className="flex items-center justify-between">
          <span className="text-xs text-muted-foreground">{content.length}/1000</span>
          <button
            type="submit"
            disabled={submitting}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 hover:scale-105 transition-all disabled:opacity-50"
          >
            <Send className="w-4 h-4" />
            {submitting ? "Posting…" : "Post Comment"}
          </button>
        </div>
      </form>

      {/* Comments List */}
      {loading ? (
        <div className="space-y-4">
          {[1, 2].map((i) => (
            <div key={i} className="p-6 rounded-2xl bg-muted animate-pulse">
              <div className="h-4 bg-muted-foreground/20 rounded w-32 mb-3" />
              <div className="h-3 bg-muted-foreground/10 rounded w-full mb-2" />
              <div className="h-3 bg-muted-foreground/10 rounded w-3/4" />
            </div>
          ))}
        </div>
      ) : comments.length === 0 ? (
        <p className="text-muted-foreground text-center py-8">
          No comments yet. Be the first to share your thoughts!
        </p>
      ) : (
        <div className="space-y-4">
          {comments.map((comment) => (
            <div key={comment.id} className="p-6 rounded-2xl bg-muted">
              <div className="flex items-center justify-between mb-3">
                <span className="font-semibold">{comment.author_name}</span>
                <span className="text-xs text-muted-foreground">{formatDate(comment.created_at)}</span>
              </div>
              <p className="text-muted-foreground leading-relaxed">{comment.content}</p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default CommentsSection;
