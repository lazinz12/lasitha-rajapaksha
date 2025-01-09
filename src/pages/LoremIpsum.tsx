import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const LoremIpsum = () => {
  return (
    <div className="container mx-auto py-8">
      <Card>
        <CardHeader>
          <CardTitle>Lorem Ipsum Generator</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Lorem Ipsum Generator tool coming soon...</p>
        </CardContent>
      </Card>
    </div>
  )
}

export default LoremIpsum