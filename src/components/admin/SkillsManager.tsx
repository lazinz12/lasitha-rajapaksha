import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Trash2, Save } from "lucide-react";
import { toast } from "sonner";

export default function SkillsManager() {
  const [skills, setSkills] = useState<any[]>([]);
  const [newSkill, setNewSkill] = useState({
    category: "",
    skills: [""],
    icon: ""
  });

  useEffect(() => {
    fetchSkills();
  }, []);

  const fetchSkills = async () => {
    const { data, error } = await supabase
      .from("skills")
      .select("*")
      .order("created_at", { ascending: true });

    if (error) {
      toast.error("Error fetching skills");
      return;
    }

    setSkills(data || []);
  };

  const handleAddSkill = () => {
    setNewSkill({
      category: "",
      skills: [""],
      icon: ""
    });
  };

  const handleSkillChange = (index: number, value: string) => {
    const updatedSkills = [...newSkill.skills];
    updatedSkills[index] = value;
    setNewSkill({ ...newSkill, skills: updatedSkills });
  };

  const handleAddSkillField = () => {
    setNewSkill({
      ...newSkill,
      skills: [...newSkill.skills, ""]
    });
  };

  const handleRemoveSkillField = (index: number) => {
    const updatedSkills = newSkill.skills.filter((_, i) => i !== index);
    setNewSkill({ ...newSkill, skills: updatedSkills });
  };

  const handleSave = async () => {
    const { error } = await supabase
      .from("skills")
      .insert([newSkill]);

    if (error) {
      toast.error("Error saving skill");
      return;
    }

    toast.success("Skill saved successfully");
    fetchSkills();
    handleAddSkill();
  };

  const handleDelete = async (id: string) => {
    const { error } = await supabase
      .from("skills")
      .delete()
      .eq("id", id);

    if (error) {
      toast.error("Error deleting skill");
      return;
    }

    toast.success("Skill deleted successfully");
    fetchSkills();
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Add New Skill</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Input
              id="category"
              value={newSkill.category}
              onChange={(e) => setNewSkill({ ...newSkill, category: e.target.value })}
              placeholder="e.g., Programming Languages"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="icon">Icon (Lucide icon name)</Label>
            <Input
              id="icon"
              value={newSkill.icon}
              onChange={(e) => setNewSkill({ ...newSkill, icon: e.target.value })}
              placeholder="e.g., Code"
            />
          </div>
          <div className="space-y-2">
            <Label>Skills</Label>
            {newSkill.skills.map((skill, index) => (
              <div key={index} className="flex gap-2">
                <Input
                  value={skill}
                  onChange={(e) => handleSkillChange(index, e.target.value)}
                  placeholder="Enter skill"
                />
                <Button
                  variant="destructive"
                  size="icon"
                  onClick={() => handleRemoveSkillField(index)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
            <Button
              variant="outline"
              onClick={handleAddSkillField}
              className="w-full"
            >
              <Plus className="h-4 w-4 mr-2" /> Add Skill
            </Button>
          </div>
          <Button onClick={handleSave} className="w-full">
            <Save className="h-4 w-4 mr-2" /> Save Skill Category
          </Button>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {skills.map((skill) => (
          <Card key={skill.id}>
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                {skill.category}
                <Button
                  variant="destructive"
                  size="icon"
                  onClick={() => handleDelete(skill.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside">
                {skill.skills.map((s: string, i: number) => (
                  <li key={i}>{s}</li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}