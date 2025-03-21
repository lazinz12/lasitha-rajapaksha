
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Trash2, Plus, Upload, ArrowUp, ArrowDown, Edit, Check, X } from "lucide-react";
import { toast } from "sonner";
import { v4 as uuidv4 } from "uuid";

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

const STORAGE_BUCKET = 'gallery';

const PhotoGalleryManager = () => {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [altText, setAltText] = useState("");
  const [uploading, setUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [editingPhotoId, setEditingPhotoId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editAltText, setEditAltText] = useState("");

  useEffect(() => {
    fetchPhotos();
    ensureStorageBucket();
  }, []);

  const ensureStorageBucket = async () => {
    try {
      // Check if the gallery bucket exists first
      const { data: buckets, error: listError } = await supabase.storage.listBuckets();
      
      if (listError) {
        console.error("Error checking buckets:", listError);
        return;
      }
      
      const galleryBucketExists = buckets?.some(bucket => bucket.name === STORAGE_BUCKET);
      
      if (!galleryBucketExists) {
        console.log("Gallery bucket does not exist, creating it...");
        const { data, error } = await supabase.storage.createBucket(STORAGE_BUCKET, {
          public: true,
          fileSizeLimit: 5242880 // 5MB
        });
        
        if (error) {
          console.error("Error creating bucket:", error);
          toast.error("Failed to create storage bucket. Please try again later.");
        } else {
          console.log("Gallery bucket created successfully");
        }
      } else {
        console.log("Gallery bucket already exists");
      }
    } catch (error) {
      console.error("Error in ensureStorageBucket:", error);
    }
  };

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

  const handleAddPhoto = async () => {
    if (!title || (!imageUrl && !selectedFile) || !altText) {
      toast.error("Please fill in all required fields");
      return;
    }

    try {
      setUploading(true);
      
      let finalImageUrl = imageUrl;
      
      // If there's a selected file, upload it to Supabase Storage
      if (selectedFile) {
        console.log("Uploading file to Supabase Storage...");
        
        const fileExt = selectedFile.name.split('.').pop();
        const fileName = `${uuidv4()}.${fileExt}`;
        const filePath = `${fileName}`;
        
        console.log("File path:", filePath);
        console.log("Bucket:", STORAGE_BUCKET);
        
        // Upload the file to Supabase Storage
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from(STORAGE_BUCKET)
          .upload(filePath, selectedFile, {
            cacheControl: '3600',
            upsert: false
          });
          
        if (uploadError) {
          console.error("Upload error:", uploadError);
          throw uploadError;
        }
        
        console.log("File uploaded successfully:", uploadData);
        
        // Get the public URL for the uploaded file
        const { data: publicUrlData } = supabase.storage
          .from(STORAGE_BUCKET)
          .getPublicUrl(filePath);
          
        finalImageUrl = publicUrlData.publicUrl;
        console.log("Public URL:", finalImageUrl);
      }

      const maxDisplayOrder = photos.length > 0
        ? Math.max(...photos.filter(p => p.display_order !== null).map(p => p.display_order || 0)) + 1
        : 1;

      const { error } = await supabase.from("photo_gallery").insert({
        title,
        description: description || null,
        image_url: finalImageUrl,
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
      setSelectedFile(null);
    } catch (error) {
      console.error("Error adding photo:", error);
      toast.error("Failed to add photo");
    } finally {
      setUploading(false);
    }
  };

  const handleStartEditing = (photo: Photo) => {
    setEditingPhotoId(photo.id);
    setEditTitle(photo.title);
    setEditDescription(photo.description || "");
    setEditAltText(photo.alt_text);
  };

  const handleCancelEditing = () => {
    setEditingPhotoId(null);
    setEditTitle("");
    setEditDescription("");
    setEditAltText("");
  };

  const handleSaveEdit = async (id: string) => {
    if (!editTitle || !editAltText) {
      toast.error("Title and Alt Text are required");
      return;
    }

    try {
      const { error } = await supabase
        .from("photo_gallery")
        .update({
          title: editTitle,
          description: editDescription || null,
          alt_text: editAltText
        })
        .eq("id", id);

      if (error) throw error;

      toast.success("Photo details updated successfully");
      fetchPhotos();
      setEditingPhotoId(null);
    } catch (error) {
      console.error("Error updating photo:", error);
      toast.error("Failed to update photo details");
    }
  };

  const handleDeletePhoto = async (id: string, imageUrl: string) => {
    try {
      // First, delete from the database
      const { error } = await supabase
        .from("photo_gallery")
        .delete()
        .eq("id", id);

      if (error) throw error;

      // If the image is in Supabase Storage, delete it too
      if (imageUrl && imageUrl.includes('supabase.co')) {
        // Extract the path from the URL
        const storageUrl = new URL(imageUrl);
        const pathSegments = storageUrl.pathname.split('/');
        const filename = pathSegments[pathSegments.length - 1];
        
        if (filename) {
          const { error: storageError } = await supabase.storage
            .from(STORAGE_BUCKET)
            .remove([filename]);
            
          if (storageError) {
            console.error("Error deleting file from storage:", storageError);
          }
        }
      }

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
    setSelectedFile(file);
    
    // Create a preview URL for the selected file
    const previewUrl = URL.createObjectURL(file);
    setImageUrl(previewUrl);
    
    toast.success("Image selected for upload");
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
            <Label htmlFor="imageUrl">Image*</Label>
            <div className="flex gap-2">
              <Input 
                id="imageUrl" 
                value={imageUrl} 
                onChange={(e) => setImageUrl(e.target.value)} 
                placeholder="Upload an image or enter URL"
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
                src={imageUrl} 
                alt="Preview" 
                className="h-40 w-auto object-cover rounded-md border"
              />
            </div>
          )}
          
          <Button onClick={handleAddPhoto} className="w-full" disabled={(!imageUrl && !selectedFile) || !title || !altText || uploading}>
            <Plus className="h-4 w-4 mr-2" />
            {uploading ? "Adding Photo..." : "Add Photo"}
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
                      src={photo.image_url} 
                      alt={photo.alt_text} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardContent className="p-4">
                    {editingPhotoId === photo.id ? (
                      <div className="space-y-3">
                        <div>
                          <Label htmlFor={`edit-title-${photo.id}`}>Title</Label>
                          <Input 
                            id={`edit-title-${photo.id}`}
                            value={editTitle} 
                            onChange={(e) => setEditTitle(e.target.value)}
                            placeholder="Photo title"
                          />
                        </div>
                        <div>
                          <Label htmlFor={`edit-alt-${photo.id}`}>Alt Text</Label>
                          <Input 
                            id={`edit-alt-${photo.id}`}
                            value={editAltText} 
                            onChange={(e) => setEditAltText(e.target.value)}
                            placeholder="Image alt text"
                          />
                        </div>
                        <div>
                          <Label htmlFor={`edit-desc-${photo.id}`}>Description</Label>
                          <Textarea 
                            id={`edit-desc-${photo.id}`}
                            value={editDescription} 
                            onChange={(e) => setEditDescription(e.target.value)}
                            placeholder="Photo description"
                          />
                        </div>
                        <div className="flex justify-end gap-2 mt-2">
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={handleCancelEditing}
                          >
                            <X className="h-4 w-4 mr-1" />
                            Cancel
                          </Button>
                          <Button 
                            size="sm"
                            onClick={() => handleSaveEdit(photo.id)}
                          >
                            <Check className="h-4 w-4 mr-1" />
                            Save
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <>
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
                              title="Move up"
                            >
                              <ArrowUp className="h-4 w-4" />
                            </Button>
                            <Button 
                              size="icon" 
                              variant="outline"
                              onClick={() => handleMovePhoto(photo.id, 'down')}
                              title="Move down"
                            >
                              <ArrowDown className="h-4 w-4" />
                            </Button>
                            <Button 
                              size="icon" 
                              variant="outline"
                              onClick={() => handleStartEditing(photo)}
                              title="Edit details"
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                          </div>
                          <Button 
                            size="icon" 
                            variant="destructive"
                            onClick={() => handleDeletePhoto(photo.id, photo.image_url)}
                            title="Delete photo"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </>
                    )}
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
