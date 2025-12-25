/* eslint-disable @next/next/no-img-element */
"use client";
import * as React from "react";
import { ReactNode, useState, useEffect } from "react";
import Link from "next/link";
import {
  Box,
  Layers,
  Ruler,
  Wrench,
  BookOpen,
  Users,
  HelpCircle,
  Building2,
  Menu,
} from "lucide-react";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

const CADHeader = () => {
  return (
    <header className="sticky top-0 h-16 flex justify-center w-full bg-gradient-to-r from-gray-900 via-blue-950 to-gray-900 backdrop-blur-xl border-b border-white/10 z-50 shadow-lg">
      <div className="w-full max-w-7xl flex justify-center gap-6">
        <div className="flex w-full items-center justify-between px-4 sm:px-6">
          <Link
            href="/"
            aria-label="home"
            className="flex gap-2 items-center group"
          >
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg shadow-blue-500/30 group-hover:shadow-blue-500/50 transition-all">
              <Box className="w-6 h-6 text-white" />
            </div>
            <span className="font-bold text-xl text-white hidden sm:block">
              Next-Gen CAD
            </span>
          </Link>

          <DesktopMenus />
          
          <Sheet>
            <div className="flex items-center gap-3">
              <Link href="/workspace" className="hidden sm:block">
                <Button 
                  className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white font-semibold shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 transition-all"
                >
                  Launch CAD
                </Button>
              </Link>
              <SheetTrigger asChild>
                {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions */}
                <button className="p-2 text-white hover:bg-white/10 rounded-lg lg:hidden transition-colors border border-white/20" title="Menu" aria-label="Toggle navigation menu">
                  <Menu className="h-5 w-5" />
                </button>
              </SheetTrigger>
            </div>
            <SheetContent
              side="right"
              className="w-[300px] bg-gray-900/98 backdrop-blur-xl border-white/10 p-0"
            >
              <MobileMenu />
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

interface ChildrenProps {
  children: ReactNode;
}

const NavigationMenu: React.FC<ChildrenProps> = ({ children }) => (
  <nav className="relative z-50 flex items-center justify-center">
    {children}
  </nav>
);

const NavigationMenuList: React.FC<ChildrenProps> = ({ children }) => (
  <ul className="flex items-center justify-center space-x-1 list-none">
    {children}
  </ul>
);

interface NavigationMenuItemProps extends ChildrenProps {
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

const NavigationMenuItem: React.FC<NavigationMenuItemProps> = ({
  children,
  onMouseEnter,
  onMouseLeave,
}) => (
  <li onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
    {children}
  </li>
);

interface NavigationMenuTriggerProps extends ChildrenProps {
  isActive?: boolean;
}

const NavigationMenuTrigger: React.FC<NavigationMenuTriggerProps> = ({
  children,
  isActive = false,
}) => (
  <button
    className={`inline-flex h-10 items-center justify-center px-4 py-2 text-sm font-medium transition-colors focus:outline-none rounded-lg ${
      isActive 
        ? "text-white bg-white/10" 
        : "text-gray-300 hover:text-white hover:bg-white/5"
    }`}
  >
    {children}
  </button>
);

interface NavigationMenuContentProps extends ChildrenProps {
  isOpen?: boolean;
}

const NavigationMenuContent: React.FC<NavigationMenuContentProps> = ({
  children,
  isOpen = false,
}) => {
  const [visible, setVisible] = useState(isOpen);
  useEffect(() => {
    if (isOpen) {
      setVisible(true);
    } else {
      const timeout = setTimeout(() => setVisible(false), 400);
      return () => clearTimeout(timeout);
    }
  }, [isOpen]);
  
  if (!visible) return null;
  
  return (
    <div
      className={`fixed left-0 right-0 top-16 z-40 w-screen bg-gray-900/98 backdrop-blur-xl border-b border-white/10
        transform transition-all duration-300 ease-out
        ${isOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4 pointer-events-none"}
      `}
    >
      <div className="w-full max-w-7xl mx-auto px-8 py-12">{children}</div>
    </div>
  );
};

const MobileMenu = () => {
  const mainNav = [
    { title: "Workspace", href: "/workspace", icon: Box },
    { title: "About", href: "/about", icon: Building2 },
    { title: "Testimonials", href: "/testimonials", icon: Users },
    { title: "Contact", href: "/contact", icon: HelpCircle },
  ];
  
  return (
    <nav className="flex flex-col py-6">
      <div className="px-6 pb-4 border-b border-white/10">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
            <Box className="w-5 h-5 text-white" />
          </div>
          <span className="font-bold text-lg text-white">Next-Gen CAD</span>
        </Link>
      </div>
      
      <div className="py-4 space-y-1 px-4">
        {mainNav.map((item) => {
          const Icon = item.icon;
          return (
            <Link key={item.title} href={item.href}>
              <div className="flex items-center gap-3 px-4 py-3 text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-all group">
                <Icon className="w-5 h-5 opacity-60 group-hover:opacity-100" />
                <span className="font-medium">{item.title}</span>
              </div>
            </Link>
          );
        })}
      </div>
      
      <div className="px-6 pt-4 border-t border-white/10 space-y-3">
        <Link href="/login" className="block">
          <Button 
            variant="outline" 
            className="w-full text-white border-white/30 hover:bg-white/10"
          >
            Login
          </Button>
        </Link>
        <Link href="/workspace" className="block">
          <Button 
            className="w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white font-semibold"
          >
            Launch CAD
          </Button>
        </Link>
      </div>
    </nav>
  );
};

export function DesktopMenus() {
  type MenuName = "features" | "tools" | "learning" | "resources" | null;
  const [activeMenu, setActiveMenu] = useState<MenuName>(null);
  const handleMouseEnter = (menuName: MenuName) => setActiveMenu(menuName);
  const handleMouseLeave = () => setActiveMenu(null);
  
  return (
    <div className="hidden lg:block">
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <Link href="/about">
              <NavigationMenuTrigger>About</NavigationMenuTrigger>
            </Link>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <Link href="/testimonials">
              <NavigationMenuTrigger>Testimonials</NavigationMenuTrigger>
            </Link>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <Link href="/contact">
              <NavigationMenuTrigger>Contact</NavigationMenuTrigger>
            </Link>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
}

export { CADHeader };
