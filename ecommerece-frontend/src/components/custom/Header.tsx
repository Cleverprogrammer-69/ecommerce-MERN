"use client";

import * as React from "react";
import { Link } from "react-router-dom";
import { CircleCheckIcon, CircleHelpIcon, CircleIcon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { SidebarProvider, SidebarTrigger } from "../ui/sidebar";
import AdminSidebar from "../admin/AdminSidebar";
import { FaSearch, FaShoppingBag, FaSignInAlt } from "react-icons/fa";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const components: { title: string; href: string; description: string }[] = [
  {
    title: "Alert Dialog",
    href: "/docs/primitives/alert-dialog",
    description:
      "A modal dialog that interrupts the user with important content and expects a response.",
  },
  {
    title: "Hover Card",
    href: "/docs/primitives/hover-card",
    description:
      "For sighted users to preview content available behind a link.",
  },
  {
    title: "Progress",
    href: "/docs/primitives/progress",
    description:
      "Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.",
  },
  {
    title: "Scroll-area",
    href: "/docs/primitives/scroll-area",
    description: "Visually or semantically separates content.",
  },
  {
    title: "Tabs",
    href: "/docs/primitives/tabs",
    description:
      "A set of layered sections of content—known as tab panels—that are displayed one at a time.",
  },
  {
    title: "Tooltip",
    href: "/docs/primitives/tooltip",
    description:
      "A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.",
  },
];
const user = { _id: "7", role: "admin" };

export function NavigationHeader() {
  return (
   <header className="sticky top-0 z-50 w-full border-b bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
          <div className="flex h-14 items-center justify-between px-4 w-full">
            <div className="flex items-center gap-2">
              Logo
            </div>

            <NavigationMenu className="flex-1 mx-4">
              <NavigationMenuList className="flex items-center justify-between w-full max-w-none">
                {/* Left section - Home */}
                <div className="flex items-center">
                  <NavigationMenuItem>
                    <NavigationMenuLink asChild>
                      <Link to="/" className="flex items-center gap-2 font-medium">
                        Home
                      </Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                </div>

                {/* Center section - Navigation links (hidden on small screens) */}
                <div className="hidden md:flex items-center gap-6">
                  <NavigationMenuItem>
                    <NavigationMenuLink asChild>
                      <Link
                        to="/products"
                        className="flex items-center gap-2 font-medium hover:text-primary transition-colors"
                      >
                        Products
                      </Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>

                  <NavigationMenuItem>
                    <NavigationMenuLink asChild>
                      <Link
                        to="/about"
                        className="flex items-center gap-2 font-medium hover:text-primary transition-colors"
                      >
                        About
                      </Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>

                  <NavigationMenuItem>
                    <NavigationMenuLink asChild>
                      <Link
                        to="/contact"
                        className="flex items-center gap-2 font-medium hover:text-primary transition-colors"
                      >
                        Contact
                      </Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                </div>

                {/* Right section - Action items */}
                <div className="flex items-center gap-2 sm:gap-4">
                  <NavigationMenuItem>
                    <NavigationMenuLink asChild>
                      <Link
                        to="/search"
                        className="flex items-center justify-center w-8 h-8 rounded-md hover:bg-accent transition-colors"
                      >
                        <FaSearch className="w-4 h-4" />
                      </Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>

                  <NavigationMenuItem>
                    <NavigationMenuLink asChild>
                      <Link
                        to="/cart"
                        className="flex items-center justify-center w-8 h-8 rounded-md hover:bg-accent transition-colors"
                      >
                        <FaShoppingBag className="w-4 h-4" />
                      </Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>

                  <NavigationMenuItem>
                    {user?._id ? (
                      <DropdownMenu>
                        <DropdownMenuTrigger className="flex items-center justify-center w-8 h-8 rounded-full hover:bg-accent transition-colors">
                          <Avatar className="w-8 h-8">
                            <AvatarImage src="https://github.com/shadcn.png" />
                            <AvatarFallback>CN</AvatarFallback>
                          </Avatar>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>My Account</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem><Link to={"/orders"}>Orders</Link></DropdownMenuItem>
                          <DropdownMenuItem>Billing</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    ) : (
                      <NavigationMenuLink asChild>
                        <Link
                          to="/login"
                          className="flex items-center justify-center w-8 h-8 rounded-md hover:bg-accent transition-colors"
                        >
                          <FaSignInAlt className="w-4 h-4" />
                        </Link>
                      </NavigationMenuLink>
                    )}
                  </NavigationMenuItem>
                </div>
              </NavigationMenuList>
            </NavigationMenu>
          </div>
        </header>
  );
}
