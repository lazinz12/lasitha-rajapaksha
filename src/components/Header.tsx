
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

// Tool categories and items for reuse in both mobile and desktop views
const toolCategories = [
  {
    name: "Text Tools",
    items: [
      { name: "Case Converter", path: "/tools/case-converter" },
      { name: "Word Counter", path: "/tools/word-counter" },
      { name: "Lorem Ipsum", path: "/tools/lorem-ipsum" },
      { name: "String Encoder", path: "/tools/string-encoder" },
      { name: "Markdown Preview", path: "/tools/markdown-preview" },
    ],
  },
  {
    name: "Developer Tools",
    items: [
      { name: "JSON Formatter", path: "/tools/json-formatter" },
      { name: "Base64", path: "/tools/base64" },
      { name: "URL Encoder", path: "/tools/url-encoder" },
      { name: "HTML Entity", path: "/tools/html-entity" },
      { name: "RegEx Tester", path: "/tools/regex-tester" },
    ],
  },
  {
    name: "Math & Numbers",
    items: [
      { name: "Unit Converter", path: "/tools/unit-converter" },
      { name: "Calculator", path: "/tools/calculator" },
      { name: "Number Base", path: "/tools/base-converter" },
      { name: "Percentage Calc", path: "/tools/percentage-calc" },
      { name: "Random Number", path: "/tools/random-number" },
    ],
  },
  {
    name: "Image Tools",
    items: [
      { name: "Image Converter", path: "/tools/image-converter" },
      { name: "Image Compressor", path: "/tools/image-compressor" },
      { name: "Image Cropper", path: "/tools/image-cropper" },
    ],
  },
  {
    name: "Color Tools",
    items: [
      { name: "Color Converter", path: "/tools/color-converter" },
      { name: "Color Palette", path: "/tools/color-palette" },
      { name: "Gradient Maker", path: "/tools/gradient-maker" },
    ],
  },
  {
    name: "Other Tools",
    items: [
      { name: "QR Generator", path: "/tools/qr-generator" },
      { name: "Password Generator", path: "/tools/password-generator" },
      { name: "Backlink Checker", path: "/tools/backlink-checker" },
      { name: "SEO Checker", path: "/tools/seo-checker" },
    ],
  },
];

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
                
                {/* Mobile Tool Categories - Organized Menu */}
                {toolCategories.map((category) => (
                  <div key={category.name} className="pt-2 pb-4">
                    <div className="text-sm font-medium mb-2">{category.name}</div>
                    <div className="grid grid-cols-2 gap-2">
                      {category.items.map((item) => (
                        <SheetClose key={item.path} asChild>
                          <Link to={item.path} className="text-sm py-1">{item.name}</Link>
                        </SheetClose>
                      ))}
                    </div>
                  </div>
                ))}
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
                {/* Desktop Tool Categories - Dropdown Menu */}
                {toolCategories.map((category, index) => (
                  <React.Fragment key={category.name}>
                    <DropdownMenuSub>
                      <DropdownMenuSubTrigger>{category.name}</DropdownMenuSubTrigger>
                      <DropdownMenuSubContent className="bg-popover/100">
                        {category.items.map((item) => (
                          <DropdownMenuItem key={item.path} asChild>
                            <Link to={item.path}>{item.name}</Link>
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuSubContent>
                    </DropdownMenuSub>
                    {index < toolCategories.length - 1 && <DropdownMenuSeparator />}
                  </React.Fragment>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )}
      </div>
    </header>
  )
}

export default Header
