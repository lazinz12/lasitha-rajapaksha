
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Calculator, Copy } from "lucide-react";
import { Helmet } from "react-helmet";
import Header from "@/components/Header";

const PercentageCalc = () => {
  const [calculationType, setCalculationType] = useState("percentage");
  const [value1, setValue1] = useState("");
  const [value2, setValue2] = useState("");
  const [result, setResult] = useState<string | null>(null);
  const { toast } = useToast();

  const calculate = () => {
    const num1 = parseFloat(value1);
    const num2 = parseFloat(value2);

    if (isNaN(num1) || (calculationType !== "tip" && isNaN(num2))) {
      toast({
        title: "Error",
        description: "Please enter valid numbers",
        variant: "destructive",
      });
      return;
    }

    let calculatedResult = "";

    switch (calculationType) {
      case "percentage":
        // What is X% of Y?
        calculatedResult = `${num1}% of ${num2} = ${((num1 / 100) * num2).toFixed(2)}`;
        break;
      
      case "percentageOf":
        // X is what percent of Y?
        if (num2 === 0) {
          toast({
            title: "Error",
            description: "Cannot divide by zero",
            variant: "destructive",
          });
          return;
        }
        calculatedResult = `${num1} is ${((num1 / num2) * 100).toFixed(2)}% of ${num2}`;
        break;
      
      case "percentageChange":
        // Percentage change from X to Y
        if (num1 === 0) {
          toast({
            title: "Error",
            description: "Cannot calculate percentage change from zero",
            variant: "destructive",
          });
          return;
        }
        const change = ((num2 - num1) / num1) * 100;
        const changeType = change >= 0 ? "increase" : "decrease";
        calculatedResult = `From ${num1} to ${num2}: ${Math.abs(change).toFixed(2)}% ${changeType}`;
        break;
      
      case "percentageIncrease":
        // Increase X by Y%
        const increased = num1 + (num1 * (num2 / 100));
        calculatedResult = `${num1} increased by ${num2}% = ${increased.toFixed(2)}`;
        break;
      
      case "percentageDecrease":
        // Decrease X by Y%
        const decreased = num1 - (num1 * (num2 / 100));
        calculatedResult = `${num1} decreased by ${num2}% = ${decreased.toFixed(2)}`;
        break;
      
      case "tip":
        // Calculate tip
        const tipPercentage = parseFloat(value2) || 15;
        const tipAmount = (num1 * tipPercentage) / 100;
        const total = num1 + tipAmount;
        calculatedResult = `Bill: $${num1.toFixed(2)}\nTip (${tipPercentage}%): $${tipAmount.toFixed(2)}\nTotal: $${total.toFixed(2)}`;
        break;
      
      case "discount":
        // Calculate discount
        const discountAmount = (num1 * num2) / 100;
        const finalPrice = num1 - discountAmount;
        calculatedResult = `Original: $${num1.toFixed(2)}\nDiscount (${num2}%): -$${discountAmount.toFixed(2)}\nFinal Price: $${finalPrice.toFixed(2)}`;
        break;
      
      default:
        toast({
          title: "Error",
          description: "Invalid calculation type",
          variant: "destructive",
        });
        return;
    }

    setResult(calculatedResult);
    toast({
      title: "Success",
      description: "Calculation completed",
    });
  };

  const copyResult = async () => {
    if (!result) {
      toast({
        title: "Error",
        description: "No result to copy",
        variant: "destructive",
      });
      return;
    }

    try {
      await navigator.clipboard.writeText(result);
      toast({
        title: "Copied",
        description: "Result copied to clipboard",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to copy result",
        variant: "destructive",
      });
    }
  };

  const getInputLabels = () => {
    switch (calculationType) {
      case "percentage":
        return { label1: "Percentage (%)", label2: "Of Value", placeholder1: "25", placeholder2: "200" };
      case "percentageOf":
        return { label1: "Value", label2: "Total Value", placeholder1: "50", placeholder2: "200" };
      case "percentageChange":
        return { label1: "Original Value", label2: "New Value", placeholder1: "100", placeholder2: "120" };
      case "percentageIncrease":
        return { label1: "Original Value", label2: "Increase (%)", placeholder1: "100", placeholder2: "20" };
      case "percentageDecrease":
        return { label1: "Original Value", label2: "Decrease (%)", placeholder1: "100", placeholder2: "20" };
      case "tip":
        return { label1: "Bill Amount ($)", label2: "Tip Percentage (%)", placeholder1: "50.00", placeholder2: "15" };
      case "discount":
        return { label1: "Original Price ($)", label2: "Discount (%)", placeholder1: "100.00", placeholder2: "25" };
      default:
        return { label1: "Value 1", label2: "Value 2", placeholder1: "", placeholder2: "" };
    }
  };

  const labels = getInputLabels();

  return (
    <>
      <Helmet>
        <title>Percentage Calculator - Calculate Percentages Easily | Lasitha Rajapaksha</title>
        <meta name="description" content="Free online percentage calculator. Calculate percentage increases, decreases, differences, and more with this easy-to-use tool." />
      </Helmet>
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-6 flex items-center gap-2">
            <Calculator className="h-8 w-8" />
            Percentage Calculator
          </h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Calculator</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Calculation Type:</label>
                  <select
                    value={calculationType}
                    onChange={(e) => {
                      setCalculationType(e.target.value);
                      setResult(null);
                      setValue1("");
                      setValue2("");
                    }}
                    className="w-full border rounded px-3 py-2"
                  >
                    <option value="percentage">What is X% of Y?</option>
                    <option value="percentageOf">X is what percent of Y?</option>
                    <option value="percentageChange">Percentage change from X to Y</option>
                    <option value="percentageIncrease">Increase X by Y%</option>
                    <option value="percentageDecrease">Decrease X by Y%</option>
                    <option value="tip">Calculate tip</option>
                    <option value="discount">Calculate discount</option>
                  </select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">{labels.label1}:</label>
                    <Input
                      type="number"
                      value={value1}
                      onChange={(e) => setValue1(e.target.value)}
                      placeholder={labels.placeholder1}
                      step="any"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">{labels.label2}:</label>
                    <Input
                      type="number"
                      value={value2}
                      onChange={(e) => setValue2(e.target.value)}
                      placeholder={labels.placeholder2}
                      step="any"
                    />
                  </div>
                </div>

                <Button onClick={calculate} className="w-full">
                  <Calculator className="h-4 w-4 mr-2" />
                  Calculate
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Result
                  {result && (
                    <Button onClick={copyResult} variant="outline" size="sm">
                      <Copy className="h-4 w-4" />
                    </Button>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="min-h-32 border rounded p-4 bg-gray-50">
                  {result ? (
                    <div className="space-y-2">
                      <pre className="text-lg font-mono whitespace-pre-wrap">{result}</pre>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center h-full text-gray-500">
                      Select calculation type and enter values
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Quick Examples</CardTitle>
              </CardHeader>
              <CardContent className="text-sm space-y-2">
                <div><strong>25% of 200</strong> = 50</div>
                <div><strong>50 is 25% of</strong> 200</div>
                <div><strong>From 100 to 120</strong> = 20% increase</div>
                <div><strong>$50 bill + 15% tip</strong> = $57.50</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Common Uses</CardTitle>
              </CardHeader>
              <CardContent className="text-sm space-y-1">
                <div>• Shopping discounts</div>
                <div>• Restaurant tips</div>
                <div>• Business growth rates</div>
                <div>• Test scores</div>
                <div>• Tax calculations</div>
                <div>• Investment returns</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Formulas</CardTitle>
              </CardHeader>
              <CardContent className="text-sm space-y-1">
                <div><strong>Percentage:</strong> (Part/Whole) × 100</div>
                <div><strong>Increase:</strong> ((New-Old)/Old) × 100</div>
                <div><strong>Decrease:</strong> ((Old-New)/Old) × 100</div>
                <div><strong>Of:</strong> (Percentage/100) × Value</div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </>
  );
};

export default PercentageCalc;
