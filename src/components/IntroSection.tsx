import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

const IntroSection = () => {
  const [introText, setIntroText] = useState(
    "Sulung Arung is a creative space for exploring worlds through fiction, personal journals, and visual art. Dive into stories that spark imagination and journals that capture the beauty of the everyday."
  );

  useEffect(() => {
    const fetchSettings = async () => {
      const { data } = await supabase
        .from("site_settings")
        .select("value")
        .eq("key", "intro_text")
        .single();
      if (data?.value) setIntroText(data.value);
    };
    fetchSettings();
  }, []);

  return (
    <section className="max-w-4xl mx-auto py-12 md:py-16 px-4 animate-fade-in">
      <div className="text-center space-y-6">
        <h2 className="text-3xl md:text-4xl font-bold leading-tight animate-slide-up">
          Stories that wander. Journals that breathe. Art that speaks.
        </h2>
        <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl mx-auto animate-slide-up stagger-1">
          {introText}
        </p>
      </div>
    </section>
  );
};

export default IntroSection;
