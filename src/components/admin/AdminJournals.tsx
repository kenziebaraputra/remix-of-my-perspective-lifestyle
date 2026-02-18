import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Plus, Trash2, Edit2, X, Check } from "lucide-react";

interface Journal {
  id: string;
  title: string;
  content: string | null;
  category: string | null;
  status: string | null;
  cover_image: string | null;
  created_at: string;
}

const AdminJournals = () => {
  const [journals, setJournals] = useState<Journal[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const emptyForm = { title: "", content: "", category: "General", status: "Draft", cover_image: "" };
  const [form, setForm] = useState(emptyForm);

  const fetchJournals = async () => {
    setLoading(true);
    const { data } = await supabase.from("journals").select("*").order("created_at", { ascending: false });
    setLoading(false);
    if (data) setJournals(data);
  };

  useEffect(() => { fetchJournals(); }, []);

  const handleSave = async () => {
    if (!form.title.trim()) { toast.error("Title is required."); return; }
    let error;
    if (editingId) {
      ({ error } = await supabase.from("journals").update(form).eq("id", editingId));
    } else {
      ({ error } = await supabase.from("journals").insert(form));
    }
    if (error) { toast.error("Failed to save."); return; }
    toast.success(editingId ? "Journal updated!" : "Journal created!");
    setShowForm(false);
    setEditingId(null);
    setForm(emptyForm);
    fetchJournals();
  };

  const handleEdit = (j: Journal) => {
    setForm({ title: j.title, content: j.content ?? "", category: j.category ?? "General", status: j.status ?? "Draft", cover_image: j.cover_image ?? "" });
    setEditingId(j.id);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this journal entry?")) return;
    const { error } = await supabase.from("journals").delete().eq("id", id);
    if (error) { toast.error("Failed to delete."); return; }
    toast.success("Deleted.");
    fetchJournals();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Journals</h2>
        <button
          onClick={() => { setShowForm(true); setEditingId(null); setForm(emptyForm); }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-all"
        >
          <Plus className="w-4 h-4" /> New Entry
        </button>
      </div>

      {showForm && (
        <div className="bg-card border border-border rounded-2xl p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold">{editingId ? "Edit Entry" : "New Journal Entry"}</h3>
            <button onClick={() => setShowForm(false)}><X className="w-4 h-4" /></button>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-1">Title *</label>
              <input className="w-full px-4 py-2 rounded-xl border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring" value={form.title} onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))} placeholder="Entry title" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Category</label>
              <input className="w-full px-4 py-2 rounded-xl border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring" value={form.category} onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))} placeholder="e.g. Writing Life, Reflection" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Status</label>
              <select className="w-full px-4 py-2 rounded-xl border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring" value={form.status} onChange={(e) => setForm((f) => ({ ...f, status: e.target.value }))}>
                <option value="Draft">Draft</option>
                <option value="Published">Published</option>
              </select>
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-1">Cover Image URL</label>
              <input className="w-full px-4 py-2 rounded-xl border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring" value={form.cover_image} onChange={(e) => setForm((f) => ({ ...f, cover_image: e.target.value }))} placeholder="https://..." />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-1">Content</label>
              <textarea rows={8} className="w-full px-4 py-3 rounded-xl border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring resize-none" value={form.content} onChange={(e) => setForm((f) => ({ ...f, content: e.target.value }))} placeholder="Write your journal entry…" />
            </div>
          </div>
          <div className="flex gap-3">
            <button onClick={handleSave} className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-all">
              <Check className="w-4 h-4" /> Save
            </button>
            <button onClick={() => setShowForm(false)} className="px-6 py-2.5 rounded-xl border border-border text-sm font-medium hover:bg-muted transition-all">Cancel</button>
          </div>
        </div>
      )}

      {loading ? (
        <div className="space-y-3">{[1,2,3].map((i) => <div key={i} className="h-16 bg-muted rounded-xl animate-pulse" />)}</div>
      ) : journals.length === 0 ? (
        <div className="text-center py-16 text-muted-foreground">No journal entries yet.</div>
      ) : (
        <div className="bg-card border border-border rounded-2xl overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="text-left px-4 py-3 text-sm font-medium text-muted-foreground">Title</th>
                <th className="text-left px-4 py-3 text-sm font-medium text-muted-foreground hidden sm:table-cell">Category</th>
                <th className="text-left px-4 py-3 text-sm font-medium text-muted-foreground">Status</th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody>
              {journals.map((j, i) => (
                <tr key={j.id} className={`border-b border-border last:border-0 ${i % 2 === 0 ? "" : "bg-muted/20"}`}>
                  <td className="px-4 py-3 font-medium text-sm">{j.title}</td>
                  <td className="px-4 py-3 text-sm text-muted-foreground hidden sm:table-cell">{j.category}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${j.status === "Published" ? "bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300" : "bg-muted text-muted-foreground"}`}>{j.status}</span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2 justify-end">
                      <button onClick={() => handleEdit(j)} className="p-1.5 rounded-lg hover:bg-muted"><Edit2 className="w-4 h-4" /></button>
                      <button onClick={() => handleDelete(j.id)} className="p-1.5 rounded-lg hover:bg-destructive/10 hover:text-destructive"><Trash2 className="w-4 h-4" /></button>
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

export default AdminJournals;
