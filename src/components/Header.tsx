import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { BookOpen, Wrench, Image, Menu, X, TrendingUp } from "lucide-react";
import { useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator, DropdownMenuSub, DropdownMenuSubTrigger, DropdownMenuSubContent } from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetClose } from "@/components/ui/sheet";

const Header = () => {
  const isMobile = useIsMobile();
  
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center justify-between">
        <Link to="/" className="mr-6 flex items-center space-x-2">
          <span className="font-bold">Lasitha Rajapaksha</span>
        </Link>
        
        {isMobile ? (
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[80%] sm:w-[350px]">
              <SheetHeader className="mb-4">
                <SheetTitle>Menu</SheetTitle>
              </SheetHeader>
              <div className="flex flex-col space-y-4">
                <SheetClose asChild>
                  <Link to="/blog" className="flex items-center py-2">
                    <BookOpen className="mr-2 h-4 w-4" />
                    Blog
                  </Link>
                </SheetClose>
                <SheetClose asChild>
                  <Link to="/edited-photos" className="flex items-center py-2">
                    <Image className="mr-2 h-4 w-4" />
                    Edited Photos
                  </Link>
                </SheetClose>
                <SheetClose asChild>
                  <Link to="/trading-ideas" className="flex items-center py-2">
                    <TrendingUp className="mr-2 h-4 w-4" />
                    Trading Ideas
                  </Link>
                </SheetClose>
              </div>
            </SheetContent>
          </Sheet>
        ) : (
          <div className="flex space-x-4">
            <Link to="/blog">
              <Button variant="ghost" className="flex items-center">
                <BookOpen className="mr-2 h-4 w-4" />
                Blog
              </Button>
            </Link>
            <Link to="/edited-photos">
              <Button variant="ghost" className="flex items-center">
                <Image className="mr-2 h-4 w-4" />
                Edited Photos
              </Button>
            </Link>
            <Link to="/trading-ideas">
              <Button variant="ghost" className="flex items-center">
                <TrendingUp className="mr-2 h-4 w-4" />
                Trading Ideas
              </Button>
            </Link>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center">
                  <Wrench className="mr-2 h-4 w-4" />
                  Tools
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 bg-popover/100 shadow-lg border-border">
                <DropdownMenuSub>
                  <DropdownMenuSubTrigger>Text Tools</DropdownMenuSubTrigger>
                  <DropdownMenuSubContent className="bg-popover/100">
                    <DropdownMenuItem asChild>
                      <Link to="/tools/case-converter">Case Converter</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/tools/word-counter">Word Counter</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/tools/lorem-ipsum">Lorem Ipsum Generator</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/tools/string-encoder">String Encoder/Decoder</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/tools/markdown-preview">Markdown Preview</Link>
                    </DropdownMenuItem>
                  </DropdownMenuSubContent>
                </DropdownMenuSub>

                <DropdownMenuSub>
                  <DropdownMenuSubTrigger>Developer Tools</DropdownMenuSubTrigger>
                  <DropdownMenuSubContent className="bg-popover/100">
                    <DropdownMenuItem asChild>
                      <Link to="/tools/json-formatter">JSON Formatter</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/tools/base64">Base64 Encoder/Decoder</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/tools/url-encoder">URL Encoder/Decoder</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/tools/html-entity">HTML Entity Encoder</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/tools/regex-tester">RegEx Tester</Link>
                    </DropdownMenuItem>
                  </DropdownMenuSubContent>
                </DropdownMenuSub>

                <DropdownMenuSub>
                  <DropdownMenuSubTrigger>Math & Numbers</DropdownMenuSubTrigger>
                  <DropdownMenuSubContent className="bg-popover/100">
                    <DropdownMenuItem asChild>
                      <Link to="/tools/unit-converter">Unit Converter</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/tools/calculator">Calculator</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/tools/base-converter">Number Base Converter</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/tools/percentage-calc">Percentage Calculator</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/tools/random-number">Random Number Generator</Link>
                    </DropdownMenuItem>
                  </DropdownMenuSubContent>
                </DropdownMenuSub>

                <DropdownMenuSeparator />

                <DropdownMenuSub>
                  <DropdownMenuSubTrigger>SEO Tools</DropdownMenuSubTrigger>
                  <DropdownMenuSubContent className="bg-popover/100">
                    <DropdownMenuItem asChild>
                      <Link to="/tools/backlink-checker">Backlink Checker</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/tools/seo-checker">SEO Checker</Link>
                    </DropdownMenuItem>
                  </DropdownMenuSubContent>
                </DropdownMenuSub>

                <DropdownMenuSub>
                  <DropdownMenuSubTrigger>Image Tools</DropdownMenuSubTrigger>
                  <DropdownMenuSubContent className="bg-popover/100">
                    <DropdownMenuItem asChild>
                      <Link to="/tools/image-converter">Image Converter</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/tools/image-compressor">Image Compressor</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/tools/image-cropper">Image Cropper</Link>
                    </DropdownMenuItem>
                  </DropdownMenuSubContent>
                </DropdownMenuSub>

                <DropdownMenuSub>
                  <DropdownMenuSubTrigger>Color Tools</DropdownMenuSubTrigger>
                  <DropdownMenuSubContent className="bg-popover/100">
                    <DropdownMenuItem asChild>
                      <Link to="/tools/color-converter">Color Converter</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/tools/color-palette">Color Palette Generator</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/tools/gradient-maker">Gradient Maker</Link>
                    </DropdownMenuItem>
                  </DropdownMenuSubContent>
                </DropdownMenuSub>

                <DropdownMenuSeparator />

                <DropdownMenuItem asChild>
                  <Link to="/tools/qr-generator">QR Code Generator</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/tools/password-generator">Password Generator</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
