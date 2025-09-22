import type React from "react";
import { Link } from "react-router-dom";
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
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { Toaster } from "@/components/ui/sonner"
import { FaSearch, FaShoppingBag, FaSignInAlt } from "react-icons/fa";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "../components/ui/sidebar";
import AdminSidebar from "../components/admin/AdminSidebar";
import { Outlet } from "react-router-dom";
import { Separator } from "@/components/ui/separator";
const user = { _id: "7", role: "user" };

const UserLayout: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
        <div className="flex h-14 items-center justify-between px-4 w-full">
          <div className="flex items-center gap-2">Logo</div>

          <NavigationMenu className="flex-1 mx-4">
            <NavigationMenuList className="flex items-center justify-between w-full max-w-none">
              {/* Left section - Home */}
              <div className="flex items-center">
                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Link
                      to="/"
                      className="flex items-center gap-2 font-medium"
                    >
                      Home
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
                        {user.role === "admin" && (<DropdownMenuItem><Link to={"/admin/dashboard"}>Admin Dashboard</Link></DropdownMenuItem>)}
                        <DropdownMenuItem>Profile</DropdownMenuItem>
                        <DropdownMenuItem>Billing</DropdownMenuItem>
                        <DropdownMenuItem>Team</DropdownMenuItem>
                        <DropdownMenuItem>Subscription</DropdownMenuItem>
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
      <main className="flex-1 p-0">
        <Outlet />
        <Toaster />
      </main>
    </div>
  );
};

export default UserLayout;
