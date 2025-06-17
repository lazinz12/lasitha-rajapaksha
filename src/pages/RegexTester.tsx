
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Copy, TestTube, Zap } from "lucide-react";
import { Helmet } from "react-helmet";
import Header from "@/components/Header";

const RegexTester = () => {
  const [pattern, setPattern] = useState("");
  const [testString, setTestString] = useState("");
  const [flags, setFlags] = useState("g");
  const [matches, setMatches] = useState<RegExpMatchArray[]>([]);
  const [isValid, setIsValid] = useState(true);
  const [error, setError] = useState("");
  const { toast } = useToast();

  const testRegex = () => {
    if (!pattern.trim()) {
      toast({
        title: "Error",
        description: "Please enter a regex pattern",
        variant: "destructive",
      });
      return;
    }

    if (!testString.trim()) {
      toast({
        title: "Error",
        description: "Please enter a test string",
        variant: "destructive",
      });
      return;
    }

    try {
      const regex = new RegExp(pattern, flags);
      const allMatches: RegExpMatchArray[] = [];
      
      if (flags.includes('g')) {
        let match;
        while ((match = regex.exec(testString)) !== null) {
          allMatches.push(match);
          if (match.index === regex.lastIndex) break;
        }
      } else {
        const match = testString.match(regex);
        if (match) allMatches.push(match);
      }

      setMatches(allMatches);
      setIsValid(true);
      setError("");
      
      toast({
        title: "Success",
        description: `Found ${allMatches.length} match(es)`,
      });
    } catch (err) {
      setIsValid(false);
      setError(err instanceof Error ? err.message : "Invalid regex pattern");
      setMatches([]);
      toast({
        title: "Invalid Regex",
        description: "Please check your regex pattern",
        variant: "destructive",
      });
    }
  };

  const copyMatches = async () => {
    if (matches.length === 0) {
      toast({
        title: "Error",
        description: "No matches to copy",
        variant: "destructive",
      });
      return;
    }

    try {
      const matchText = matches.map(match => match[0]).join('\n');
      await navigator.clipboard.writeText(matchText);
      toast({
        title: "Copied",
        description: "Matches copied to clipboard",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to copy matches",
        variant: "destructive",
      });
    }
  };

  const loadExample = (example: string) => {
    switch (example) {
      case "email":
        setPattern("[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}");
        setTestString("Contact us at support@example.com or admin@test.org for help");
        break;
      case "phone":
        setPattern("\\(?\\d{3}\\)?[-. ]?\\d{3}[-. ]?\\d{4}");
        setTestString("Call me at (555) 123-4567 or 555.987.6543");
        break;
      case "url":
        setPattern("https?:\\/\\/(www\\.)?[-a-zA-Z0-9@:%._\\+~#=]{1,256}\\.[a-zA-Z0-9()]{1,6}\\b([-a-zA-Z0-9()@:%_\\+.~#?&//=]*)");
        setTestString("Visit https://www.example.com or http://test.org for more info");
        break;
      case "date":
        setPattern("\\d{1,2}[/-]\\d{1,2}[/-]\\d{4}");
        setTestString("Important dates: 12/25/2023, 1/1/2024, and 07-04-2024");
        break;
      case "hex":
        setPattern("#[0-9A-Fa-f]{6}");
        setTestString("Colors: #FF0000 (red), #00FF00 (green), #0000FF (blue)");
        break;
    }
  };

  const highlightMatches = (text: string): JSX.Element => {
    if (!isValid || matches.length === 0) {
      return <span>{text}</span>;
    }

    const parts: JSX.Element[] = [];
    let lastIndex = 0;

    matches.forEach((match, index) => {
      if (match.index !== undefined) {
        // Add text before match
        if (match.index > lastIndex) {
          parts.push(
            <span key={`before-${index}`}>
              {text.slice(lastIndex, match.index)}
            </span>
          );
        }
        
        // Add highlighted match
        parts.push(
          <span
            key={`match-${index}`}
            className="bg-yellow-200 px-1 rounded font-semibold"
          >
            {match[0]}
          </span>
        );
        
        lastIndex = match.index + match[0].length;
      }
    });

    // Add remaining text
    if (lastIndex < text.length) {
      parts.push(
        <span key="after">
          {text.slice(lastIndex)}
        </span>
      );
    }

    return <>{parts}</>;
  };

  return (
    <>
      <Helmet>
        <title>RegEx Tester - Test Regular Expressions | Lasitha Rajapaksha</title>
        <meta name="description" content="Free online tool to test and debug regular expressions in real-time. See matches, capture groups, and validate patterns instantly." />
      </Helmet>
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-6 flex items-center gap-2">
            <TestTube className="h-8 w-8" />
            RegEx Tester
          </h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Pattern & Test String</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Regular Expression Pattern:</label>
                  <Input
                    value={pattern}
                    onChange={(e) => setPattern(e.target.value)}
                    placeholder="Enter regex pattern..."
                    className={`font-mono ${!isValid ? 'border-red-500' : ''}`}
                  />
                  {!isValid && error && (
                    <p className="text-red-500 text-sm mt-1">{error}</p>
                  )}
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Flags:</label>
                  <div className="flex gap-4 text-sm">
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={flags.includes('g')}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setFlags(prev => prev.includes('g') ? prev : prev + 'g');
                          } else {
                            setFlags(prev => prev.replace('g', ''));
                          }
                        }}
                      />
                      <span>g (global)</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={flags.includes('i')}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setFlags(prev => prev.includes('i') ? prev : prev + 'i');
                          } else {
                            setFlags(prev => prev.replace('i', ''));
                          }
                        }}
                      />
                      <span>i (ignore case)</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={flags.includes('m')}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setFlags(prev => prev.includes('m') ? prev : prev + 'm');
                          } else {
                            setFlags(prev => prev.replace('m', ''));
                          }
                        }}
                      />
                      <span>m (multiline)</span>
                    </label>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Test String:</label>
                  <Textarea
                    value={testString}
                    onChange={(e) => setTestString(e.target.value)}
                    placeholder="Enter text to test against..."
                    className="min-h-[120px]"
                  />
                </div>

                <Button onClick={testRegex} className="w-full">
                  <TestTube className="h-4 w-4 mr-2" />
                  Test Regex
                </Button>

                <div>
                  <label className="text-sm font-medium mb-2 block">Quick Examples:</label>
                  <div className="grid grid-cols-2 gap-2">
                    <Button onClick={() => loadExample('email')} variant="outline" size="sm">
                      Email
                    </Button>
                    <Button onClick={() => loadExample('phone')} variant="outline" size="sm">
                      Phone
                    </Button>
                    <Button onClick={() => loadExample('url')} variant="outline" size="sm">
                      URL
                    </Button>
                    <Button onClick={() => loadExample('date')} variant="outline" size="sm">
                      Date
                    </Button>
                    <Button onClick={() => loadExample('hex')} variant="outline" size="sm" className="col-span-2">
                      Hex Colors
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Results ({matches.length} match{matches.length !== 1 ? 'es' : ''})
                  {matches.length > 0 && (
                    <Button onClick={copyMatches} variant="outline" size="sm">
                      <Copy className="h-4 w-4" />
                    </Button>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Test String with Matches Highlighted:</label>
                  <div className="border rounded p-3 bg-gray-50 min-h-[120px] text-sm leading-relaxed">
                    {testString ? highlightMatches(testString) : (
                      <span className="text-gray-500">Test string will appear here with matches highlighted</span>
                    )}
                  </div>
                </div>

                {matches.length > 0 && (
                  <div>
                    <label className="text-sm font-medium mb-2 block">Match Details:</label>
                    <div className="space-y-2 max-h-60 overflow-y-auto">
                      {matches.map((match, index) => (
                        <div key={index} className="border rounded p-2 bg-white text-sm">
                          <div className="font-mono font-semibold">{match[0]}</div>
                          <div className="text-gray-600">
                            Index: {match.index}, Length: {match[0].length}
                          </div>
                          {match.length > 1 && (
                            <div className="text-gray-600">
                              Groups: {match.slice(1).map((group, i) => `$${i + 1}: "${group}"`).join(', ')}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>RegEx Quick Reference</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
                <div>
                  <h4 className="font-semibold mb-2">Character Classes:</h4>
                  <ul className="space-y-1 font-mono">
                    <li>. - Any character</li>
                    <li>\d - Digit (0-9)</li>
                    <li>\w - Word character</li>
                    <li>\s - Whitespace</li>
                    <li>[abc] - Character set</li>
                    <li>[^abc] - Negated set</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Quantifiers:</h4>
                  <ul className="space-y-1 font-mono">
                    <li>* - 0 or more</li>
                    <li>+ - 1 or more</li>
                    <li>? - 0 or 1</li>
                    <li>{`{n}`} - Exactly n</li>
                    <li>{`{n,m}`} - Between n and m</li>
                    <li>{`{n,}`} - n or more</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Anchors & Groups:</h4>
                  <ul className="space-y-1 font-mono">
                    <li>^ - Start of string</li>
                    <li>$ - End of string</li>
                    <li>() - Capturing group</li>
                    <li>(?:) - Non-capturing group</li>
                    <li>| - Alternation (OR)</li>
                    <li>\ - Escape character</li>
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

export default RegexTester;
