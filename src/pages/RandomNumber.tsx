
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Copy, Shuffle, RotateCcw, Download } from "lucide-react";
import { Helmet } from "react-helmet";
import Header from "@/components/Header";

const RandomNumber = () => {
  const [minValue, setMinValue] = useState(1);
  const [maxValue, setMaxValue] = useState(100);
  const [count, setCount] = useState(1);
  const [allowDuplicates, setAllowDuplicates] = useState(true);
  const [decimalPlaces, setDecimalPlaces] = useState(0);
  const [results, setResults] = useState<number[]>([]);
  const { toast } = useToast();

  const generateNumbers = () => {
    if (minValue >= maxValue) {
      toast({
        title: "Error",
        description: "Minimum value must be less than maximum value",
        variant: "destructive",
      });
      return;
    }

    if (count < 1 || count > 1000) {
      toast({
        title: "Error",
        description: "Count must be between 1 and 1000",
        variant: "destructive",
      });
      return;
    }

    if (!allowDuplicates && count > (maxValue - minValue + 1)) {
      toast({
        title: "Error",
        description: "Cannot generate more unique numbers than the range allows",
        variant: "destructive",
      });
      return;
    }

    const numbers: number[] = [];
    const usedNumbers = new Set<number>();

    for (let i = 0; i < count; i++) {
      let randomNum: number;
      
      if (allowDuplicates) {
        randomNum = Math.random() * (maxValue - minValue) + minValue;
      } else {
        do {
          randomNum = Math.random() * (maxValue - minValue) + minValue;
          if (decimalPlaces === 0) {
            randomNum = Math.floor(randomNum);
          }
        } while (usedNumbers.has(randomNum) && usedNumbers.size < (maxValue - minValue + 1));
        
        usedNumbers.add(randomNum);
      }

      if (decimalPlaces === 0) {
        randomNum = Math.floor(randomNum);
      } else {
        randomNum = parseFloat(randomNum.toFixed(decimalPlaces));
      }

      numbers.push(randomNum);
    }

    setResults(numbers);
    toast({
      title: "Success",
      description: `Generated ${numbers.length} random number(s)`,
    });
  };

  const copyResults = async () => {
    if (results.length === 0) {
      toast({
        title: "Error",
        description: "No numbers to copy",
        variant: "destructive",
      });
      return;
    }

    try {
      await navigator.clipboard.writeText(results.join(', '));
      toast({
        title: "Copied",
        description: "Numbers copied to clipboard",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to copy numbers",
        variant: "destructive",
      });
    }
  };

  const downloadResults = () => {
    if (results.length === 0) {
      toast({
        title: "Error",
        description: "No numbers to download",
        variant: "destructive",
      });
      return;
    }

    const text = results.join('\n');
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'random-numbers.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const clearResults = () => {
    setResults([]);
  };

  const generateQuickNumbers = (preset: string) => {
    switch (preset) {
      case 'dice':
        setMinValue(1);
        setMaxValue(6);
        setCount(1);
        setDecimalPlaces(0);
        break;
      case 'coin':
        setMinValue(0);
        setMaxValue(1);
        setCount(1);
        setDecimalPlaces(0);
        break;
      case 'lottery':
        setMinValue(1);
        setMaxValue(49);
        setCount(6);
        setAllowDuplicates(false);
        setDecimalPlaces(0);
        break;
      case 'percentage':
        setMinValue(0);
        setMaxValue(100);
        setCount(1);
        setDecimalPlaces(2);
        break;
    }
  };

  return (
    <>
      <Helmet>
        <title>Random Number Generator - Generate Random Numbers | Lasitha Rajapaksha</title>
        <meta name="description" content="Free online tool to generate random numbers with custom ranges, distributions, and formats. Perfect for lottery picks, dice rolls, and statistical sampling." />
      </Helmet>
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-6 flex items-center gap-2">
            <Shuffle className="h-8 w-8" />
            Random Number Generator
          </h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Generator Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Minimum Value:</label>
                    <Input
                      type="number"
                      value={minValue}
                      onChange={(e) => setMinValue(parseFloat(e.target.value) || 0)}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Maximum Value:</label>
                    <Input
                      type="number"
                      value={maxValue}
                      onChange={(e) => setMaxValue(parseFloat(e.target.value) || 100)}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Count:</label>
                    <Input
                      type="number"
                      value={count}
                      onChange={(e) => setCount(parseInt(e.target.value) || 1)}
                      min="1"
                      max="1000"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Decimal Places:</label>
                    <Input
                      type="number"
                      value={decimalPlaces}
                      onChange={(e) => setDecimalPlaces(parseInt(e.target.value) || 0)}
                      min="0"
                      max="10"
                    />
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="allowDuplicates"
                    checked={allowDuplicates}
                    onChange={(e) => setAllowDuplicates(e.target.checked)}
                    className="rounded"
                  />
                  <label htmlFor="allowDuplicates" className="text-sm font-medium">
                    Allow duplicate numbers
                  </label>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Quick Presets:</label>
                  <div className="grid grid-cols-2 gap-2">
                    <Button 
                      onClick={() => generateQuickNumbers('dice')} 
                      variant="outline" 
                      size="sm"
                    >
                      Dice (1-6)
                    </Button>
                    <Button 
                      onClick={() => generateQuickNumbers('coin')} 
                      variant="outline" 
                      size="sm"
                    >
                      Coin (0-1)
                    </Button>
                    <Button 
                      onClick={() => generateQuickNumbers('lottery')} 
                      variant="outline" 
                      size="sm"
                    >
                      Lottery
                    </Button>
                    <Button 
                      onClick={() => generateQuickNumbers('percentage')} 
                      variant="outline" 
                      size="sm"
                    >
                      Percentage
                    </Button>
                  </div>
                </div>

                <Button onClick={generateNumbers} className="w-full">
                  <Shuffle className="h-4 w-4 mr-2" />
                  Generate Numbers
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Results ({results.length})
                  <div className="flex gap-2">
                    <Button onClick={copyResults} variant="outline" size="sm">
                      <Copy className="h-4 w-4" />
                    </Button>
                    <Button onClick={downloadResults} variant="outline" size="sm">
                      <Download className="h-4 w-4" />
                    </Button>
                    <Button onClick={clearResults} variant="outline" size="sm">
                      <RotateCcw className="h-4 w-4" />
                    </Button>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="min-h-64 border rounded p-4 bg-gray-50">
                  {results.length > 0 ? (
                    <div className="space-y-2">
                      <div className="flex flex-wrap gap-2">
                        {results.map((num, index) => (
                          <span
                            key={index}
                            className="bg-primary text-primary-foreground px-3 py-1 rounded text-center font-mono"
                          >
                            {num}
                          </span>
                        ))}
                      </div>
                      <div className="text-sm text-gray-600 pt-4 border-t">
                        <p>Range: {minValue} to {maxValue}</p>
                        <p>Count: {results.length}</p>
                        {results.length > 1 && (
                          <>
                            <p>Sum: {results.reduce((a, b) => a + b, 0).toFixed(decimalPlaces)}</p>
                            <p>Average: {(results.reduce((a, b) => a + b, 0) / results.length).toFixed(decimalPlaces)}</p>
                          </>
                        )}
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center h-full text-gray-500">
                      Click "Generate Numbers" to see results
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Use Cases</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
                <div>
                  <h4 className="font-semibold mb-2">Gaming & Fun:</h4>
                  <ul className="space-y-1">
                    <li>• Dice rolls for board games</li>
                    <li>• Lottery number picks</li>
                    <li>• Random team assignments</li>
                    <li>• Prize draw selections</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Research & Statistics:</h4>
                  <ul className="space-y-1">
                    <li>• Random sampling</li>
                    <li>• Survey respondent selection</li>
                    <li>• Statistical simulations</li>
                    <li>• Test data generation</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Development:</h4>
                  <ul className="space-y-1">
                    <li>• Password generation seeds</li>
                    <li>• Random test cases</li>
                    <li>• Mock data creation</li>
                    <li>• Algorithm testing</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </>
  );
};

export default RandomNumber;
