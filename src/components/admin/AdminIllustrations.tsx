import { useEffect, useState, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Upload, Trash2, X, Check, Image } from "lucide-react";

interface Illustration {
  id: string;
  title: string;
  description: string | null;
  image_url: string;
  status: string | null;
  created_at: string;
}

const AdminIllustrations = () => {
  const [illustrations, setIllustrations] = useState<Illustration[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [form, setForm] = useState({ title: "", description: "", image_url: "", status: "Published" });
  const fileInputRef = useRef<HTMLInputElement>(null);

  const fetchIllustrations = async () => {
    setLoading(true);
    const { data } = await supabase.from("illustrations").select("*").order("created_at", { ascending: false });
    setLoading(false);
    if (data) setIllustrations(data);
  };

  useEffect(() => { fetchIllustrations(); }, []);

  const handleFileUpload = async (file: File) => {
    if (!file.type.startsWith("image/")) { toast.error("Please upload an image file."); return; }
    setUploading(true);
    const ext = file.name.split(".").pop();
    const path = `illustrations/${Date.now()}.${ext}`;
    const { error, data } = await supabase.storage.from("media").upload(path, file);
    setUploading(false);
    if (error) { toast.error("Upload failed."); return; }
    const { data: urlData } = supabase.storage.from("media").getPublicUrl(path);
    setForm((f) => ({ ...f, image_url: urlData.publicUrl }));

    // Also add to media library
    await supabase.from("media_library").insert({ filename: file.name, url: urlData.publicUrl, file_type: file.type, file_size: file.size });
    toast.success("Image uploaded!");
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFileUpload(file);
  };

  const handleSave = async () => {
    if (!form.title.trim() || !form.image_url) { toast.error("Title and image are required."); return; }
    const { error } = await supabase.from("illustrations").insert(form);
    if (error) { toast.error("Failed to save."); return; }
    toast.success("Illustration added!");
    setShowForm(false);
    setForm({ title: "", description: "", image_url: "", status: "Published" });
    fetchIllustrations();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this illustration?")) return;
    const { error } = await supabase.from("illustrations").delete().eq("id", id);
    if (error) { toast.error("Failed to delete."); return; }
    toast.success("Deleted.");
    fetchIllustrations();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Illustrations</h2>
        <button onClick={() => setShowForm(true)} className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-all">
          <Upload className="w-4 h-4" /> Upload
        </button>
      </div>

      {showForm && (
        <div className="bg-card border border-border rounded-2xl p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold">New Illustration</h3>
            <button onClick={() => setShowForm(false)}><X className="w-4 h-4" /></button>
          </div>

          {/* Drag & Drop Zone */}
          <div
            onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
            onDragLeave={() => setDragging(false)}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`border-2 border-dashed rounded-2xl p-12 text-center cursor-pointer transition-all ${dragging ? "border-primary bg-primary/5" : "border-border hover:border-primary/50 hover:bg-muted/50"}`}
          >
            {form.image_url ? (
              <div className="space-y-3">
                <img src={form.image_url} alt="Preview" className="max-h-48 mx-auto rounded-xl object-contain" />
                <p className="text-sm text-muted-foreground">Image ready. Click to change.</p>
              </div>
            ) : (
              <div className="space-y-3">
                <Image className="w-10 h-10 mx-auto text-muted-foreground" />
                <p className="text-sm font-medium">{uploading ? "Uploading…" : "Drag & drop or click to upload"}</p>
                <p className="text-xs text-muted-foreground">PNG, JPG, WEBP supported</p>
              </div>
            )}
            <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={(e) => { if (e.target.files?.[0]) handleFileUpload(e.target.files[0]); }} />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Title *</label>
            <input className="w-full px-4 py-2 rounded-xl border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring" value={form.title} onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))} placeholder="Illustration title" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Description</label>
            <textarea rows={3} className="w-full px-4 py-3 rounded-xl border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring resize-none" value={form.description} onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))} placeholder="Brief description…" />
          </div>

          <div className="flex gap-3">
            <button onClick={handleSave} disabled={uploading} className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 disabled:opacity-50 transition-all">
              <Check className="w-4 h-4" /> Save
            </button>
            <button onClick={() => setShowForm(false)} className="px-6 py-2.5 rounded-xl border border-border text-sm font-medium hover:bg-muted transition-all">Cancel</button>
          </div>
        </div>
      )}

      {loading ? (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">{[1,2,3,4,5,6].map((i) => <div key={i} className="aspect-square bg-muted rounded-2xl animate-pulse" />)}</div>
      ) : illustrations.length === 0 ? (
        <div className="text-center py-16 text-muted-foreground">No illustrations yet. Upload one to get started.</div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {illustrations.map((ill) => (
            <div key={ill.id} className="group relative bg-card border border-border rounded-2xl overflow-hidden">
              <div className="aspect-square">
                <img src={ill.image_url} alt={ill.title} className="w-full h-full object-cover" />
              </div>
              <div className="p-3">
                <p className="text-sm font-medium truncate">{ill.title}</p>
                {ill.description && <p className="text-xs text-muted-foreground truncate">{ill.description}</p>}
              </div>
              <button
                onClick={() => handleDelete(ill.id)}
                className="absolute top-2 right-2 w-8 h-8 rounded-full bg-destructive/90 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminIllustrations;
