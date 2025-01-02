import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Trash2, Save } from "lucide-react";
import { toast } from "sonner";

export default function CertificationManager() {
  const [certifications, setCertifications] = useState<any[]>([]);
  const [newCertification, setNewCertification] = useState({
    title: "",
    issuer: "",
    date: "",
    skills: [""]
  });

  useEffect(() => {
    fetchCertifications();
  }, []);

  const fetchCertifications = async () => {
    const { data, error } = await supabase
      .from("certifications")
      .select("*")
      .order("date", { ascending: false });

    if (error) {
      toast.error("Error fetching certifications");
      return;
    }

    setCertifications(data || []);
  };

  const handleSkillChange = (index: number, value: string) => {
    const updatedSkills = [...newCertification.skills];
    updatedSkills[index] = value;
    setNewCertification({ ...newCertification, skills: updatedSkills });
  };

  const handleAddSkill = () => {
    setNewCertification({
      ...newCertification,
      skills: [...newCertification.skills, ""]
    });
  };

  const handleRemoveSkill = (index: number) => {
    const updatedSkills = newCertification.skills.filter((_, i) => i !== index);
    setNewCertification({ ...newCertification, skills: updatedSkills });
  };

  const handleSave = async () => {
    const { error } = await supabase
      .from("certifications")
      .insert([newCertification]);

    if (error) {
      toast.error("Error saving certification");
      return;
    }

    toast.success("Certification saved successfully");
    fetchCertifications();
    setNewCertification({
      title: "",
      issuer: "",
      date: "",
      skills: [""]
    });
  };

  const handleDelete = async (id: string) => {
    const { error } = await supabase
      .from("certifications")
      .delete()
      .eq("id", id);

    if (error) {
      toast.error("Error deleting certification");
      return;
    }

    toast.success("Certification deleted successfully");
    fetchCertifications();
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Add New Certification</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={newCertification.title}
              onChange={(e) => setNewCertification({ ...newCertification, title: e.target.value })}
              placeholder="Certification Title"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="issuer">Issuer</Label>
            <Input
              id="issuer"
              value={newCertification.issuer}
              onChange={(e) => setNewCertification({ ...newCertification, issuer: e.target.value })}
              placeholder="e.g., Google"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="date">Date</Label>
            <Input
              id="date"
              value={newCertification.date}
              onChange={(e) => setNewCertification({ ...newCertification, date: e.target.value })}
              placeholder="e.g., Feb 2024"
            />
          </div>
          <div className="space-y-2">
            <Label>Skills</Label>
            {newCertification.skills.map((skill, index) => (
              <div key={index} className="flex gap-2">
                <Input
                  value={skill}
                  onChange={(e) => handleSkillChange(index, e.target.value)}
                  placeholder="Enter skill"
                />
                <Button
                  variant="destructive"
                  size="icon"
                  onClick={() => handleRemoveSkill(index)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
            <Button
              variant="outline"
              onClick={handleAddSkill}
              className="w-full"
            >
              <Plus className="h-4 w-4 mr-2" /> Add Skill
            </Button>
          </div>
          <Button onClick={handleSave} className="w-full">
            <Save className="h-4 w-4 mr-2" /> Save Certification
          </Button>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {certifications.map((certification) => (
          <Card key={certification.id}>
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                {certification.title}
                <Button
                  variant="destructive"
                  size="icon"
                  onClick={() => handleDelete(certification.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">{certification.issuer}</p>
              <p className="text-gray-500 text-sm">{certification.date}</p>
              {certification.skills && certification.skills.length > 0 && (
                <div className="mt-2">
                  <p className="text-sm font-semibold">Skills:</p>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {certification.skills.map((skill: string, index: number) => (
                      <span
                        key={index}
                        className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}