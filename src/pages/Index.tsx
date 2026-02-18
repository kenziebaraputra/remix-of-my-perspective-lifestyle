import { useState, useEffect } from "react";
import { toast } from "sonner";
import Header from "@/components/Header";
import ArticleCard from "@/components/ArticleCard";
import HeroSection from "@/components/HeroSection";
import IntroSection from "@/components/IntroSection";
import Footer from "@/components/Footer";
import { articles } from "@/data/articles";
import { supabase } from "@/integrations/supabase/client";

const GENRES = ["All", "Sci-Fi", "Romance", "Horror", "Personal", "Reflection", "Art"];

const Index = () => {
  const [activeGenre, setActiveGenre] = useState("All");
  const [email, setEmail] = useState("");
  const [subscribing, setSubscribing] = useState(false);
  const [visible, setVisible] = useState(true);

  const storyArticles = articles.filter((a) => a.category === "Stories" || a.category === "Journals" || a.category === "Illustrations");

  const filteredArticles =
    activeGenre === "All"
      ? storyArticles
      : storyArticles.filter((a) => a.genre === activeGenre);

  const handleGenreChange = (genre: string) => {
    setVisible(false);
    setTimeout(() => {
      setActiveGenre(genre);
      setVisible(true);
    }, 200);
  };

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      toast.error("Please enter a valid email address.");
      return;
    }
    setSubscribing(true);
    const { error } = await supabase.from("newsletter_subscribers").insert({ email });
    setSubscribing(false);
    if (error) {
      if (error.code === "23505") {
        toast.info("You're already subscribed!");
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    } else {
      toast.success("You're subscribed! Welcome to the world of Sulung Arung.");
      setEmail("");
    }
  };

  return (
    <div className="min-h-screen bg-background animate-fade-in">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <HeroSection />
        <IntroSection />

        {/* Category Filter Bar */}
        <section id="articles" className="py-12">
          <div className="flex items-center justify-between mb-8 animate-slide-up">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Featured Stories</h2>
          </div>

          <div className="flex flex-wrap gap-3 mb-10 animate-slide-up stagger-1">
            {GENRES.map((genre) => (
              <button
                key={genre}
                onClick={() => handleGenreChange(genre)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeGenre === genre
                    ? "bg-primary text-primary-foreground shadow-md scale-105"
                    : "bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground"
                }`}
              >
                {genre}
              </button>
            ))}
          </div>

          <div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 transition-opacity duration-200"
            style={{ opacity: visible ? 1 : 0 }}
          >
            {filteredArticles.length === 0 ? (
              <p className="col-span-3 text-center text-muted-foreground py-12">
                No stories in this genre yet. Check back soon!
              </p>
            ) : (
              filteredArticles.map((article, index) => (
                <div key={article.id} className={`animate-slide-up stagger-${Math.min(index + 1, 6)}`}>
                  <ArticleCard {...article} size="small" />
                </div>
              ))
            )}
          </div>
        </section>

        {/* Newsletter Section */}
        <section className="my-20 rounded-[2.5rem] bg-card p-12 md:p-16 text-center animate-scale-in">
          <div className="max-w-2xl mx-auto space-y-8">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight">Stay in the story.</h2>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Subscribe to receive new stories, journals, and illustrations directly in your inbox.
            </p>
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email"
                className="flex-1 px-6 py-4 rounded-full border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring transition-all"
                required
              />
              <button
                type="submit"
                disabled={subscribing}
                className="px-10 py-4 rounded-full bg-primary text-primary-foreground font-medium hover:bg-primary/90 hover:scale-105 transition-all disabled:opacity-50"
              >
                {subscribing ? "Subscribing…" : "Subscribe"}
              </button>
            </form>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
