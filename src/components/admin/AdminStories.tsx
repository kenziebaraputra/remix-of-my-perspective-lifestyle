import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Plus, Trash2, Edit2, X, Check, Bold, Italic, Quote } from "lucide-react";

interface Story {
  id: string;
  title: string;
  subtitle: string | null;
  genre: string | null;
  word_count: number | null;
  status: string | null;
  content: string | null;
  cover_image: string | null;
  author_name: string | null;
  read_time: string | null;
  created_at: string;
}

const AdminStories = () => {
  const [stories, setStories] = useState<Story[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const emptyForm = {
    title: "",
    subtitle: "",
    genre: "General",
    word_count: 0,
    status: "Draft",
    content: "",
    cover_image: "",
    author_name: "Sulung Arung",
    read_time: "5 min",
  };
  const [form, setForm] = useState(emptyForm);

  const fetchStories = async () => {
    setLoading(true);
    const { data } = await supabase.from("stories").select("*").order("created_at", { ascending: false });
    setLoading(false);
    if (data) setStories(data);
  };

  useEffect(() => { fetchStories(); }, []);

  const handleSave = async () => {
    if (!form.title.trim()) { toast.error("Title is required."); return; }
    let error;
    if (editingId) {
      ({ error } = await supabase.from("stories").update(form).eq("id", editingId));
    } else {
      ({ error } = await supabase.from("stories").insert(form));
    }
    if (error) { toast.error("Failed to save story."); return; }
    toast.success(editingId ? "Story updated!" : "Story created!");
    setShowForm(false);
    setEditingId(null);
    setForm(emptyForm);
    fetchStories();
  };

  const handleEdit = (story: Story) => {
    setForm({
      title: story.title,
      subtitle: story.subtitle ?? "",
      genre: story.genre ?? "General",
      word_count: story.word_count ?? 0,
      status: story.status ?? "Draft",
      content: story.content ?? "",
      cover_image: story.cover_image ?? "",
      author_name: story.author_name ?? "Sulung Arung",
      read_time: story.read_time ?? "5 min",
    });
    setEditingId(story.id);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this story? This cannot be undone.")) return;
    const { error } = await supabase.from("stories").delete().eq("id", id);
    if (error) { toast.error("Failed to delete."); return; }
    toast.success("Story deleted.");
    fetchStories();
  };

  // Simple rich text helpers
  const insertFormat = (prefix: string, suffix: string) => {
    const textarea = document.getElementById("story-content") as HTMLTextAreaElement;
    if (!textarea) return;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selected = form.content.substring(start, end);
    const newContent = form.content.substring(0, start) + prefix + selected + suffix + form.content.substring(end);
    setForm((f) => ({ ...f, content: newContent }));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Stories</h2>
        <button
          onClick={() => { setShowForm(true); setEditingId(null); setForm(emptyForm); }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-all"
        >
          <Plus className="w-4 h-4" /> New Story
        </button>
      </div>

      {/* Form */}
      {showForm && (
        <div className="bg-card border border-border rounded-2xl p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold">{editingId ? "Edit Story" : "New Story"}</h3>
            <button onClick={() => setShowForm(false)}><X className="w-4 h-4" /></button>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-1">Title *</label>
              <input
                className="w-full px-4 py-2 rounded-xl border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                value={form.title}
                onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
                placeholder="Story title"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-1">Subtitle</label>
              <input
                className="w-full px-4 py-2 rounded-xl border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                value={form.subtitle}
                onChange={(e) => setForm((f) => ({ ...f, subtitle: e.target.value }))}
                placeholder="A brief subtitle"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Genre</label>
              <select
                className="w-full px-4 py-2 rounded-xl border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                value={form.genre}
                onChange={(e) => setForm((f) => ({ ...f, genre: e.target.value }))}
              >
                {["General", "Sci-Fi", "Romance", "Horror", "Fantasy", "Mystery", "Literary"].map((g) => (
                  <option key={g} value={g}>{g}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Status</label>
              <select
                className="w-full px-4 py-2 rounded-xl border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                value={form.status}
                onChange={(e) => setForm((f) => ({ ...f, status: e.target.value }))}
              >
                <option value="Draft">Draft</option>
                <option value="Published">Published</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Word Count</label>
              <input
                type="number"
                className="w-full px-4 py-2 rounded-xl border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                value={form.word_count}
                onChange={(e) => setForm((f) => ({ ...f, word_count: parseInt(e.target.value) || 0 }))}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Read Time</label>
              <input
                className="w-full px-4 py-2 rounded-xl border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                value={form.read_time}
                onChange={(e) => setForm((f) => ({ ...f, read_time: e.target.value }))}
                placeholder="e.g. 8 min"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-1">Cover Image URL</label>
              <input
                className="w-full px-4 py-2 rounded-xl border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                value={form.cover_image}
                onChange={(e) => setForm((f) => ({ ...f, cover_image: e.target.value }))}
                placeholder="https://..."
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-1">Content</label>
              {/* Minimal toolbar */}
              <div className="flex gap-2 mb-2">
                {[
                  { icon: Bold, action: () => insertFormat("**", "**"), title: "Bold" },
                  { icon: Italic, action: () => insertFormat("_", "_"), title: "Italic" },
                  { icon: Quote, action: () => insertFormat("\n> ", "\n"), title: "Blockquote" },
                ].map(({ icon: Icon, action, title }) => (
                  <button
                    key={title}
                    type="button"
                    onClick={action}
                    title={title}
                    className="w-8 h-8 rounded-lg border border-input hover:bg-muted flex items-center justify-center"
                  >
                    <Icon className="w-3.5 h-3.5" />
                  </button>
                ))}
              </div>
              <textarea
                id="story-content"
                rows={8}
                className="w-full px-4 py-3 rounded-xl border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring resize-none font-mono text-sm"
                value={form.content}
                onChange={(e) => setForm((f) => ({ ...f, content: e.target.value }))}
                placeholder="Write your story here…"
              />
            </div>
          </div>
          <div className="flex gap-3 pt-2">
            <button
              onClick={handleSave}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-all"
            >
              <Check className="w-4 h-4" /> Save Story
            </button>
            <button
              onClick={() => setShowForm(false)}
              className="px-6 py-2.5 rounded-xl border border-border text-sm font-medium hover:bg-muted transition-all"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Stories Table */}
      {loading ? (
        <div className="space-y-3">
          {[1, 2, 3].map((i) => <div key={i} className="h-16 bg-muted rounded-xl animate-pulse" />)}
        </div>
      ) : stories.length === 0 ? (
        <div className="text-center py-16 text-muted-foreground">
          No stories yet. Click "New Story" to get started.
        </div>
      ) : (
        <div className="bg-card border border-border rounded-2xl overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="text-left px-4 py-3 text-sm font-medium text-muted-foreground">Title</th>
                <th className="text-left px-4 py-3 text-sm font-medium text-muted-foreground hidden sm:table-cell">Genre</th>
                <th className="text-left px-4 py-3 text-sm font-medium text-muted-foreground hidden md:table-cell">Words</th>
                <th className="text-left px-4 py-3 text-sm font-medium text-muted-foreground">Status</th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody>
              {stories.map((story, i) => (
                <tr key={story.id} className={`border-b border-border last:border-0 ${i % 2 === 0 ? "" : "bg-muted/20"}`}>
                  <td className="px-4 py-3">
                    <p className="font-medium text-sm truncate max-w-[200px]">{story.title}</p>
                    {story.subtitle && <p className="text-xs text-muted-foreground truncate max-w-[200px]">{story.subtitle}</p>}
                  </td>
                  <td className="px-4 py-3 text-sm text-muted-foreground hidden sm:table-cell">{story.genre}</td>
                  <td className="px-4 py-3 text-sm text-muted-foreground hidden md:table-cell">{story.word_count?.toLocaleString()}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${story.status === "Published" ? "bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300" : "bg-muted text-muted-foreground"}`}>
                      {story.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2 justify-end">
                      <button onClick={() => handleEdit(story)} className="p-1.5 rounded-lg hover:bg-muted transition-all" title="Edit">
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button onClick={() => handleDelete(story.id)} className="p-1.5 rounded-lg hover:bg-destructive/10 hover:text-destructive transition-all" title="Delete">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminStories;
