import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Instagram, Twitter, Mail } from "lucide-react";

interface FooterSettings {
  footer_email: string;
  footer_instagram: string;
  footer_x: string;
  footer_copyright: string;
}

const Footer = () => {
  const [settings, setSettings] = useState<FooterSettings>({
    footer_email: "hello@sulungarung.com",
    footer_instagram: "https://instagram.com/sulungarung",
    footer_x: "https://x.com/sulungarung",
    footer_copyright: "© 2026 Sulung Arung. All rights reserved.",
  });

  useEffect(() => {
    const fetchSettings = async () => {
      const { data } = await supabase
        .from("site_settings")
        .select("key, value")
        .in("key", ["footer_email", "footer_instagram", "footer_x", "footer_copyright"]);
      if (data) {
        const mapped: Record<string, string> = {};
        data.forEach((row) => { if (row.value) mapped[row.key] = row.value; });
        setSettings((prev) => ({ ...prev, ...mapped }));
      }
    };
    fetchSettings();
  }, []);

  return (
    <footer className="border-t border-border mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="font-semibold mb-4">Explore</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="/stories" className="hover:text-accent transition-colors">Stories</a></li>
              <li><a href="/journals" className="hover:text-accent transition-colors">Journals</a></li>
              <li><a href="/illustrations" className="hover:text-accent transition-colors">Illustrations</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4">About</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="/about" className="hover:text-accent transition-colors">About Me</a></li>
              <li><a href="/contact" className="hover:text-accent transition-colors">Contact</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Connect</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href={settings.footer_instagram} target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors flex items-center gap-2">
                  <Instagram className="w-4 h-4" /> Instagram
                </a>
              </li>
              <li>
                <a href={settings.footer_x} target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors flex items-center gap-2">
                  <Twitter className="w-4 h-4" /> X (Twitter)
                </a>
              </li>
              <li>
                <a href={`mailto:${settings.footer_email}`} className="hover:text-accent transition-colors flex items-center gap-2">
                  <Mail className="w-4 h-4" /> Email
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Legal</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="/privacy" className="hover:text-accent transition-colors">Privacy Policy</a></li>
              <li><a href="/terms" className="hover:text-accent transition-colors">Terms of Service</a></li>
            </ul>
          </div>
        </div>
        <div className="pt-8 border-t border-border text-center text-sm text-muted-foreground">
          <p>{settings.footer_copyright}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
