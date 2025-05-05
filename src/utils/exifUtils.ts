
interface ExifData {
  [key: string]: string | number;
}

export const checkForExif = (view: DataView): boolean => {
  // Simple check for EXIF magic number
  if (view.byteLength < 14) return false;
  
  // Check for JPEG marker
  if (view.getUint8(0) !== 0xFF || view.getUint8(1) !== 0xD8) {
    return false;
  }
  
  // Look for EXIF app marker
  let offset = 2;
  while (offset < view.byteLength - 2) {
    if (view.getUint8(offset) === 0xFF && view.getUint8(offset + 1) === 0xE1) {
      return true; // Found EXIF APP1 marker
    }
    offset += 1;
  }
  
  return false;
};

export const extractExifData = async (file: File): Promise<{
  exifData: ExifData | null;
  cleanedImageUrl: string | null;
}> => {
  return new Promise((resolve) => {
    try {
      // Create a new image element
      const img = new Image();
      img.src = URL.createObjectURL(file);
      
      img.onload = () => {
        // Create a canvas element
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        if (!ctx) {
          resolve({ exifData: null, cleanedImageUrl: null });
          return;
        }
        
        // Get EXIF data using FileReader and ArrayBuffer
        const reader = new FileReader();
        reader.onload = (e) => {
          const buffer = e.target?.result as ArrayBuffer;
          const view = new DataView(buffer);
          
          // Simple EXIF parser - in a real app, you'd use a library
          const exif: ExifData = {
            "File Name": file.name,
            "File Size": `${(file.size / 1024).toFixed(2)} KB`,
            "File Type": file.type,
            "Last Modified": new Date(file.lastModified).toLocaleString(),
          };
          
          // Check if the file has EXIF data
          const hasExif = checkForExif(view);
          if (hasExif) {
            exif["EXIF Data"] = "Present";
          } else {
            exif["EXIF Data"] = "Not found";
          }
          
          // Draw the image to the canvas (which strips metadata)
          canvas.width = img.width;
          canvas.height = img.height;
          ctx.drawImage(img, 0, 0);
          
          // Convert the canvas to a data URL
          const cleanedDataUrl = canvas.toDataURL(file.type);
          
          resolve({ exifData: exif, cleanedImageUrl: cleanedDataUrl });
        };
        
        reader.readAsArrayBuffer(file);
      };

      img.onerror = () => {
        resolve({ exifData: null, cleanedImageUrl: null });
      };
    } catch (error) {
      console.error("Error extracting EXIF data:", error);
      resolve({ exifData: null, cleanedImageUrl: null });
    }
  });
};
