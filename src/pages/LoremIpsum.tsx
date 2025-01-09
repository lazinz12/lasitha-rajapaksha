import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import { Copy } from "lucide-react"

const LoremIpsum = () => {
  const [paragraphs, setParagraphs] = useState(1)
  const [wordsPerParagraph, setWordsPerParagraph] = useState(50)
  const [startWithLorem, setStartWithLorem] = useState(true)
  const [generatedText, setGeneratedText] = useState("")
  const { toast } = useToast()

  const words = [
    "lorem", "ipsum", "dolor", "sit", "amet", "consectetur", "adipiscing", "elit",
    "sed", "do", "eiusmod", "tempor", "incididunt", "ut", "labore", "et", "dolore",
    "magna", "aliqua", "enim", "ad", "minim", "veniam", "quis", "nostrud",
    "exercitation", "ullamco", "laboris", "nisi", "ut", "aliquip", "ex", "ea",
    "commodo", "consequat", "duis", "aute", "irure", "dolor", "in", "reprehenderit",
    "voluptate", "velit", "esse", "cillum", "dolore", "eu", "fugiat", "nulla",
    "pariatur", "excepteur", "sint", "occaecat", "cupidatat", "non", "proident",
    "sunt", "in", "culpa", "qui", "officia", "deserunt", "mollit", "anim", "id",
    "est", "laborum"
  ]

  const generateText = () => {
    let result = []
    for (let i = 0; i < paragraphs; i++) {
      let paragraph = []
      for (let j = 0; j < wordsPerParagraph; j++) {
        if (j === 0 && i === 0 && startWithLorem) {
          paragraph.push("Lorem ipsum dolor sit amet,")
          j += 4
        } else {
          paragraph.push(words[Math.floor(Math.random() * words.length)])
        }
      }
      result.push(paragraph.join(" ") + ".")
    }
    setGeneratedText(result.join("\n\n"))
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedText)
    toast({
      title: "Copied to clipboard",
      description: "The Lorem Ipsum text has been copied to your clipboard.",
    })
  }

  return (
    <div className="container mx-auto py-8">
      <Card>
        <CardHeader>
          <CardTitle>Lorem Ipsum Generator</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="paragraphs">Number of Paragraphs</Label>
                <Input
                  id="paragraphs"
                  type="number"
                  min="1"
                  max="10"
                  value={paragraphs}
                  onChange={(e) => setParagraphs(parseInt(e.target.value))}
                />
              </div>
              <div>
                <Label htmlFor="words">Words per Paragraph</Label>
                <Input
                  id="words"
                  type="number"
                  min="10"
                  max="100"
                  value={wordsPerParagraph}
                  onChange={(e) => setWordsPerParagraph(parseInt(e.target.value))}
                />
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="lorem"
                  checked={startWithLorem}
                  onCheckedChange={(checked) => setStartWithLorem(checked as boolean)}
                />
                <Label htmlFor="lorem">Start with "Lorem ipsum"</Label>
              </div>
              <Button onClick={generateText} className="w-full">
                Generate Text
              </Button>
            </div>
            <div className="space-y-4">
              <div className="relative">
                <Textarea
                  value={generatedText}
                  readOnly
                  className="min-h-[200px] resize-none"
                  placeholder="Generated Lorem Ipsum text will appear here..."
                />
                {generatedText && (
                  <Button
                    variant="outline"
                    size="icon"
                    className="absolute top-2 right-2"
                    onClick={copyToClipboard}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default LoremIpsum