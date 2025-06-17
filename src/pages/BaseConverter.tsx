
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Copy, Calculator } from "lucide-react";
import { Helmet } from "react-helmet";
import Header from "@/components/Header";

const BaseConverter = () => {
  const [input, setInput] = useState("");
  const [fromBase, setFromBase] = useState("10");
  const [results, setResults] = useState({
    binary: "",
    decimal: "",
    hexadecimal: "",
    octal: ""
  });
  const { toast } = useToast();

  const convertNumber = () => {
    if (!input.trim()) {
      toast({
        title: "Error",
        description: "Please enter a number to convert",
        variant: "destructive",
      });
      return;
    }

    try {
      let decimalValue: number;
      
      // Convert input to decimal first
      switch (fromBase) {
        case "2":
          decimalValue = parseInt(input, 2);
          break;
        case "8":
          decimalValue = parseInt(input, 8);
          break;
        case "10":
          decimalValue = parseInt(input, 10);
          break;
        case "16":
          decimalValue = parseInt(input, 16);
          break;
        default:
          throw new Error("Invalid base");
      }

      if (isNaN(decimalValue)) {
        throw new Error("Invalid number for selected base");
      }

      // Convert decimal to all bases
      setResults({
        binary: decimalValue.toString(2),
        decimal: decimalValue.toString(10),
        hexadecimal: decimalValue.toString(16).toUpperCase(),
        octal: decimalValue.toString(8)
      });

      toast({
        title: "Success",
        description: "Number converted successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Invalid number for the selected base",
        variant: "destructive",
      });
    }
  };

  const copyToClipboard = async (value: string, base: string) => {
    try {
      await navigator.clipboard.writeText(value);
      toast({
        title: "Copied",
        description: `${base} value copied to clipboard`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to copy value",
        variant: "destructive",
      });
    }
  };

  return (
    <>
      <Helmet>
        <title>Number Base Converter - Binary, Decimal, Hex, Octal | Lasitha Rajapaksha</title>
        <meta name="description" content="Convert numbers between binary, decimal, hexadecimal, and octal bases instantly." />
      </Helmet>
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-6 flex items-center gap-2">
            <Calculator className="h-8 w-8" />
            Number Base Converter
          </h1>
          
          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle>Convert Number Bases</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Input Number:</label>
                  <Input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Enter number..."
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">From Base:</label>
                  <select
                    value={fromBase}
                    onChange={(e) => setFromBase(e.target.value)}
                    className="w-full border rounded px-3 py-2"
                  >
                    <option value="2">Binary (Base 2)</option>
                    <option value="8">Octal (Base 8)</option>
                    <option value="10">Decimal (Base 10)</option>
                    <option value="16">Hexadecimal (Base 16)</option>
                  </select>
                </div>
              </div>

              <Button onClick={convertNumber} className="w-full">
                Convert
              </Button>

              {results.decimal && (
                <div className="space-y-3">
                  <h3 className="font-semibold">Results:</h3>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
                      <div>
                        <span className="font-medium">Binary: </span>
                        <span className="font-mono">{results.binary}</span>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => copyToClipboard(results.binary, "Binary")}
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
                      <div>
                        <span className="font-medium">Decimal: </span>
                        <span className="font-mono">{results.decimal}</span>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => copyToClipboard(results.decimal, "Decimal")}
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
                      <div>
                        <span className="font-medium">Hexadecimal: </span>
                        <span className="font-mono">{results.hexadecimal}</span>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => copyToClipboard(results.hexadecimal, "Hexadecimal")}
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
                      <div>
                        <span className="font-medium">Octal: </span>
                        <span className="font-mono">{results.octal}</span>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => copyToClipboard(results.octal, "Octal")}
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </main>
      </div>
    </>
  );
};

export default BaseConverter;
