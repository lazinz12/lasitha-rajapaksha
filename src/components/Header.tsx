
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { BookOpen, Wrench, Image, Menu, X } from "lucide-react"
import { useState } from "react"
import { useIsMobile } from "@/hooks/use-mobile"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
} from "@/components/ui/dropdown-menu"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet"

const Header = () => {
  const isMobile = useIsMobile()

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
                
                <div className="pt-2 pb-4">
                  <div className="text-sm font-medium mb-2">Text Tools</div>
                  <div className="grid grid-cols-2 gap-2">
                    <SheetClose asChild>
                      <Link to="/tools/case-converter" className="text-sm py-1">Case Converter</Link>
                    </SheetClose>
                    <SheetClose asChild>
                      <Link to="/tools/word-counter" className="text-sm py-1">Word Counter</Link>
                    </SheetClose>
                    <SheetClose asChild>
                      <Link to="/tools/lorem-ipsum" className="text-sm py-1">Lorem Ipsum</Link>
                    </SheetClose>
                    <SheetClose asChild>
                      <Link to="/tools/string-encoder" className="text-sm py-1">String Encoder</Link>
                    </SheetClose>
                    <SheetClose asChild>
                      <Link to="/tools/markdown-preview" className="text-sm py-1">Markdown Preview</Link>
                    </SheetClose>
                  </div>
                </div>
                
                <div className="pt-2 pb-4">
                  <div className="text-sm font-medium mb-2">Developer Tools</div>
                  <div className="grid grid-cols-2 gap-2">
                    <SheetClose asChild>
                      <Link to="/tools/json-formatter" className="text-sm py-1">JSON Formatter</Link>
                    </SheetClose>
                    <SheetClose asChild>
                      <Link to="/tools/base64" className="text-sm py-1">Base64</Link>
                    </SheetClose>
                    <SheetClose asChild>
                      <Link to="/tools/url-encoder" className="text-sm py-1">URL Encoder</Link>
                    </SheetClose>
                    <SheetClose asChild>
                      <Link to="/tools/html-entity" className="text-sm py-1">HTML Entity</Link>
                    </SheetClose>
                    <SheetClose asChild>
                      <Link to="/tools/regex-tester" className="text-sm py-1">RegEx Tester</Link>
                    </SheetClose>
                  </div>
                </div>
                
                <div className="pt-2 pb-4">
                  <div className="text-sm font-medium mb-2">Math & Numbers</div>
                  <div className="grid grid-cols-2 gap-2">
                    <SheetClose asChild>
                      <Link to="/tools/unit-converter" className="text-sm py-1">Unit Converter</Link>
                    </SheetClose>
                    <SheetClose asChild>
                      <Link to="/tools/calculator" className="text-sm py-1">Calculator</Link>
                    </SheetClose>
                    <SheetClose asChild>
                      <Link to="/tools/base-converter" className="text-sm py-1">Number Base</Link>
                    </SheetClose>
                    <SheetClose asChild>
                      <Link to="/tools/percentage-calc" className="text-sm py-1">Percentage Calc</Link>
                    </SheetClose>
                    <SheetClose asChild>
                      <Link to="/tools/random-number" className="text-sm py-1">Random Number</Link>
                    </SheetClose>
                  </div>
                </div>
                
                <div className="pt-2 pb-4">
                  <div className="text-sm font-medium mb-2">Other Tools</div>
                  <div className="grid grid-cols-2 gap-2">
                    <SheetClose asChild>
                      <Link to="/tools/qr-generator" className="text-sm py-1">QR Generator</Link>
                    </SheetClose>
                    <SheetClose asChild>
                      <Link to="/tools/password-generator" className="text-sm py-1">Password Generator</Link>
                    </SheetClose>
                    <SheetClose asChild>
                      <Link to="/tools/backlink-checker" className="text-sm py-1">Backlink Checker</Link>
                    </SheetClose>
                    <SheetClose asChild>
                      <Link to="/tools/seo-checker" className="text-sm py-1">SEO Checker</Link>
                    </SheetClose>
                  </div>
                </div>
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
  )
}

export default Header
