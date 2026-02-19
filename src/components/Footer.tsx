import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Instagram, Twitter, Youtube } from "lucide-react";
import { useLocation } from "react-router-dom";

interface FooterSettings {
  footer_instagram: string;
  footer_x: string;
  footer_youtube: string;
  footer_threads: string;
  footer_copyright: string;
  footer_privacy_url: string;
  footer_terms_url: string;
}

// Threads SVG icon (official logo shape)
const ThreadsIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 192 192"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path d="M141.537 88.988a66.667 66.667 0 0 0-2.518-1.143c-1.482-27.307-16.403-42.94-41.457-43.1h-.34c-14.986 0-27.449 6.396-35.12 18.036l13.779 9.452c5.73-8.695 14.724-10.548 21.348-10.548h.229c8.249.053 14.474 2.452 18.503 7.129 2.932 3.405 4.893 8.111 5.864 14.05-7.314-1.243-15.224-1.626-23.68-1.14-23.82 1.371-39.134 15.264-38.105 34.568.522 9.792 5.4 18.216 13.735 23.719 7.047 4.652 16.124 6.927 25.557 6.412 12.458-.683 22.231-5.436 29.049-14.127 5.178-6.6 8.453-15.153 9.899-25.93 5.937 3.583 10.337 8.298 12.767 13.966 4.132 9.635 4.373 25.468-8.546 38.376-11.319 11.308-24.925 16.2-45.488 16.351-22.809-.169-40.06-7.484-51.275-21.742C35.236 139.966 29.808 120.682 29.605 96c.203-24.682 5.63-43.966 16.133-57.317C56.954 24.425 74.206 17.11 97.015 16.94c22.975.17 40.526 7.52 52.171 21.847 5.71 7.026 10.015 15.86 12.853 26.162l16.147-4.308c-3.44-12.68-8.853-23.606-16.219-32.668C147.036 9.607 125.202.195 97.109 0h-.199C68.883.195 47.294 9.643 32.788 28.08 19.882 44.485 13.224 67.315 13.001 96v.5c.223 28.685 6.88 51.515 19.787 67.92 14.506 18.437 36.095 27.885 64.115 28.08h.199c24.926-.169 42.542-6.708 57.021-21.174 19.013-19.001 18.413-42.805 12.166-57.423-4.376-10.198-12.763-18.528-24.752-24.915ZM96.45 129.02c-10.437.571-21.286-4.076-21.82-14.018-.4-7.502 5.334-15.882 22.569-16.878 1.973-.113 3.917-.168 5.833-.168 6.05 0 11.7.594 16.873 1.734-1.92 23.658-13.221 28.79-23.455 29.33Z" />
  </svg>
);

// AdminFab — only shown outside admin pages
const AdminFab = () => {
  const location = useLocation();
  if (location.pathname.startsWith("/admin")) return null;
  return (
    <a
      href="/admin"
      aria-label="Admin"
      className="absolute bottom-3 right-3 w-2 h-2 rounded-full bg-foreground/20 hover:bg-foreground/50 transition-colors duration-200"
      title="Admin"
    />
  );
};

const Footer = () => {
  const [settings, setSettings] = useState<FooterSettings>({
    footer_instagram: "https://instagram.com/sulungarung",
    footer_x: "https://x.com/sulungarung",
    footer_youtube: "https://youtube.com/@sulungarung",
    footer_threads: "https://threads.net/@sulungarung",
    footer_copyright: "© 2026 Sulung Arung. All rights reserved.",
    footer_privacy_url: "/privacy",
    footer_terms_url: "/terms",
  });

  useEffect(() => {
    const fetchSettings = async () => {
      const { data } = await supabase
        .from("site_settings")
        .select("key, value")
        .in("key", [
          "footer_instagram",
          "footer_x",
          "footer_youtube",
          "footer_threads",
          "footer_copyright",
          "footer_privacy_url",
          "footer_terms_url",
        ]);
      if (data) {
        const mapped: Record<string, string> = {};
        data.forEach((row) => { if (row.value) mapped[row.key] = row.value; });
        setSettings((prev) => ({ ...prev, ...mapped }));
      }
    };
    fetchSettings();
  }, []);

  return (
    <footer className="relative border-t border-border mt-16">
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
                <a href={settings.footer_youtube} target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors flex items-center gap-2">
                  <Youtube className="w-4 h-4" /> YouTube
                </a>
              </li>
              <li>
                <a href={settings.footer_threads} target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors flex items-center gap-2">
                  <ThreadsIcon className="w-4 h-4" /> Threads
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Legal</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href={settings.footer_privacy_url} className="hover:text-accent transition-colors">Privacy Policy</a></li>
              <li><a href={settings.footer_terms_url} className="hover:text-accent transition-colors">Terms of Service</a></li>
            </ul>
          </div>
        </div>
        <div className="pt-8 border-t border-border text-center text-sm text-muted-foreground">
          <p>{settings.footer_copyright}</p>
        </div>
      </div>
      <AdminFab />
    </footer>
  );
};

export default Footer;
