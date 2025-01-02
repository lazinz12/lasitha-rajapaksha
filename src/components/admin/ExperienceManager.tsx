import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Trash2, Save } from "lucide-react";
import { toast } from "sonner";

export default function ExperienceManager() {
  const [experiences, setExperiences] = useState<any[]>([]);
  const [newExperience, setNewExperience] = useState({
    title: "",
    company: "",
    role: "",
    duration: "",
    responsibilities: [""]
  });

  useEffect(() => {
    fetchExperiences();
  }, []);

  const fetchExperiences = async () => {
    const { data, error } = await supabase
      .from("experience")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      toast.error("Error fetching experiences");
      return;
    }

    setExperiences(data || []);
  };

  const handleResponsibilityChange = (index: number, value: string) => {
    const updatedResponsibilities = [...newExperience.responsibilities];
    updatedResponsibilities[index] = value;
    setNewExperience({ ...newExperience, responsibilities: updatedResponsibilities });
  };

  const handleAddResponsibility = () => {
    setNewExperience({
      ...newExperience,
      responsibilities: [...newExperience.responsibilities, ""]
    });
  };

  const handleRemoveResponsibility = (index: number) => {
    const updatedResponsibilities = newExperience.responsibilities.filter((_, i) => i !== index);
    setNewExperience({ ...newExperience, responsibilities: updatedResponsibilities });
  };

  const handleSave = async () => {
    const { error } = await supabase
      .from("experience")
      .insert([newExperience]);

    if (error) {
      toast.error("Error saving experience");
      return;
    }

    toast.success("Experience saved successfully");
    fetchExperiences();
    setNewExperience({
      title: "",
      company: "",
      role: "",
      duration: "",
      responsibilities: [""]
    });
  };

  const handleDelete = async (id: string) => {
    const { error } = await supabase
      .from("experience")
      .delete()
      .eq("id", id);

    if (error) {
      toast.error("Error deleting experience");
      return;
    }

    toast.success("Experience deleted successfully");
    fetchExperiences();
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Add New Experience</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={newExperience.title}
              onChange={(e) => setNewExperience({ ...newExperience, title: e.target.value })}
              placeholder="e.g., Senior Developer"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="company">Company</Label>
            <Input
              id="company"
              value={newExperience.company}
              onChange={(e) => setNewExperience({ ...newExperience, company: e.target.value })}
              placeholder="e.g., Tech Corp"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="role">Role</Label>
            <Input
              id="role"
              value={newExperience.role}
              onChange={(e) => setNewExperience({ ...newExperience, role: e.target.value })}
              placeholder="e.g., Lead Developer"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="duration">Duration</Label>
            <Input
              id="duration"
              value={newExperience.duration}
              onChange={(e) => setNewExperience({ ...newExperience, duration: e.target.value })}
              placeholder="e.g., 2020 - Present"
            />
          </div>
          <div className="space-y-2">
            <Label>Responsibilities</Label>
            {newExperience.responsibilities.map((responsibility, index) => (
              <div key={index} className="flex gap-2">
                <Input
                  value={responsibility}
                  onChange={(e) => handleResponsibilityChange(index, e.target.value)}
                  placeholder="Enter responsibility"
                />
                <Button
                  variant="destructive"
                  size="icon"
                  onClick={() => handleRemoveResponsibility(index)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
            <Button
              variant="outline"
              onClick={handleAddResponsibility}
              className="w-full"
            >
              <Plus className="h-4 w-4 mr-2" /> Add Responsibility
            </Button>
          </div>
          <Button onClick={handleSave} className="w-full">
            <Save className="h-4 w-4 mr-2" /> Save Experience
          </Button>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 gap-4">
        {experiences.map((experience) => (
          <Card key={experience.id}>
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                {experience.title}
                <Button
                  variant="destructive"
                  size="icon"
                  onClick={() => handleDelete(experience.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">{experience.company}</p>
              <p className="text-gray-600">{experience.role} | {experience.duration}</p>
              <ul className="list-disc list-inside mt-2">
                {experience.responsibilities.map((r: string, i: number) => (
                  <li key={i} className="text-gray-600">{r}</li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}