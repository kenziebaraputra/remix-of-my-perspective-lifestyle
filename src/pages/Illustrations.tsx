import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { supabase } from "@/integrations/supabase/client";
import { articles } from "@/data/articles";
import ArticleCard from "@/components/ArticleCard";

interface Illustration {
  id: string;
  title: string;
  description: string | null;
  image_url: string;
  created_at: string;
}

const Illustrations = () => {
  const [illustrations, setIllustrations] = useState<Illustration[]>([]);

  useEffect(() => {
    const fetchIllustrations = async () => {
      const { data } = await supabase
        .from("illustrations")
        .select("*")
        .eq("status", "Published")
        .order("created_at", { ascending: false });
      if (data) setIllustrations(data);
    };
    fetchIllustrations();
  }, []);

  // Also show illustration articles from static data
  const illustrationArticles = articles.filter((a) => a.category === "Illustrations");

  return (
    <>
      <Helmet>
        <title>Illustrations — Sulung Arung</title>
        <meta name="description" content="Visual art and illustrations by Sulung Arung — the images that live between the stories." />
      </Helmet>
      <div className="min-h-screen bg-background animate-fade-in">
        <Header />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="mb-16 text-center space-y-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight animate-slide-down">
              Illustrations
            </h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed animate-slide-up stagger-1">
              Visual work that lives alongside the words — sketches, studies, and the images
              that come before the story finds its language.
            </p>
          </div>

          {/* Dynamic Illustrations from DB */}
          {illustrations.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {illustrations.map((ill, index) => (
                <div key={ill.id} className={`animate-slide-up stagger-${Math.min(index + 1, 6)}`}>
                  <div className="rounded-[2.5rem] overflow-hidden bg-muted group">
                    <div className="aspect-[4/3] overflow-hidden">
                      <img
                        src={ill.image_url}
                        alt={ill.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="font-bold text-lg mb-2">{ill.title}</h3>
                      {ill.description && (
                        <p className="text-muted-foreground text-sm">{ill.description}</p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Static illustration articles */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {illustrationArticles.map((article, index) => (
              <div key={article.id} className={`animate-slide-up stagger-${Math.min(index + 2, 6)}`}>
                <ArticleCard {...article} />
              </div>
            ))}
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Illustrations;
