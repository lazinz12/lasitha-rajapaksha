
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Helmet } from "react-helmet"
import Header from "@/components/Header"

const JsonFormatter = () => {
  return (
    <>
      <Helmet>
        <title>JSON Formatter - Format and Validate JSON | Lasitha Rajapaksha</title>
        <meta
          name="description"
          content="Free online tool to format, validate, and beautify JSON data. Make your JSON readable and fix syntax errors instantly."
        />
      </Helmet>
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-6">JSON Formatter Tool</h1>
          <div className="prose dark:prose-invert mb-8">
            <h2>What is JSON?</h2>
            <p>
              JSON (JavaScript Object Notation) is a lightweight data-interchange format that's easy for humans to read and write, 
              and easy for machines to parse and generate. It's commonly used for API responses, configuration files, and data storage.
            </p>
            
            <h2>Why Format Your JSON?</h2>
            <ul>
              <li><strong>Improved Readability:</strong> Properly formatted JSON with correct indentation is much easier to read and understand.</li>
              <li><strong>Error Detection:</strong> Quickly identify syntax errors in your JSON data.</li>
              <li><strong>Validation:</strong> Ensure your JSON is valid and follows the correct structure.</li>
              <li><strong>Debugging:</strong> Format API responses to more easily debug your applications.</li>
              <li><strong>Code Sharing:</strong> Create clean, formatted JSON to share with colleagues or in documentation.</li>
            </ul>
            
            <h2>How to Use This Tool</h2>
            <ol>
              <li>Paste your unformatted JSON into the input area.</li>
              <li>Click the "Format" button to automatically beautify your JSON.</li>
              <li>View any syntax errors or validation issues highlighted for easy correction.</li>
              <li>Adjust the indent size to your preference.</li>
              <li>Copy the formatted result or download it as a .json file.</li>
            </ol>
            
            <h2>Additional Features</h2>
            <p>
              Our JSON Formatter also includes options to minify JSON (remove all whitespace for smaller file sizes), 
              convert JSON to YAML, and validate against JSON Schema. Perfect for developers working with APIs, 
              configuration files, or any JSON-based data.
            </p>
          </div>
          <Card>
            <CardHeader>
              <CardTitle>JSON Formatter</CardTitle>
            </CardHeader>
            <CardContent>
              <p>JSON Formatter tool coming soon...</p>
            </CardContent>
          </Card>
        </main>
      </div>
    </>
  )
}

export default JsonFormatter
