import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Trash2, Plus, Upload, ArrowUp, ArrowDown } from "lucide-react";
import { toast } from "sonner";

type Photo = {
  id: string;
  title: string;
  description: string | null;
  image_url: string;
  alt_text: string;
  display_order: number | null;
  created_at: string;
  updated_at: string;
};

const PhotoGalleryManager = () => {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [altText, setAltText] = useState("");
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetchPhotos();
  }, []);

  const fetchPhotos = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("photo_gallery")
        .select("*")
        .order("display_order", { ascending: true });

      if (error) throw error;
      setPhotos(data || []);
    } catch (error) {
      console.error("Error fetching photos:", error);
      toast.error("Failed to load photos");
    } finally {
      setLoading(false);
    }
  };

  const getImageUrl = (url: string) => {
    if (!url) return '';
    
    if (url.startsWith('http') || url.startsWith('/')) {
      return url;
    }
    
    return `/${url}`;
  };

  const normalizeUrlForStorage = (url: string) => {
    if (!url) return '';
    
    if (url.startsWith('/')) {
      return url.substring(1);
    }
    
    try {
      const urlObj = new URL(url);
      if (urlObj.origin === window.location.origin) {
        return urlObj.pathname.startsWith('/') 
          ? urlObj.pathname.substring(1) 
          : urlObj.pathname;
      }
    } catch (e) {
      return url;
    }
    
    return url;
  };

  const handleAddPhoto = async () => {
    if (!title || !imageUrl || !altText) {
      toast.error("Please fill in all required fields");
      return;
    }

    try {
      const maxDisplayOrder = photos.length > 0
        ? Math.max(...photos.filter(p => p.display_order !== null).map(p => p.display_order || 0)) + 1
        : 1;

      const { error } = await supabase.from("photo_gallery").insert({
        title,
        description: description || null,
        image_url: normalizeUrlForStorage(imageUrl),
        alt_text: altText,
        display_order: maxDisplayOrder,
      });

      if (error) throw error;

      toast.success("Photo added successfully");
      fetchPhotos();
      
      setTitle("");
      setDescription("");
      setImageUrl("");
      setAltText("");
    } catch (error) {
      console.error("Error adding photo:", error);
      toast.error("Failed to add photo");
    }
  };

  const handleDeletePhoto = async (id: string) => {
    try {
      const { error } = await supabase
        .from("photo_gallery")
        .delete()
        .eq("id", id);

      if (error) throw error;

      toast.success("Photo deleted successfully");
      setPhotos(photos.filter(photo => photo.id !== id));
    } catch (error) {
      console.error("Error deleting photo:", error);
      toast.error("Failed to delete photo");
    }
  };

  const handleMovePhoto = async (id: string, direction: 'up' | 'down') => {
    const photoIndex = photos.findIndex(p => p.id === id);
    if (photoIndex === -1) return;
    
    if (direction === 'up' && photoIndex === 0) return;
    if (direction === 'down' && photoIndex === photos.length - 1) return;
    
    const otherIndex = direction === 'up' ? photoIndex - 1 : photoIndex + 1;
    
    const currentPhoto = photos[photoIndex];
    const otherPhoto = photos[otherIndex];
    
    const tempOrder = currentPhoto.display_order;
    
    try {
      await supabase
        .from("photo_gallery")
        .update({ display_order: otherPhoto.display_order })
        .eq("id", currentPhoto.id);
        
      await supabase
        .from("photo_gallery")
        .update({ display_order: tempOrder })
        .eq("id", otherPhoto.id);
        
      toast.success("Photo order updated");
      fetchPhotos();
    } catch (error) {
      console.error("Error reordering photos:", error);
      toast.error("Failed to update photo order");
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const file = files[0];
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random().toString(36).substring(2, 15)}.${fileExt}`;
    const filePath = `public/lovable-uploads/${fileName}`;

    setUploading(true);

    try {
      const previewUrl = URL.createObjectURL(file);
      setImageUrl(previewUrl);
      
      setImageUrl(`/lovable-uploads/${fileName}`);
      
      toast.success("Image preview ready");
    } catch (error) {
      console.error("Error uploading image:", error);
      toast.error("Failed to upload image");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Add New Photo</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title*</Label>
              <Input 
                id="title" 
                value={title} 
                onChange={(e) => setTitle(e.target.value)} 
                placeholder="Photo title"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="altText">Alt Text*</Label>
              <Input 
                id="altText" 
                value={altText} 
                onChange={(e) => setAltText(e.target.value)} 
                placeholder="Image alt text"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea 
              id="description" 
              value={description} 
              onChange={(e) => setDescription(e.target.value)} 
              placeholder="Photo description"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="imageUrl">Image URL*</Label>
            <div className="flex gap-2">
              <Input 
                id="imageUrl" 
                value={imageUrl} 
                onChange={(e) => setImageUrl(e.target.value)} 
                placeholder="/path/to/image.jpg"
                className="flex-1"
              />
              <div className="relative">
                <Input 
                  type="file" 
                  accept="image/*" 
                  onChange={handleImageUpload}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                />
                <Button type="button" variant="outline" disabled={uploading}>
                  <Upload className="h-4 w-4 mr-2" />
                  {uploading ? "Uploading..." : "Browse"}
                </Button>
              </div>
            </div>
          </div>
          
          {imageUrl && (
            <div className="mt-2">
              <p className="text-sm text-muted-foreground mb-1">Image Preview:</p>
              <img 
                src={getImageUrl(imageUrl)} 
                alt="Preview" 
                className="h-40 w-auto object-cover rounded-md border"
              />
            </div>
          )}
          
          <Button onClick={handleAddPhoto} className="w-full" disabled={!title || !imageUrl || !altText}>
            <Plus className="h-4 w-4 mr-2" />
            Add Photo
          </Button>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Photo Gallery</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="text-center py-4">Loading photos...</div>
          ) : photos.length === 0 ? (
            <div className="text-center py-4 text-muted-foreground">No photos available</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {photos.map((photo) => (
                <Card key={photo.id} className="overflow-hidden">
                  <div className="relative h-40">
                    <img 
                      src={getImageUrl(photo.image_url)} 
                      alt={photo.alt_text} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold truncate">{photo.title}</h3>
                    {photo.description && (
                      <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
                        {photo.description}
                      </p>
                    )}
                    <div className="flex justify-between mt-3">
                      <div className="flex gap-1">
                        <Button 
                          size="icon" 
                          variant="outline" 
                          onClick={() => handleMovePhoto(photo.id, 'up')}
                        >
                          <ArrowUp className="h-4 w-4" />
                        </Button>
                        <Button 
                          size="icon" 
                          variant="outline"
                          onClick={() => handleMovePhoto(photo.id, 'down')}
                        >
                          <ArrowDown className="h-4 w-4" />
                        </Button>
                      </div>
                      <Button 
                        size="icon" 
                        variant="destructive"
                        onClick={() => handleDeletePhoto(photo.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default PhotoGalleryManager;
