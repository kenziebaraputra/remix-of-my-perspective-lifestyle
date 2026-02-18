import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { supabase } from "@/integrations/supabase/client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Mail } from "lucide-react";

interface AboutSettings {
  about_bio: string;
  about_image: string;
}

const About = () => {
  const [settings, setSettings] = useState<AboutSettings>({
    about_bio:
      "I am Sulung Arung — a fiction writer, journal keeper, and occasional illustrator. My stories wander between science fiction, romance, and horror, always searching for the extraordinary within the ordinary. This space is where I share those wanderings with you.",
    about_image: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800&q=80",
  });

  useEffect(() => {
    const fetchSettings = async () => {
      const { data } = await supabase
        .from("site_settings")
        .select("key, value")
        .in("key", ["about_bio", "about_image"]);
      if (data) {
        const mapped: Record<string, string> = {};
        data.forEach((row) => { if (row.value) mapped[row.key] = row.value; });
        setSettings((prev) => ({ ...prev, ...mapped }));
      }
    };
    fetchSettings();
  }, []);

  return (
    <>
      <Helmet>
        <title>About — Sulung Arung</title>
        <meta name="description" content="About Sulung Arung — fiction writer, journal keeper, and illustrator." />
      </Helmet>
      <div className="min-h-screen bg-background animate-fade-in">
        <Header />

        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="mb-16 text-center space-y-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight animate-slide-down">
              About Sulung Arung
            </h1>
          </div>

          {/* Bio Section */}
          <section className="mb-16 grid md:grid-cols-2 gap-12 items-center animate-slide-up stagger-1">
            <div className="rounded-[2.5rem] overflow-hidden aspect-square">
              <img
                src={settings.about_image}
                alt="Sulung Arung"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="space-y-6">
              <h2 className="text-3xl font-bold">Hello, I'm Sulung.</h2>
              <p className="text-lg text-muted-foreground leading-relaxed whitespace-pre-wrap">
                {settings.about_bio}
              </p>
            </div>
          </section>

          {/* What You'll Find */}
          <section className="mb-16 rounded-2xl bg-card p-8 md:p-12 animate-slide-up stagger-2">
            <h2 className="text-3xl font-bold mb-6">What You'll Find Here</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-lg">📖</div>
                <h3 className="text-xl font-semibold">Stories</h3>
                <p className="text-muted-foreground text-sm">
                  Original fiction across genres — science fiction, romance, horror, and the unnamed territory between them.
                </p>
              </div>
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-lg">📓</div>
                <h3 className="text-xl font-semibold">Journals</h3>
                <p className="text-muted-foreground text-sm">
                  Honest reflections on the writing life, creative practice, and what happens when you pay attention to ordinary things.
                </p>
              </div>
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-lg">🎨</div>
                <h3 className="text-xl font-semibold">Illustrations</h3>
                <p className="text-muted-foreground text-sm">
                  Visual work — the sketches and images that help me understand the stories before the words arrive.
                </p>
              </div>
            </div>
          </section>

          {/* CTA */}
          <section className="text-center py-12 rounded-2xl bg-muted animate-slide-up stagger-3">
            <h2 className="text-3xl font-bold mb-4">Stay in touch</h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              Subscribe for new stories, journals, and occasional behind-the-scenes notes on the creative process.
            </p>
            <a
              href="mailto:hello@sulungarung.com"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-primary text-primary-foreground font-medium hover:bg-primary/90 hover:scale-105 transition-all"
            >
              <Mail className="h-4 w-4" />
              Get in touch
            </a>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default About;
