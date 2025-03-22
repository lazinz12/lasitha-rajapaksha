
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import BlogManager from "@/components/admin/BlogManager";
import ProductManager from "@/components/admin/ProductManager";
import HomePageManager from "@/components/admin/HomePageManager";
import SkillsManager from "@/components/admin/SkillsManager";
import ExperienceManager from "@/components/admin/ExperienceManager";
import ProjectManager from "@/components/admin/ProjectManager";
import CertificationManager from "@/components/admin/CertificationManager";
import SocialLinksManager from "@/components/admin/SocialLinksManager";
import PhotoGalleryManager from "@/components/admin/PhotoGalleryManager";
import EditedPhotosManager from "@/components/admin/EditedPhotosManager";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { toast } from "sonner";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

const Admin = () => {
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false);
  const [activeTab, setActiveTab] = useState("home");
  const isMobile = useIsMobile();

  useEffect(() => {
    const checkAdmin = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate("/login");
        return;
      }

      const { data: profile } = await supabase
        .from("profiles")
        .select("is_admin")
        .eq("id", session.user.id)
        .single();

      if (!profile?.is_admin) {
        navigate("/");
        toast.error("Access denied. Admin privileges required.");
        return;
      }

      setIsAdmin(true);
    };

    checkAdmin();
  }, [navigate]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/");
    toast.success("Successfully logged out!");
  };

  if (!isAdmin) return null;

  const tabItems = [
    { value: "home", label: "Home Page" },
    { value: "skills", label: "Skills" },
    { value: "experience", label: "Experience" },
    { value: "projects", label: "Projects" },
    { value: "certifications", label: "Certifications" },
    { value: "social", label: "Social Links" },
    { value: "gallery", label: "Photo Gallery" },
    { value: "edited-photos", label: "Edited Photos" },
    { value: "blog", label: "Blog Posts" },
    { value: "products", label: "Products" },
  ];

  const renderTabContent = (value: string) => {
    switch (value) {
      case "home":
        return <HomePageManager />;
      case "skills":
        return <SkillsManager />;
      case "experience":
        return <ExperienceManager />;
      case "projects":
        return <ProjectManager />;
      case "certifications":
        return <CertificationManager />;
      case "social":
        return <SocialLinksManager />;
      case "gallery":
        return <PhotoGalleryManager />;
      case "edited-photos":
        return <EditedPhotosManager />;
      case "blog":
        return <BlogManager />;
      case "products":
        return <ProductManager />;
      default:
        return null;
    }
  };

  return (
    <div className="container mx-auto p-3 md:p-6">
      <div className="flex justify-between items-center mb-4 md:mb-6">
        <h1 className="text-2xl md:text-3xl font-bold">Admin Dashboard</h1>
        <Button variant="outline" onClick={handleLogout} className="h-9 px-2 md:px-4">
          <LogOut className="mr-2 h-4 w-4" />
          <span className="hidden md:inline">Logout</span>
        </Button>
      </div>
      
      {isMobile ? (
        <>
          <Drawer>
            <DrawerTrigger asChild>
              <Button variant="outline" className="w-full mb-4">
                {tabItems.find(tab => tab.value === activeTab)?.label || "Select Section"}
              </Button>
            </DrawerTrigger>
            <DrawerContent>
              <DrawerHeader>
                <DrawerTitle>Select Section</DrawerTitle>
              </DrawerHeader>
              <div className="grid grid-cols-2 gap-2 px-4">
                {tabItems.map((tab) => (
                  <DrawerClose key={tab.value} asChild>
                    <Button 
                      variant={activeTab === tab.value ? "default" : "outline"}
                      className="w-full"
                      onClick={() => setActiveTab(tab.value)}
                    >
                      {tab.label}
                    </Button>
                  </DrawerClose>
                ))}
              </div>
              <DrawerFooter className="pt-2">
                <DrawerClose asChild>
                  <Button variant="outline">Close</Button>
                </DrawerClose>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>
          <div className="pb-4">
            {renderTabContent(activeTab)}
          </div>
        </>
      ) : (
        <Tabs defaultValue="home" className="space-y-4" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="flex flex-wrap gap-2">
            {tabItems.map((tab) => (
              <TabsTrigger key={tab.value} value={tab.value}>
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>
          {tabItems.map((tab) => (
            <TabsContent key={tab.value} value={tab.value}>
              {renderTabContent(tab.value)}
            </TabsContent>
          ))}
        </Tabs>
      )}
    </div>
  );
};

export default Admin;
