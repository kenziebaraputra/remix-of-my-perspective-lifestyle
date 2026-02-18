import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Save } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type Settings = Record<string, string>;

const SETTING_KEYS = [
  "hero_title", "hero_subtitle", "intro_text",
  "about_bio", "about_image",
  "footer_email", "footer_instagram", "footer_x", "footer_copyright",
];

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

  const Field = ({ label, keyName, multiline = false, placeholder = "" }: { label: string; keyName: string; multiline?: boolean; placeholder?: string }) => (
    <div>
      <label className="block text-sm font-medium mb-1">{label}</label>
      {multiline ? (
        <textarea
          rows={5}
          className="w-full px-4 py-3 rounded-xl border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring resize-none"
          value={settings[keyName] ?? ""}
          onChange={(e) => setValue(keyName, e.target.value)}
          placeholder={placeholder}
        />
      ) : (
        <input
          className="w-full px-4 py-3 rounded-xl border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring"
          value={settings[keyName] ?? ""}
          onChange={(e) => setValue(keyName, e.target.value)}
          placeholder={placeholder}
        />
      )}
    </div>
  );

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
        </TabsList>

        <TabsContent value="home" className="space-y-4">
          <Field label="Hero Title" keyName="hero_title" placeholder="Where Every Story Begins" />
          <Field label="Hero Subtitle" keyName="hero_subtitle" multiline placeholder="Welcome to Sulung Arung…" />
          <Field label="Intro Text" keyName="intro_text" multiline placeholder="Sulung Arung is a creative space…" />
        </TabsContent>

        <TabsContent value="about" className="space-y-4">
          <Field label="Biography" keyName="about_bio" multiline placeholder="Tell your story…" />
          <Field label="About Image URL" keyName="about_image" placeholder="https://..." />
          {settings.about_image && (
            <div className="rounded-2xl overflow-hidden aspect-square max-w-xs">
              <img src={settings.about_image} alt="Preview" className="w-full h-full object-cover" />
            </div>
          )}
        </TabsContent>

        <TabsContent value="social" className="space-y-4">
          <Field label="Contact Email" keyName="footer_email" placeholder="hello@sulungarung.com" />
          <Field label="Instagram URL" keyName="footer_instagram" placeholder="https://instagram.com/..." />
          <Field label="X (Twitter) URL" keyName="footer_x" placeholder="https://x.com/..." />
          <Field label="Copyright Text" keyName="footer_copyright" placeholder="© 2026 Sulung Arung. All rights reserved." />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminSettings;
