import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

export const HomePageManager = () => {
  const [heroTitle, setHeroTitle] = useState("Lasitha Rajapaksha");
  const [heroSubtitle, setHeroSubtitle] = useState("Developer and Forex Trader");
  const [heroCompany, setHeroCompany] = useState("Market Minds");
  const [aboutText1, setAboutText1] = useState(
    "A passionate professional with extensive expertise in programming, trading automation, and web development. Proven track record in building robust solutions, automated systems, trading bots, and web applications."
  );
  const [aboutText2, setAboutText2] = useState(
    "My approach integrates modern development practices with deep market understanding, allowing me to deliver both technical excellence and trading insights."
  );

  const handleSave = async () => {
    try {
      const { data, error } = await supabase
        .from('home_content')
        .upsert({
          id: 1,
          hero_title: heroTitle,
          hero_subtitle: heroSubtitle,
          hero_company: heroCompany,
          about_text_1: aboutText1,
          about_text_2: aboutText2
        });

      if (error) throw error;
      toast.success("Home page content updated successfully!");
    } catch (error) {
      toast.error("Failed to update home page content");
      console.error("Error updating home page content:", error);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Home Page Content</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Hero Section</h3>
          <div className="space-y-2">
            <label className="text-sm font-medium">Title</label>
            <Input
              value={heroTitle}
              onChange={(e) => setHeroTitle(e.target.value)}
              placeholder="Hero Title"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Subtitle</label>
            <Input
              value={heroSubtitle}
              onChange={(e) => setHeroSubtitle(e.target.value)}
              placeholder="Hero Subtitle"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Company</label>
            <Input
              value={heroCompany}
              onChange={(e) => setHeroCompany(e.target.value)}
              placeholder="Company Name"
            />
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold">About Section</h3>
          <div className="space-y-2">
            <label className="text-sm font-medium">Main Text</label>
            <Textarea
              value={aboutText1}
              onChange={(e) => setAboutText1(e.target.value)}
              placeholder="Main About Text"
              rows={4}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Secondary Text</label>
            <Textarea
              value={aboutText2}
              onChange={(e) => setAboutText2(e.target.value)}
              placeholder="Secondary About Text"
              rows={4}
            />
          </div>
        </div>

        <Button onClick={handleSave} className="w-full">
          Save Changes
        </Button>
      </CardContent>
    </Card>
  );
};

export default HomePageManager;