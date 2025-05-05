
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Helmet } from "react-helmet"
import Header from "@/components/Header"

const RegexTester = () => {
  return (
    <>
      <Helmet>
        <title>RegEx Tester - Test Regular Expressions | Lasitha Rajapaksha</title>
        <meta
          name="description"
          content="Free online tool to test and debug regular expressions in real-time. See matches, capture groups, and validate patterns instantly."
        />
      </Helmet>
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-6">RegEx Tester Tool</h1>
          <div className="prose dark:prose-invert mb-8">
            <h2>What is a Regular Expression?</h2>
            <p>
              Regular expressions (RegEx) are patterns used to match character combinations in strings. 
              They are powerful tools for text processing and form validation used by developers across various programming languages.
            </p>
            
            <h2>Why Use This Tool?</h2>
            <ul>
              <li><strong>Instant Testing:</strong> Test your regular expressions in real-time and see matches highlighted instantly.</li>
              <li><strong>Debug Complex Patterns:</strong> Break down complex regex patterns and understand how they work.</li>
              <li><strong>Validate Form Inputs:</strong> Create and test regex patterns for email validation, password requirements, etc.</li>
              <li><strong>Data Extraction:</strong> Test patterns for extracting specific information from text like dates, phone numbers, or addresses.</li>
            </ul>
            
            <h2>How to Use</h2>
            <ol>
              <li>Enter your regular expression in the pattern field.</li>
              <li>Enter the test string in the input area.</li>
              <li>View matches highlighted in real-time.</li>
              <li>Toggle flags like case sensitivity, global matching, etc.</li>
              <li>Check captured groups and test against multiple examples.</li>
            </ol>
          </div>
          <Card>
            <CardHeader>
              <CardTitle>RegEx Tester</CardTitle>
            </CardHeader>
            <CardContent>
              <p>RegEx Tester tool coming soon...</p>
            </CardContent>
          </Card>
        </main>
      </div>
    </>
  )
}

export default RegexTester
