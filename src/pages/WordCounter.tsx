
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Helmet } from "react-helmet"
import Header from "@/components/Header"

const WordCounter = () => {
  const [text, setText] = useState("")

  const getStats = () => {
    const trimmedText = text.trim()
    
    // Handle empty text
    if (!trimmedText) {
      return {
        characters: 0,
        words: 0,
        sentences: 0,
        paragraphs: 0,
        charactersNoSpaces: 0,
      }
    }

    const words = trimmedText.split(/\s+/).length
    const characters = text.length
    const charactersNoSpaces = text.replace(/\s/g, "").length
    const sentences = trimmedText.split(/[.!?]+/).filter(Boolean).length
    const paragraphs = trimmedText.split(/\n\s*\n/).filter(Boolean).length

    return {
      characters,
      words,
      sentences,
      paragraphs,
      charactersNoSpaces,
    }
  }

  const stats = getStats()

  return (
    <>
      <Helmet>
        <title>Word Counter - Count Words, Characters & More | Lasitha Rajapaksha</title>
        <meta
          name="description"
          content="Free online word counter tool. Count words, characters, sentences, and paragraphs in your text. Perfect for essays, articles, and content writing."
        />
      </Helmet>
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto py-8">
          <h1 className="text-3xl font-bold mb-6">Word Counter Tool</h1>
          <div className="prose dark:prose-invert mb-8 max-w-3xl">
            <h2>Why Use a Word Counter?</h2>
            <p>
              Whether you're writing an essay with strict word count requirements, 
              crafting a social media post, or optimizing content for SEO, 
              knowing your text statistics is essential for many writing tasks.
            </p>
            
            <h2>What Our Word Counter Tracks</h2>
            <ul>
              <li><strong>Words:</strong> Total number of words in your text.</li>
              <li><strong>Characters:</strong> Total number of characters, including spaces and punctuation.</li>
              <li><strong>Characters (no spaces):</strong> Character count excluding spaces.</li>
              <li><strong>Sentences:</strong> Number of sentences, detected by periods, question marks, and exclamation points.</li>
              <li><strong>Paragraphs:</strong> Number of paragraphs, detected by line breaks.</li>
            </ul>
            
            <h2>Common Use Cases</h2>
            <ul>
              <li><strong>Academic Writing:</strong> Ensure essays meet word count requirements.</li>
              <li><strong>Content Creation:</strong> Optimize article length for SEO and readability.</li>
              <li><strong>Social Media:</strong> Keep posts within character limits.</li>
              <li><strong>Email Marketing:</strong> Create concise, effective email copy.</li>
              <li><strong>Translation Work:</strong> Track text expansion or contraction between languages.</li>
            </ul>
            
            <h2>How to Use</h2>
            <p>
              Simply type or paste your text into the text area below. 
              The word count and other statistics will update automatically as you type. 
              All processing happens in your browser - your text is never sent to a server.
            </p>
          </div>
          <Card>
            <CardHeader>
              <CardTitle>Word Counter</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <Textarea
                placeholder="Type or paste your text here..."
                className="min-h-[200px] resize-none"
                value={text}
                onChange={(e) => setText(e.target.value)}
              />
              
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                <div className="flex flex-col items-center p-4 bg-muted rounded-lg">
                  <span className="text-sm text-muted-foreground">Words</span>
                  <Badge variant="secondary" className="mt-1">
                    {stats.words}
                  </Badge>
                </div>
                
                <div className="flex flex-col items-center p-4 bg-muted rounded-lg">
                  <span className="text-sm text-muted-foreground">Characters</span>
                  <Badge variant="secondary" className="mt-1">
                    {stats.characters}
                  </Badge>
                </div>
                
                <div className="flex flex-col items-center p-4 bg-muted rounded-lg">
                  <span className="text-sm text-muted-foreground">Characters (no spaces)</span>
                  <Badge variant="secondary" className="mt-1">
                    {stats.charactersNoSpaces}
                  </Badge>
                </div>
                
                <div className="flex flex-col items-center p-4 bg-muted rounded-lg">
                  <span className="text-sm text-muted-foreground">Sentences</span>
                  <Badge variant="secondary" className="mt-1">
                    {stats.sentences}
                  </Badge>
                </div>
                
                <div className="flex flex-col items-center p-4 bg-muted rounded-lg">
                  <span className="text-sm text-muted-foreground">Paragraphs</span>
                  <Badge variant="secondary" className="mt-1">
                    {stats.paragraphs}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </>
  )
}

export default WordCounter
