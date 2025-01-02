import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Save, Trash2 } from "lucide-react";
import { toast } from "sonner";

export default function SocialLinksManager() {
  const [socialLinks, setSocialLinks] = useState<any[]>([]);
  const [newLink, setNewLink] = useState({
    platform: "",
    url: "",
    username: "",
    icon: "",
    color: ""
  });

  useEffect(() => {
    fetchSocialLinks();
  }, []);

  const fetchSocialLinks = async () => {
    const { data, error } = await supabase
      .from("social_links")
      .select("*")
      .order("created_at", { ascending: true });

    if (error) {
      toast.error("Error fetching social links");
      return;
    }

    setSocialLinks(data || []);
  };

  const handleSave = async () => {
    const { error } = await supabase
      .from("social_links")
      .insert([newLink]);

    if (error) {
      toast.error("Error saving social link");
      return;
    }

    toast.success("Social link saved successfully");
    fetchSocialLinks();
    setNewLink({
      platform: "",
      url: "",
      username: "",
      icon: "",
      color: ""
    });
  };

  const handleDelete = async (id: string) => {
    const { error } = await supabase
      .from("social_links")
      .delete()
      .eq("id", id);

    if (error) {
      toast.error("Error deleting social link");
      return;
    }

    toast.success("Social link deleted successfully");
    fetchSocialLinks();
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Add New Social Link</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="platform">Platform</Label>
            <Input
              id="platform"
              value={newLink.platform}
              onChange={(e) => setNewLink({ ...newLink, platform: e.target.value })}
              placeholder="e.g., YouTube"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="url">URL</Label>
            <Input
              id="url"
              value={newLink.url}
              onChange={(e) => setNewLink({ ...newLink, url: e.target.value })}
              placeholder="e.g., https://youtube.com/@username"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              value={newLink.username}
              onChange={(e) => setNewLink({ ...newLink, username: e.target.value })}
              placeholder="e.g., @username"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="icon">Icon (Lucide icon name)</Label>
            <Input
              id="icon"
              value={newLink.icon}
              onChange={(e) => setNewLink({ ...newLink, icon: e.target.value })}
              placeholder="e.g., Youtube"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="color">Color (Tailwind class)</Label>
            <Input
              id="color"
              value={newLink.color}
              onChange={(e) => setNewLink({ ...newLink, color: e.target.value })}
              placeholder="e.g., hover:text-red-600 hover:bg-red-50"
            />
          </div>
          <Button onClick={handleSave} className="w-full">
            <Save className="h-4 w-4 mr-2" /> Save Social Link
          </Button>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {socialLinks.map((link) => (
          <Card key={link.id}>
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                {link.platform}
                <Button
                  variant="destructive"
                  size="icon"
                  onClick={() => handleDelete(link.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">{link.username}</p>
              <a
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                {link.url}
              </a>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}