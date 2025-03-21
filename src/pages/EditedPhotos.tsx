
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import Header from "@/components/Header";
import { EditedPhotoGallery } from "@/components/EditedPhotoGallery";

const EditedPhotos = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="container py-8">
        <h1 className="text-3xl font-bold mb-8">Edited Photos Gallery</h1>
        <EditedPhotoGallery />
      </main>
    </div>
  );
};

export default EditedPhotos;
