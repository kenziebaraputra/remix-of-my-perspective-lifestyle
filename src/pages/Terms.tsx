import { useEffect, useState } from "react";
import Header from "@/components/Header";
import { supabase } from "@/integrations/supabase/client";

const FALLBACK = `Agreement to Terms

By accessing or using Sulung Arung's website and services, you agree to be bound by these Terms of Service. If you disagree with any part of these terms, you may not access our services.

Use License

Permission is granted to temporarily access the materials on Sulung Arung's website for personal, non-commercial transitory viewing only. You may not modify or copy the materials, use them for any commercial purpose, or attempt to reverse engineer any software on our website.

User Content

When you post comments or other content on our website, you grant us a non-exclusive, worldwide, royalty-free license to use, reproduce, and display such content. You represent that you own or have the necessary rights to the content you post.

Prohibited Uses

You may not use our website in any way that violates any applicable law or regulation, to transmit any harmful or malicious code, to impersonate Sulung Arung or any of its representatives, or to spam or send unsolicited communications.

Intellectual Property

All content on Sulung Arung, including articles, images, logos, and designs, is the property of Sulung Arung or its content creators and is protected by international copyright laws.

Disclaimer

The materials on Sulung Arung's website are provided on an "as is" basis. Sulung Arung makes no warranties, expressed or implied, and disclaims all other warranties.

Limitations of Liability

In no event shall Sulung Arung or its suppliers be liable for any damages arising out of the use or inability to use the materials on our website.

Modifications

Sulung Arung may revise these Terms of Service at any time without notice. By using this website, you are agreeing to be bound by the current version of these Terms of Service.

Contact Information

If you have any questions about these Terms of Service, please contact us via the Contact page.`;

const Terms = () => {
  const [content, setContent] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContent = async () => {
      const { data } = await supabase
        .from("site_settings")
        .select("value")
        .eq("key", "legal_terms_content")
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
            Terms of Service
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

export default Terms;
