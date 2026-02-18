import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Trash2, Copy } from "lucide-react";

interface MediaItem {
  id: string;
  filename: string;
  url: string;
  file_type: string | null;
  file_size: number | null;
  created_at: string;
}

const AdminMedia = () => {
  const [media, setMedia] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchMedia = async () => {
    setLoading(true);
    const { data } = await supabase.from("media_library").select("*").order("created_at", { ascending: false });
    setLoading(false);
    if (data) setMedia(data);
  };

  useEffect(() => { fetchMedia(); }, []);

  const handleCopyUrl = (url: string) => {
    navigator.clipboard.writeText(url);
    toast.success("URL copied!");
  };

  const handleDelete = async (item: MediaItem) => {
    if (!confirm("Delete this media file?")) return;
    // Extract path from URL
    try {
      const urlObj = new URL(item.url);
      const pathParts = urlObj.pathname.split("/media/");
      if (pathParts.length > 1) {
        await supabase.storage.from("media").remove([pathParts[1]]);
      }
    } catch {}
    await supabase.from("media_library").delete().eq("id", item.id);
    toast.success("Deleted.");
    fetchMedia();
  };

  const formatSize = (bytes: number | null) => {
    if (!bytes) return "—";
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Media Library</h2>
      <p className="text-sm text-muted-foreground">Images uploaded via the Illustrations section appear here.</p>

      {loading ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {[1,2,3,4].map((i) => <div key={i} className="aspect-square bg-muted rounded-2xl animate-pulse" />)}
        </div>
      ) : media.length === 0 ? (
        <div className="text-center py-16 text-muted-foreground">No media files yet. Upload illustrations to populate the library.</div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {media.map((item) => (
            <div key={item.id} className="group relative bg-card border border-border rounded-2xl overflow-hidden">
              <div className="aspect-square bg-muted">
                {item.file_type?.startsWith("image/") ? (
                  <img src={item.url} alt={item.filename} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-muted-foreground text-sm">{item.file_type}</div>
                )}
              </div>
              <div className="p-3">
                <p className="text-xs font-medium truncate">{item.filename}</p>
                <p className="text-xs text-muted-foreground">{formatSize(item.file_size)}</p>
              </div>
              <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-all">
                <button onClick={() => handleCopyUrl(item.url)} className="w-7 h-7 rounded-full bg-background/90 border border-border flex items-center justify-center" title="Copy URL">
                  <Copy className="w-3 h-3" />
                </button>
                <button onClick={() => handleDelete(item)} className="w-7 h-7 rounded-full bg-destructive/90 text-white flex items-center justify-center" title="Delete">
                  <Trash2 className="w-3 h-3" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminMedia;
