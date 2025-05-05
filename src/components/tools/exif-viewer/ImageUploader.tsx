
import { Card, CardContent } from "@/components/ui/card";
import { FileUploader } from "@/components/ui/file-uploader";

interface ImageUploaderProps {
  onImageSelected: (file: File) => void;
}

export const ImageUploader = ({ onImageSelected }: ImageUploaderProps) => {
  return (
    <Card>
      <CardContent className="pt-6">
        <FileUploader
          onUpload={onImageSelected}
          acceptedFileTypes={['.jpeg', '.jpg', '.png', '.gif', '.tiff']}
          maxFileSizeMB={5}
          maxFiles={1}
        />
      </CardContent>
    </Card>
  );
};
