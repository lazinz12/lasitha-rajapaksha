
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";

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
    <div className="container mx-auto py-8">
      <Card>
        <CardHeader>
          <CardTitle>Calculator</CardTitle>
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
              <Button variant="secondary" onClick={() => handleEqual()} className="row-span-4">=</Button>
              
              <Button onClick={() => handleNumber('1')}>1</Button>
              <Button onClick={() => handleNumber('2')}>2</Button>
              <Button onClick={() => handleNumber('3')}>3</Button>
              
              <Button onClick={() => handleNumber('0')} className="col-span-2">0</Button>
              <Button onClick={() => handleNumber('.')}>.</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Calculator;
