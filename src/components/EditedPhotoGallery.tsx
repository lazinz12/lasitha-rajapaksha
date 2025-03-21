
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { v4 as uuidv4 } from "uuid";
import { Image, Upload, X } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { EditedPhoto } from "@/integrations/supabase/types";

const STORAGE_BUCKET = 'edited_photos';

type Photo = EditedPhoto;

export const EditedPhotoGallery = () => {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);

  useEffect(() => {
    ensureStorageBucket();
    fetchPhotos();
  }, []);

  const ensureStorageBucket = async () => {
    try {
      const { data: buckets, error: listError } = await supabase.storage.listBuckets();
      
      if (listError) {
        console.error("Error checking buckets:", listError);
        return;
      }
      
      const bucketExists = buckets?.some(bucket => bucket.name === STORAGE_BUCKET);
      
      if (!bucketExists) {
        console.log(`${STORAGE_BUCKET} bucket does not exist, creating it...`);
        const { data, error } = await supabase.storage.createBucket(STORAGE_BUCKET, {
          public: true,
          fileSizeLimit: 10485760 // 10MB
        });
        
        if (error) {
          console.error("Error creating bucket:", error);
          toast.error(`Failed to create storage bucket: ${error.message}`);
        } else {
          console.log(`${STORAGE_BUCKET} bucket created successfully`);
        }
      } else {
        console.log(`${STORAGE_BUCKET} bucket already exists`);
      }
    } catch (error) {
      console.error("Error in ensureStorageBucket:", error);
    }
  };

  const fetchPhotos = async () => {
    try {
      setLoading(true);
      // Use the typed response from Supabase
      const { data, error } = await supabase
        .from("edited_photos")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      
      // Explicitly cast the data to the Photo type
      setPhotos(data as Photo[] || []);
    } catch (error) {
      console.error("Error fetching photos:", error);
      toast.error("Failed to load photos");
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    setSelectedFiles(files);
  };

  const handleUpload = async () => {
    if (!selectedFiles || selectedFiles.length === 0) {
      toast.error("Please select images to upload");
      return;
    }

    try {
      setUploading(true);
      setUploadProgress(0);
      
      const totalFiles = selectedFiles.length;
      let filesUploaded = 0;
      const newPhotos: Photo[] = [];
      
      for (let i = 0; i < selectedFiles.length; i++) {
        const file = selectedFiles[i];
        const fileExt = file.name.split('.').pop();
        const fileName = `${uuidv4()}.${fileExt}`;
        
        // Upload file to storage
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from(STORAGE_BUCKET)
          .upload(fileName, file, {
            cacheControl: '3600',
            upsert: false
          });
          
        if (uploadError) {
          console.error("Upload error:", uploadError);
          toast.error(`Error uploading ${file.name}: ${uploadError.message}`);
          continue;
        }
        
        // Get public URL
        const { data: publicUrlData } = supabase.storage
          .from(STORAGE_BUCKET)
          .getPublicUrl(fileName);
          
        const imageUrl = publicUrlData.publicUrl;
        
        // Save to database - using explicit type
        const { data: photoData, error: dbError } = await supabase
          .from("edited_photos")
          .insert({ image_url: imageUrl })
          .select();
        
        if (dbError) {
          console.error("Database error:", dbError);
          toast.error(`Error saving ${file.name}: ${dbError.message}`);
          continue;
        }
        
        if (photoData && photoData.length > 0) {
          newPhotos.push(photoData[0] as Photo);
        }
        
        // Update progress
        filesUploaded++;
        setUploadProgress(Math.round((filesUploaded / totalFiles) * 100));
      }
      
      if (newPhotos.length > 0) {
        toast.success(`Successfully uploaded ${newPhotos.length} photos`);
        setPhotos(prev => [...newPhotos, ...prev]);
      }
      
      // Reset file input
      setSelectedFiles(null);
      
    } catch (error) {
      console.error("Error in upload process:", error);
      toast.error("Upload process failed");
    } finally {
      setUploading(false);
      setUploadProgress(0);
    }
  };

  return (
    <div className="space-y-8">
      <Card>
        <CardContent className="pt-6">
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Upload Multiple Photos</h2>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              <Input
                type="file"
                accept="image/*"
                multiple
                onChange={handleFileChange}
                className="hidden"
                id="multi-photo-upload"
              />
              <label
                htmlFor="multi-photo-upload"
                className="flex flex-col items-center justify-center cursor-pointer"
              >
                <Upload className="h-12 w-12 text-gray-400 mb-2" />
                <p className="text-gray-600">
                  Drag and drop images here or click to browse
                </p>
                <p className="text-sm text-gray-400 mt-1">
                  Supports multiple images, max 10MB each
                </p>
              </label>
            </div>
            
            {selectedFiles && selectedFiles.length > 0 && (
              <div className="mt-4">
                <p className="font-medium">{selectedFiles.length} images selected</p>
                <ul className="mt-2 space-y-1 text-sm text-gray-500">
                  {Array.from(selectedFiles).map((file, idx) => (
                    <li key={idx} className="flex items-center">
                      <Image className="h-4 w-4 mr-2" />
                      <span className="truncate">{file.name}</span>
                      <span className="ml-2">({(file.size / 1024).toFixed(1)} KB)</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            
            {uploadProgress > 0 && uploadProgress < 100 && (
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div
                  className="bg-primary h-2.5 rounded-full"
                  style={{ width: `${uploadProgress}%` }}
                ></div>
                <p className="text-xs text-gray-500 mt-1 text-right">
                  {uploadProgress}% uploaded
                </p>
              </div>
            )}
            
            <Button
              onClick={handleUpload}
              className="w-full"
              disabled={!selectedFiles || selectedFiles.length === 0 || uploading}
            >
              {uploading ? "Uploading..." : "Upload Photos"}
            </Button>
          </div>
        </CardContent>
      </Card>

      {loading ? (
        <div className="text-center py-12">
          <p className="text-gray-500">Loading gallery...</p>
        </div>
      ) : photos.length === 0 ? (
        <div className="text-center py-12 border border-dashed rounded-lg">
          <Image className="h-12 w-12 mx-auto text-gray-400 mb-2" />
          <p className="text-gray-500">No photos in gallery yet</p>
          <p className="text-sm text-gray-400">Upload some photos to get started</p>
        </div>
      ) : (
        <div className="space-y-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {photos.map((photo) => (
              <div key={photo.id} className="aspect-square relative rounded-md overflow-hidden border group">
                <img
                  src={photo.image_url}
                  alt=""
                  className="w-full h-full object-cover group-hover:opacity-90 transition-opacity"
                />
              </div>
            ))}
          </div>
          
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Slideshow View</h2>
            <Carousel className="w-full max-w-md mx-auto">
              <CarouselContent>
                {photos.map((photo) => (
                  <CarouselItem key={photo.id}>
                    <div className="p-1">
                      <div className="flex aspect-square items-center justify-center p-2">
                        <img
                          src={photo.image_url}
                          alt=""
                          className="w-full h-full object-contain rounded-md"
                        />
                      </div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="left-0" />
              <CarouselNext className="right-0" />
            </Carousel>
          </Card>
        </div>
      )}
    </div>
  );
};
