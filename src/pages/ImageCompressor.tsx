
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Helmet } from "react-helmet"
import Header from "@/components/Header"

const ImageCompressor = () => {
  return (
    <>
      <Helmet>
        <title>Image Compressor - Reduce Image File Size | Lasitha Rajapaksha</title>
        <meta
          name="description"
          content="Free online tool to compress images without losing quality. Optimize images for web, reduce file size, and speed up your website."
        />
      </Helmet>
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-6">Image Compressor Tool</h1>
          <div className="prose dark:prose-invert mb-8">
            <h2>Why Compress Images?</h2>
            <p>
              Large image files can significantly slow down websites, waste storage space, and consume unnecessary bandwidth. 
              Our Image Compressor tool helps you reduce image file sizes while maintaining visual quality.
            </p>
            
            <h2>Benefits of Image Compression</h2>
            <ul>
              <li><strong>Faster Website Loading:</strong> Smaller images load faster, improving user experience and SEO rankings.</li>
              <li><strong>Reduced Bandwidth Usage:</strong> Save on hosting costs and provide better experiences for users with limited data plans.</li>
              <li><strong>Better Storage Efficiency:</strong> Store more images with the same amount of disk space.</li>
              <li><strong>Improved Email Deliverability:</strong> Attach compressed images to emails without hitting size limits.</li>
              <li><strong>Enhanced Mobile Experience:</strong> Optimize images for faster loading on mobile devices with limited connectivity.</li>
            </ul>
            
            <h2>How to Use Our Image Compressor</h2>
            <ol>
              <li>Upload your image (JPG, PNG, WebP, or GIF).</li>
              <li>Choose your desired compression level (quality setting).</li>
              <li>Preview the compressed result and compare with the original.</li>
              <li>Adjust settings as needed to balance size and quality.</li>
              <li>Download your optimized image.</li>
            </ol>
            
            <h2>Smart Compression Technology</h2>
            <p>
              Our tool uses advanced algorithms to analyze and optimize each image intelligently, removing unnecessary metadata 
              and applying the most efficient compression method for your specific image type. All processing happens in your 
              browser - your images are never uploaded to our servers.
            </p>
          </div>
          <Card>
            <CardHeader>
              <CardTitle>Image Compressor</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Image Compressor tool coming soon...</p>
            </CardContent>
          </Card>
        </main>
      </div>
    </>
  )
}

export default ImageCompressor
