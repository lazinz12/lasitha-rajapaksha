
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Helmet } from "react-helmet"
import Header from "@/components/Header"

const ImageCropper = () => {
  return (
    <>
      <Helmet>
        <title>Image Cropper - Crop Images Online | Lasitha Rajapaksha</title>
        <meta
          name="description"
          content="Free online tool to crop, resize, and edit images. Create perfect thumbnails, profile pictures, or product images easily."
        />
      </Helmet>
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-6">Image Cropper Tool</h1>
          <div className="prose dark:prose-invert mb-8">
            <h2>Why Use an Image Cropper?</h2>
            <p>
              Images often need adjustments before being used on websites, social media, or print materials. 
              Our Image Cropper tool provides a simple way to perfectly frame your images for any purpose.
            </p>
            
            <h2>Benefits of Using This Tool</h2>
            <ul>
              <li><strong>No Software Required:</strong> Edit images right in your browser without installing any software.</li>
              <li><strong>Precise Control:</strong> Get pixel-perfect crops with our intuitive interface.</li>
              <li><strong>Multiple Aspect Ratios:</strong> Choose from common aspect ratios like 1:1 for profile pictures, 16:9 for videos, etc.</li>
              <li><strong>Custom Dimensions:</strong> Specify exact pixel dimensions for your cropped images.</li>
              <li><strong>Privacy First:</strong> All processing happens in your browser - your images are never uploaded to a server.</li>
            </ul>
            
            <h2>How to Use</h2>
            <ol>
              <li>Upload an image from your device.</li>
              <li>Adjust the crop area by dragging the corners or edges.</li>
              <li>Select a preset aspect ratio or enter custom dimensions.</li>
              <li>Preview your cropped image.</li>
              <li>Download the result in your preferred format (JPG, PNG).</li>
            </ol>
            
            <h2>Common Uses</h2>
            <p>
              Use our Image Cropper for creating social media profile pictures, resizing product images for your online store, 
              preparing photos for your blog, creating perfectly sized thumbnails, and much more.
            </p>
          </div>
          <Card>
            <CardHeader>
              <CardTitle>Image Cropper</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Image Cropper tool coming soon...</p>
            </CardContent>
          </Card>
        </main>
      </div>
    </>
  )
}

export default ImageCropper
