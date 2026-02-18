import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ArticleCard from "@/components/ArticleCard";
import { articles } from "@/data/articles";

const Stories = () => {
  const storyArticles = articles.filter((a) => a.category === "Stories");

  return (
    <>
      <Helmet>
        <title>Stories — Sulung Arung</title>
        <meta name="description" content="Dive into original fiction by Sulung Arung — Sci-Fi, Romance, Horror, and more." />
      </Helmet>
      <div className="min-h-screen bg-background animate-fade-in">
        <Header />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="mb-16 text-center space-y-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight animate-slide-down">
              Stories
            </h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed animate-slide-up stagger-1">
              Original fiction spanning science fiction, romance, horror, and the spaces in between.
              Each story is an invitation to wander somewhere new.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {storyArticles.map((article, index) => (
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

export default Stories;
