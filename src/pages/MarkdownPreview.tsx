
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Helmet } from "react-helmet"
import Header from "@/components/Header"

const MarkdownPreview = () => {
  return (
    <>
      <Helmet>
        <title>Markdown Preview - Live Markdown Editor | Lasitha Rajapaksha</title>
        <meta
          name="description"
          content="Free online tool to edit and preview Markdown in real-time. Create perfectly formatted documents, README files, and documentation easily."
        />
      </Helmet>
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-6">Markdown Preview Tool</h1>
          <div className="prose dark:prose-invert mb-8">
            <h2>What is Markdown?</h2>
            <p>
              Markdown is a lightweight markup language that allows you to write formatted content using plain text syntax. 
              It's widely used for documentation, README files, forum posts, and more due to its simplicity and readability.
            </p>
            
            <h2>Why Use Our Markdown Preview Tool?</h2>
            <ul>
              <li><strong>Real-time Preview:</strong> See your formatted output instantly as you type.</li>
              <li><strong>No Sign-up Required:</strong> Start using the tool immediately without creating an account.</li>
              <li><strong>GitHub Flavored Markdown:</strong> Support for tables, code blocks, task lists, and other GitHub-specific syntax.</li>
              <li><strong>Export Options:</strong> Convert your Markdown to HTML, PDF, or plain text with a single click.</li>
              <li><strong>Syntax Highlighting:</strong> Properly highlighted code blocks for over 100 programming languages.</li>
              <li><strong>Local Storage:</strong> Your work is automatically saved in your browser.</li>
            </ul>
            
            <h2>How to Use</h2>
            <ol>
              <li>Type or paste your Markdown text in the editor pane.</li>
              <li>See the rendered HTML preview in real-time on the right.</li>
              <li>Use the toolbar for common formatting options and shortcuts.</li>
              <li>Copy the resulting HTML or download your document in your preferred format.</li>
            </ol>
            
            <h2>Common Markdown Elements</h2>
            <p>
              Our preview supports all standard Markdown elements including headings, bold/italic text, 
              links, images, lists, blockquotes, tables, code blocks, horizontal rules, and more. 
              Perfect for writing documentation, blog posts, or any formatted text content.
            </p>
          </div>
          <Card>
            <CardHeader>
              <CardTitle>Markdown Preview</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Markdown Preview tool coming soon...</p>
            </CardContent>
          </Card>
        </main>
      </div>
    </>
  )
}

export default MarkdownPreview
