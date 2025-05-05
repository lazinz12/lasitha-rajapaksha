
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Helmet } from "react-helmet"
import Header from "@/components/Header"

const PercentageCalc = () => {
  return (
    <>
      <Helmet>
        <title>Percentage Calculator - Calculate Percentages Easily | Lasitha Rajapaksha</title>
        <meta
          name="description"
          content="Free online percentage calculator. Calculate percentage increases, decreases, differences, and more with this easy-to-use tool."
        />
      </Helmet>
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-6">Percentage Calculator Tool</h1>
          <div className="prose dark:prose-invert mb-8">
            <h2>Why Use a Percentage Calculator?</h2>
            <p>
              Percentages are used daily in finance, business, education, and many other fields. 
              Our Percentage Calculator simplifies these common calculations, ensuring accuracy and saving time.
            </p>
            
            <h2>What Can You Calculate?</h2>
            <ul>
              <li><strong>Basic Percentage:</strong> Find X% of Y (e.g., 15% of 200)</li>
              <li><strong>Percentage Change:</strong> Calculate the percentage increase or decrease between two values</li>
              <li><strong>Reverse Percentage:</strong> Find the original value before a percentage was applied</li>
              <li><strong>Percentage Difference:</strong> Compare two values as a percentage</li>
              <li><strong>Percentage Distribution:</strong> Calculate percentages across multiple values</li>
              <li><strong>Tip Calculator:</strong> Quickly determine appropriate tips for services</li>
              <li><strong>Discount and Tax:</strong> Calculate final prices after discounts and taxes</li>
            </ul>
            
            <h2>How to Use</h2>
            <p>Our calculator offers several calculation modes:</p>
            
            <h3>1. Find Percentage Value</h3>
            <ol>
              <li>Enter the percentage (e.g., 25%)</li>
              <li>Enter the value (e.g., 80)</li>
              <li>The calculator will show that 25% of 80 is 20</li>
            </ol>
            
            <h3>2. Calculate Percentage Change</h3>
            <ol>
              <li>Enter the original value (e.g., 200)</li>
              <li>Enter the new value (e.g., 250)</li>
              <li>The calculator will show a 25% increase</li>
            </ol>
            
            <h3>3. Other Calculations</h3>
            <p>
              Simply select the appropriate calculation type from the dropdown menu and follow the 
              intuitive interface to input your values. Results are calculated instantly.
            </p>
            
            <h2>Practical Applications</h2>
            <p>
              Use our Percentage Calculator for calculating discounts while shopping, 
              determining tips at restaurants, analyzing business growth rates, 
              calculating grades in education, figuring out tax amounts, and many other everyday scenarios.
            </p>
          </div>
          <Card>
            <CardHeader>
              <CardTitle>Percentage Calculator</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Percentage Calculator tool coming soon...</p>
            </CardContent>
          </Card>
        </main>
      </div>
    </>
  )
}

export default PercentageCalc
