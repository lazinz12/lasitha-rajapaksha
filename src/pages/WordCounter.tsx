import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

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
    <div className="container mx-auto py-8">
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
    </div>
  )
}

export default WordCounter