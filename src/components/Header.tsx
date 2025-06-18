
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { BookOpen, Wrench, Menu, TrendingUp, User, Camera } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetClose } from "@/components/ui/sheet";
import { GlitchTransmission } from "@/components/animations/GlitchTransmission";
import { NeonTransmission } from "@/components/animations/NeonTransmission";
import { motion } from "framer-motion";

const Header = () => {
  const isMobile = useIsMobile();
  
  return (
    <motion.header 
      className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      style={{
        backdropFilter: 'blur(20px) saturate(180%)',
        borderImage: 'linear-gradient(90deg, transparent, rgba(0,255,255,0.3), transparent) 1',
      }}
    >
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="mr-6 flex items-center space-x-2">
          <GlitchTransmission intensity="low">
            <NeonTransmission color="cyan">
              <motion.span 
                className="font-bold text-xl bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                Lasitha Rajapaksha
              </motion.span>
            </NeonTransmission>
          </GlitchTransmission>
        </Link>
        
        {isMobile ? (
          <Sheet>
            <SheetTrigger asChild>
              <NeonTransmission color="purple">
                <Button variant="ghost" size="icon" className="hover:bg-purple-500/20">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </NeonTransmission>
            </SheetTrigger>
            <SheetContent 
              side="right" 
              className="w-[80%] sm:w-[350px] bg-background/95 backdrop-blur-xl border-l border-cyan-500/30"
            >
              <SheetHeader className="mb-4">
                <SheetTitle className="text-cyan-400">Menu</SheetTitle>
              </SheetHeader>
              <div className="flex flex-col space-y-4">
                {[
                  { to: "/founder", icon: User, text: "Founder & CEO" },
                  { to: "/blog", icon: BookOpen, text: "Blog" },
                  { to: "/trading-ideas", icon: TrendingUp, text: "Trading Ideas" },
                  { to: "/photo-gallery", icon: Camera, text: "Photo Gallery" },
                  { to: "/tools", icon: Wrench, text: "Tools" },
                ].map((item, index) => (
                  <motion.div
                    key={item.to}
                    initial={{ x: 50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: index * 0.1, duration: 0.4 }}
                  >
                    <SheetClose asChild>
                      <GlitchTransmission intensity="low">
                        <Link to={item.to} className="flex items-center py-3 px-2 rounded-lg hover:bg-cyan-500/10 transition-colors">
                          <item.icon className="mr-3 h-5 w-5 text-cyan-400" />
                          <span className="text-foreground">{item.text}</span>
                        </Link>
                      </GlitchTransmission>
                    </SheetClose>
                  </motion.div>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        ) : (
          <motion.div 
            className="flex space-x-2"
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {[
              { to: "/founder", icon: User, text: "Founder & CEO", color: "cyan" as const },
              { to: "/blog", icon: BookOpen, text: "Blog", color: "purple" as const },
              { to: "/trading-ideas", icon: TrendingUp, text: "Trading Ideas", color: "green" as const },
              { to: "/photo-gallery", icon: Camera, text: "Photo Gallery", color: "pink" as const },
            ].map((item) => (
              <Link key={item.to} to={item.to}>
                <NeonTransmission color={item.color}>
                  <Button variant="ghost" className="flex items-center hover:bg-cyan-500/10 transition-all duration-300">
                    <item.icon className="mr-2 h-4 w-4" />
                    {item.text}
                  </Button>
                </NeonTransmission>
              </Link>
            ))}
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <NeonTransmission color="cyan">
                  <Button variant="ghost" className="flex items-center hover:bg-cyan-500/10">
                    <Wrench className="mr-2 h-4 w-4" />
                    Tools
                  </Button>
                </NeonTransmission>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 bg-background/95 backdrop-blur-xl border border-cyan-500/30 shadow-2xl shadow-cyan-500/20">
                {[
                  { to: "/tools", text: "All Tools" },
                  { to: "/tools/metadata-remover", text: "Image Metadata Remover" },
                  { to: "/tools/case-converter", text: "Case Converter" },
                  { to: "/tools/seo-checker", text: "SEO Checker" },
                  { to: "/tools/backlink-checker", text: "Backlink Checker" },
                ].map((item) => (
                  <DropdownMenuItem key={item.to} asChild>
                    <GlitchTransmission intensity="low">
                      <Link to={item.to} className="hover:bg-cyan-500/10 transition-colors">
                        {item.text}
                      </Link>
                    </GlitchTransmission>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </motion.div>
        )}
      </div>
    </motion.header>
  );
};

export default Header;
