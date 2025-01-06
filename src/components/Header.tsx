import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { BookOpen, ShoppingCart, Wrench } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <Link to="/" className="mr-6 flex items-center space-x-2">
          <span className="font-bold">Lasitha Rajapaksha</span>
        </Link>
        <div className="flex space-x-4">
          <Link to="/blog">
            <Button variant="ghost" className="flex items-center">
              <BookOpen className="mr-2 h-4 w-4" />
              Blog
            </Button>
          </Link>
          <Link to="/products">
            <Button variant="ghost" className="flex items-center">
              <ShoppingCart className="mr-2 h-4 w-4" />
              Products
            </Button>
          </Link>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center">
                <Wrench className="mr-2 h-4 w-4" />
                Tools
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem asChild>
                <Link to="/tools/case-converter">Case Converter</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/tools/backlink-checker">Backlink Checker</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}

export default Header