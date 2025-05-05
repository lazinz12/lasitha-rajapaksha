
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Helmet } from "react-helmet"
import Header from "@/components/Header"

const RandomNumber = () => {
  return (
    <>
      <Helmet>
        <title>Random Number Generator - Generate Random Numbers | Lasitha Rajapaksha</title>
        <meta
          name="description"
          content="Free online tool to generate random numbers with custom ranges, distributions, and formats. Perfect for lottery picks, dice rolls, and statistical sampling."
        />
      </Helmet>
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-6">Random Number Generator Tool</h1>
          <div className="prose dark:prose-invert mb-8">
            <h2>When Do You Need Random Numbers?</h2>
            <p>
              Random numbers are essential in many fields including statistics, cryptography, gaming, and simulations. 
              Whether you're selecting lottery numbers, conducting a statistical experiment, or creating a secure password, 
              our Random Number Generator offers a reliable source of randomness.
            </p>
            
            <h2>Features of Our Random Number Generator</h2>
            <ul>
              <li><strong>Customizable Range:</strong> Generate numbers within any minimum and maximum values.</li>
              <li><strong>Multiple Numbers:</strong> Generate one or multiple random numbers at once.</li>
              <li><strong>Include/Exclude Options:</strong> Specify numbers to include or exclude from the results.</li>
              <li><strong>Various Distributions:</strong> Choose from uniform, normal (Gaussian), or other statistical distributions.</li>
              <li><strong>Unique Numbers:</strong> Option to generate non-repeating random numbers (like lottery draws).</li>
              <li><strong>Decimal Places Control:</strong> Specify precision for decimal numbers.</li>
            </ul>
            
            <h2>How to Use</h2>
            <ol>
              <li>Set your minimum and maximum values for the desired range.</li>
              <li>Choose how many random numbers you want to generate.</li>
              <li>Select additional options like unique numbers or specific distribution.</li>
              <li>Click "Generate" to see your random numbers instantly.</li>
              <li>Copy the results or export them to CSV/Excel format.</li>
            </ol>
            
            <h2>Common Applications</h2>
            <p>
              Use our Random Number Generator for lottery and raffle picks, statistical sampling, 
              dice game simulations, random assignments in experiments, creating test data sets,
              password generation, and any situation where unbiased random selection is needed.
            </p>
          </div>
          <Card>
            <CardHeader>
              <CardTitle>Random Number Generator</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Random Number Generator tool coming soon...</p>
            </CardContent>
          </Card>
        </main>
      </div>
    </>
  )
}

export default RandomNumber
