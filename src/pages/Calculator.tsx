
import { useState } from "react";
import { Helmet } from "react-helmet";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { Calculator as CalculatorIcon } from "lucide-react";
import Header from "@/components/Header";

const Calculator = () => {
  const [display, setDisplay] = useState("0");
  const [equation, setEquation] = useState("");
  const { toast } = useToast();

  const handleNumber = (number: string) => {
    if (display === "0") {
      setDisplay(number);
    } else {
      setDisplay(display + number);
    }
  };

  const handleOperator = (operator: string) => {
    setEquation(display + " " + operator + " ");
    setDisplay("0");
  };

  const handleEqual = () => {
    try {
      const result = eval(equation + display);
      setDisplay(String(result));
      setEquation("");
    } catch (error) {
      toast({
        title: "Error",
        description: "Invalid calculation",
        variant: "destructive",
      });
    }
  };

  const handleClear = () => {
    setDisplay("0");
    setEquation("");
  };

  return (
    <>
      <Helmet>
        <title>Online Calculator - Free Web Calculator Tool | Lasitha Rajapaksha</title>
        <meta
          name="description"
          content="Free online calculator for basic math operations. Perform addition, subtraction, multiplication, and division calculations instantly in your browser."
        />
        <meta
          name="keywords"
          content="online calculator, web calculator, free calculator, math calculator, basic calculator, addition calculator, subtraction calculator, multiplication calculator, division calculator"
        />
        <meta property="og:title" content="Online Calculator - Free Web Calculator Tool" />
        <meta property="og:description" content="Free online calculator for basic math operations. Fast and easy to use web-based calculator." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://lasitharajapaksha.netlify.app/tools/calculator" />
        <link rel="canonical" href="https://lasitharajapaksha.netlify.app/tools/calculator" />
      </Helmet>
      
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-4 flex items-center justify-center gap-2">
              <CalculatorIcon className="h-8 w-8" />
              Online Calculator
            </h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Perform basic mathematical calculations with this easy-to-use online calculator. 
              Perfect for quick calculations, homework, or everyday math needs.
            </p>
          </div>

          <Card className="max-w-md mx-auto">
            <CardHeader>
              <CardTitle className="text-center">Calculator</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="bg-muted p-4 rounded-lg">
                  <div className="text-sm text-muted-foreground">{equation}</div>
                  <div className="text-3xl font-bold">{display}</div>
                </div>
                
                <div className="grid grid-cols-4 gap-2">
                  <Button variant="outline" onClick={() => handleClear()}>C</Button>
                  <Button variant="outline" onClick={() => handleOperator('/')}>/</Button>
                  <Button variant="outline" onClick={() => handleOperator('*')}>×</Button>
                  <Button variant="outline" onClick={() => handleOperator('-')}>-</Button>
                  
                  <Button onClick={() => handleNumber('7')}>7</Button>
                  <Button onClick={() => handleNumber('8')}>8</Button>
                  <Button onClick={() => handleNumber('9')}>9</Button>
                  <Button variant="outline" onClick={() => handleOperator('+')}>+</Button>
                  
                  <Button onClick={() => handleNumber('4')}>4</Button>
                  <Button onClick={() => handleNumber('5')}>5</Button>
                  <Button onClick={() => handleNumber('6')}>6</Button>
                  <Button variant="secondary" onClick={() => handleEqual()} className="row-span-2">=</Button>
                  
                  <Button onClick={() => handleNumber('1')}>1</Button>
                  <Button onClick={() => handleNumber('2')}>2</Button>
                  <Button onClick={() => handleNumber('3')}>3</Button>
                  
                  <Button onClick={() => handleNumber('0')} className="col-span-2">0</Button>
                  <Button onClick={() => handleNumber('.')}>.</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </>
  );
};

export default Calculator;
