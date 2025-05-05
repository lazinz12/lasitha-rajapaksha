
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Helmet } from "react-helmet"
import Header from "@/components/Header"

const StringEncoder = () => {
  return (
    <>
      <Helmet>
        <title>String Encoder/Decoder - Convert Text Formats | Lasitha Rajapaksha</title>
        <meta
          name="description"
          content="Free online tool to encode and decode strings in various formats including Base64, URL encoding, HTML entities, and more."
        />
      </Helmet>
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-6">String Encoder/Decoder Tool</h1>
          <div className="prose dark:prose-invert mb-8">
            <h2>Why Encode or Decode Strings?</h2>
            <p>
              String encoding is necessary in many development and security contexts. From URL parameters to data transmission, 
              proper encoding ensures data integrity and compatibility across systems.
            </p>
            
            <h2>Features of Our String Encoder/Decoder</h2>
            <ul>
              <li><strong>Multiple Encoding Methods:</strong> Support for Base64, URL encoding, HTML entities, Hex, Binary, and more.</li>
              <li><strong>Two-Way Conversion:</strong> Easily encode or decode text with a single click.</li>
              <li><strong>Special Character Handling:</strong> Proper handling of Unicode and special characters.</li>
              <li><strong>Bulk Processing:</strong> Process large amounts of text at once.</li>
              <li><strong>Secure Processing:</strong> All encoding/decoding happens in your browser - your data never leaves your device.</li>
            </ul>
            
            <h2>Common Encoding Types and Their Uses</h2>
            <ul>
              <li><strong>Base64:</strong> Commonly used for encoding binary data for transmission in text-based formats like email or HTML.</li>
              <li><strong>URL Encoding:</strong> Used to convert special characters to a format that can be transmitted over the Internet.</li>
              <li><strong>HTML Entities:</strong> Convert special characters to their HTML entity equivalents for safe use in web pages.</li>
              <li><strong>Hexadecimal:</strong> Represent text as a sequence of hexadecimal values, useful for various programming contexts.</li>
              <li><strong>Binary:</strong> Convert text to its binary representation for low-level programming or educational purposes.</li>
            </ul>
            
            <h2>How to Use</h2>
            <ol>
              <li>Enter or paste your text in the input field.</li>
              <li>Select the encoding or decoding method you want to use.</li>
              <li>Click "Encode" or "Decode" to process your text.</li>
              <li>Copy the result or continue editing for further conversions.</li>
            </ol>
            
            <h2>Use Cases</h2>
            <p>
              Web developers use this tool for URL parameter handling, API developers for token generation and validation, 
              security professionals for analyzing encoded data, and anyone working with text that needs to be 
              transmitted safely across different systems.
            </p>
          </div>
          <Card>
            <CardHeader>
              <CardTitle>String Encoder/Decoder</CardTitle>
            </CardHeader>
            <CardContent>
              <p>String Encoder/Decoder tool coming soon...</p>
            </CardContent>
          </Card>
        </main>
      </div>
    </>
  )
}

export default StringEncoder
