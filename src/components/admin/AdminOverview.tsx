import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { BookOpen, Notebook, Image, MessageCircle } from "lucide-react";

interface Stats {
  stories: number;
  journals: number;
  illustrations: number;
  comments: number;
}

const AdminOverview = () => {
  const [stats, setStats] = useState<Stats>({ stories: 0, journals: 0, illustrations: 0, comments: 0 });
  const [recentComments, setRecentComments] = useState<any[]>([]);

  useEffect(() => {
    const fetchStats = async () => {
      const [s, j, il, c] = await Promise.all([
        supabase.from("stories").select("id", { count: "exact", head: true }),
        supabase.from("journals").select("id", { count: "exact", head: true }),
        supabase.from("illustrations").select("id", { count: "exact", head: true }),
        supabase.from("comments").select("id", { count: "exact", head: true }),
      ]);
      setStats({
        stories: s.count ?? 0,
        journals: j.count ?? 0,
        illustrations: il.count ?? 0,
        comments: c.count ?? 0,
      });
    };

    const fetchRecentComments = async () => {
      const { data } = await supabase
        .from("comments")
        .select("id, author_name, content, story_id, created_at")
        .order("created_at", { ascending: false })
        .limit(5);
      if (data) setRecentComments(data);
    };

    fetchStats();
    fetchRecentComments();
  }, []);

  const cards = [
    { label: "Total Stories", value: stats.stories, icon: BookOpen, color: "bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400" },
    { label: "Total Journals", value: stats.journals, icon: Notebook, color: "bg-green-50 dark:bg-green-950 text-green-600 dark:text-green-400" },
    { label: "Illustrations", value: stats.illustrations, icon: Image, color: "bg-purple-50 dark:bg-purple-950 text-purple-600 dark:text-purple-400" },
    { label: "Comments", value: stats.comments, icon: MessageCircle, color: "bg-amber-50 dark:bg-amber-950 text-amber-600 dark:text-amber-400" },
  ];

  return (
    <div className="space-y-8">
      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((card) => (
          <div key={card.label} className="bg-card border border-border rounded-2xl p-6">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 ${card.color}`}>
              <card.icon className="w-5 h-5" />
            </div>
            <p className="text-3xl font-bold">{card.value}</p>
            <p className="text-sm text-muted-foreground mt-1">{card.label}</p>
          </div>
        ))}
      </div>

      {/* Recent Comments */}
      <div className="bg-card border border-border rounded-2xl p-6">
        <h2 className="font-semibold text-lg mb-4">Recent Comments</h2>
        {recentComments.length === 0 ? (
          <p className="text-muted-foreground text-sm">No comments yet.</p>
        ) : (
          <div className="space-y-3">
            {recentComments.map((c) => (
              <div key={c.id} className="flex items-start gap-4 py-3 border-b border-border last:border-0">
                <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-sm font-medium flex-shrink-0">
                  {c.author_name[0].toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium">{c.author_name}</p>
                  <p className="text-sm text-muted-foreground truncate">{c.content}</p>
                  <p className="text-xs text-muted-foreground mt-1">Story #{c.story_id}</p>
                </div>
                <p className="text-xs text-muted-foreground flex-shrink-0">
                  {new Date(c.created_at).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminOverview;
