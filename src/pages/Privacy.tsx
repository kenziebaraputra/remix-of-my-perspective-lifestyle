import { useEffect, useState } from "react";
import Header from "@/components/Header";
import { supabase } from "@/integrations/supabase/client";

const FALLBACK = `Introduction

At Sulung Arung, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and subscribe to our newsletter.

Information We Collect

We may collect personal information that you voluntarily provide to us when you subscribe to our newsletter, contact us through our contact form, or comment on our articles.

How We Use Your Information

We use the information we collect to send you our newsletter and marketing communications, respond to your comments and questions, improve our website and content, and analyze usage patterns and trends.

Cookies and Tracking Technologies

We use cookies and similar tracking technologies to track activity on our website and store certain information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.

Data Security

We implement appropriate technical and organizational security measures to protect your personal information. However, no method of transmission over the Internet is 100% secure.

Your Rights

Depending on your location, you may have certain rights regarding your personal information, including the right to access, rectify, erase, or port your data, and to withdraw consent.

Changes to This Privacy Policy

We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.

Contact Us

If you have any questions about this Privacy Policy, please contact us via the Contact page.`;

const Privacy = () => {
  const [content, setContent] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContent = async () => {
      const { data } = await supabase
        .from("site_settings")
        .select("value")
        .eq("key", "legal_privacy_content")
        .maybeSingle();
      setContent(data?.value ?? null);
      setLoading(false);
    };
    fetchContent();
  }, []);

  const displayContent = content || FALLBACK;

  return (
    <div className="min-h-screen bg-background animate-fade-in">
      <Header />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-12 space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold leading-tight animate-slide-down">
            Privacy Policy
          </h1>
          <p className="text-muted-foreground animate-slide-up stagger-1">
            Last updated: 2026
          </p>
        </div>

        {loading ? (
          <div className="space-y-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-6 bg-muted rounded animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="prose prose-lg max-w-none">
            <p className="text-muted-foreground whitespace-pre-wrap leading-relaxed">{displayContent}</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default Privacy;
