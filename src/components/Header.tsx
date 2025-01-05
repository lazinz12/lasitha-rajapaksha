import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { ShoppingCart } from "lucide-react"

const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <Link to="/" className="mr-6 flex items-center space-x-2">
          <span className="font-bold">Lasitha Rajapaksha</span>
        </Link>
        <div className="flex space-x-4">
          <Link to="/products">
            <Button variant="ghost" className="flex items-center">
              <ShoppingCart className="mr-2 h-4 w-4" />
              Products
            </Button>
          </Link>
        </div>
      </div>
    </header>
  )
}

export default Header