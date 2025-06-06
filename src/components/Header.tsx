import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { BookOpen, Wrench, Menu, TrendingUp, ImagePlus, FileText, Shield } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetClose } from "@/components/ui/sheet";
const Header = () => {
  const isMobile = useIsMobile();
  return <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center justify-between">
        <Link to="/" className="mr-6 flex items-center space-x-2">
          <span className="font-bold">Lasitha Rajapaksha</span>
        </Link>
        
        {isMobile ? <Sheet>
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
                  <Link to="/trading-ideas" className="flex items-center py-2">
                    <TrendingUp className="mr-2 h-4 w-4" />
                    Trading Ideas
                  </Link>
                </SheetClose>
                <SheetClose asChild>
                  <Link to="/tools/text-behind-image" className="flex items-center py-2">
                    <ImagePlus className="mr-2 h-4 w-4" />
                    Text Behind Image
                  </Link>
                </SheetClose>
                <SheetClose asChild>
                  <Link to="/tools/metadata-remover" className="flex items-center py-2">
                    <Shield className="mr-2 h-4 w-4" />
                    Metadata Remover
                  </Link>
                </SheetClose>
              </div>
            </SheetContent>
          </Sheet> : <div className="flex space-x-4">
            <Link to="/blog">
              <Button variant="ghost" className="flex items-center">
                <BookOpen className="mr-2 h-4 w-4" />
                Blog
              </Button>
            </Link>
            <Link to="/trading-ideas">
              <Button variant="ghost" className="flex items-center">
                <TrendingUp className="mr-2 h-4 w-4" />
                Trading Ideas
              </Button>
            </Link>
            <Link to="/tools/text-behind-image">
              
            </Link>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center">
                  <Wrench className="mr-2 h-4 w-4" />
                  Tools
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 bg-popover/100 shadow-lg border-border">
                <DropdownMenuItem asChild>
                  <Link to="/tools/metadata-remover">Image Metadata Remover</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>}
      </div>
    </header>;
};
export default Header;