import { Link } from "react-router-dom";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar";

export function MainNav() {
  return (
    <Menubar className="rounded-none border-b border-none px-2 lg:px-4">
      <MenubarMenu>
        <MenubarTrigger>Home</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>
            <Link to="/" className="flex w-full">Dashboard</Link>
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>

      <MenubarMenu>
        <MenubarTrigger>Blog</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>
            <Link to="/blog" className="flex w-full">All Posts</Link>
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>

      <MenubarMenu>
        <MenubarTrigger>Products</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>
            <Link to="/products" className="flex w-full">All Products</Link>
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
}