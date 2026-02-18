import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Save } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type Settings = Record<string, string>;

const SETTING_KEYS = [
  "hero_title", "hero_subtitle", "intro_text",
  "about_bio", "about_image",
  "footer_email", "footer_instagram", "footer_x", "footer_youtube", "footer_copyright",
  "footer_privacy_url", "footer_terms_url",
];

// Field component defined outside so it doesn't remount on every keystroke
const Field = ({
  label,
  value,
  onChange,
  multiline = false,
  placeholder = "",
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  multiline?: boolean;
  placeholder?: string;
}) => (
  <div>
    <label className="block text-sm font-medium mb-1">{label}</label>
    {multiline ? (
      <textarea
        rows={5}
        className="w-full px-4 py-3 rounded-xl border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring resize-none"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
      />
    ) : (
      <input
        className="w-full px-4 py-3 rounded-xl border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
      />
    )}
  </div>
);

const AdminSettings = () => {
  const [settings, setSettings] = useState<Settings>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchSettings = async () => {
      const { data } = await supabase.from("site_settings").select("key, value").in("key", SETTING_KEYS);
      if (data) {
        const mapped: Settings = {};
        data.forEach((row) => { if (row.value !== null) mapped[row.key] = row.value; });
        setSettings(mapped);
      }
      setLoading(false);
    };
    fetchSettings();
  }, []);

  const setValue = (key: string, value: string) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = async () => {
    setSaving(true);
    const updates = Object.entries(settings).map(([key, value]) =>
      supabase.from("site_settings").upsert({ key, value }, { onConflict: "key" })
    );
    const results = await Promise.all(updates);
    setSaving(false);
    const hasError = results.some((r) => r.error);
    if (hasError) {
      toast.error("Some settings failed to save.");
    } else {
      toast.success("Settings saved! Changes are live on the public site.");
    }
  };

  if (loading) {
    return <div className="space-y-4">{[1,2,3,4].map((i) => <div key={i} className="h-12 bg-muted rounded-xl animate-pulse" />)}</div>;
  }

  return (
    <div className="space-y-6 max-w-3xl">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Site Settings</h2>
        <button
          onClick={handleSave}
          disabled={saving}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 disabled:opacity-50 transition-all"
        >
          <Save className="w-4 h-4" />
          {saving ? "Saving…" : "Save Changes"}
        </button>
      </div>

      <Tabs defaultValue="home">
        <TabsList className="mb-6">
          <TabsTrigger value="home">Home</TabsTrigger>
          <TabsTrigger value="about">About</TabsTrigger>
          <TabsTrigger value="social">Footer & Social</TabsTrigger>
          <TabsTrigger value="legal">Legal</TabsTrigger>
        </TabsList>

        <TabsContent value="home" className="space-y-4">
          <Field label="Hero Title" value={settings["hero_title"] ?? ""} onChange={(v) => setValue("hero_title", v)} placeholder="Where Every Story Begins" />
          <Field label="Hero Subtitle" value={settings["hero_subtitle"] ?? ""} onChange={(v) => setValue("hero_subtitle", v)} multiline placeholder="Welcome to Sulung Arung…" />
          <Field label="Intro Text" value={settings["intro_text"] ?? ""} onChange={(v) => setValue("intro_text", v)} multiline placeholder="Sulung Arung is a creative space…" />
        </TabsContent>

        <TabsContent value="about" className="space-y-4">
          <Field label="Biography" value={settings["about_bio"] ?? ""} onChange={(v) => setValue("about_bio", v)} multiline placeholder="Tell your story…" />
          <Field label="About Image URL" value={settings["about_image"] ?? ""} onChange={(v) => setValue("about_image", v)} placeholder="https://..." />
          {settings.about_image && (
            <div className="rounded-2xl overflow-hidden aspect-square max-w-xs">
              <img src={settings.about_image} alt="Preview" className="w-full h-full object-cover" />
            </div>
          )}
        </TabsContent>

        <TabsContent value="social" className="space-y-4">
          <Field label="Contact Email" value={settings["footer_email"] ?? ""} onChange={(v) => setValue("footer_email", v)} placeholder="hello@sulungarung.com" />
          <Field label="Instagram URL" value={settings["footer_instagram"] ?? ""} onChange={(v) => setValue("footer_instagram", v)} placeholder="https://instagram.com/..." />
          <Field label="X (Twitter) URL" value={settings["footer_x"] ?? ""} onChange={(v) => setValue("footer_x", v)} placeholder="https://x.com/..." />
          <Field label="YouTube URL" value={settings["footer_youtube"] ?? ""} onChange={(v) => setValue("footer_youtube", v)} placeholder="https://youtube.com/@..." />
          <Field label="Copyright Text" value={settings["footer_copyright"] ?? ""} onChange={(v) => setValue("footer_copyright", v)} placeholder="© 2026 Sulung Arung. All rights reserved." />
        </TabsContent>

        <TabsContent value="legal" className="space-y-4">
          <Field label="Privacy Policy URL" value={settings["footer_privacy_url"] ?? ""} onChange={(v) => setValue("footer_privacy_url", v)} placeholder="/privacy" />
          <Field label="Terms of Service URL" value={settings["footer_terms_url"] ?? ""} onChange={(v) => setValue("footer_terms_url", v)} placeholder="/terms" />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminSettings;
