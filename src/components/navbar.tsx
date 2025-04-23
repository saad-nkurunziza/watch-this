import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Search, Bell, ChevronDown } from "lucide-react";
import { SearchForm } from "@/components/search/search-form";
import { Suspense } from "react";

interface NavbarProps {
  isLoggedIn?: boolean;
}

export function Navbar({ isLoggedIn = false }: NavbarProps) {
  return (
    <header className="fixed w-full top-0 z-50 bg-gradient-to-b from-black/40 to-transparent backdrop-blur-lg">
      <div className="container mx-auto px-4 md:px-6 py-2 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center">
            <h1 className="text-xl font-semibold text-netflix-red">Viewdrop</h1>
          </Link>

          {isLoggedIn && (
            <nav className="hidden text-sm md:flex items-center space-x-6">
              <Link
                href="/"
                className=" hover:text-muted-foreground transition"
              >
                Home
              </Link>
              <Link
                href="/movies"
                className=" hover:text-muted-foreground transition"
              >
                Movies
              </Link>
              <Link
                href="/tv-shows"
                className=" hover:text-muted-foreground transition"
              >
                TV Shows
              </Link>
              <Link
                href="/new"
                className=" hover:text-muted-foreground transition"
              >
                New & Popular
              </Link>
              <Link
                href="/my-list"
                className=" hover:text-muted-foreground transition"
              >
                My List
              </Link>
            </nav>
          )}
        </div>

        <div className="flex items-center gap-4">
          {isLoggedIn ? (
            <>
              <Suspense fallback={<div>Loading...</div>}>
                <SearchForm />
              </Suspense>

              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                <span className="absolute top-0 right-0 w-2 h-2 bg-netflix-red rounded-full" />
              </Button>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="p-0 h-9">
                    <Avatar className="h-8 w-8 mr-2">
                      <AvatarImage src="/avatar.png" alt="User" />
                      <AvatarFallback>U</AvatarFallback>
                    </Avatar>
                    <ChevronDown className="h-4 w-4 text-muted-foreground" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuItem>
                    <Link href="/profile" className="w-full">
                      Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link href="/account" className="w-full">
                      Account
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link href="/settings" className="w-full">
                      Settings
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Link href="/sign-out" className="w-full">
                      Sign out
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <>
              <Link href="/sign-in">
                <Button variant="ghost" className="">
                  Sign In
                </Button>
              </Link>
              <Link href="/sign-up">
                <Button className="bg-netflix-red hover:bg-red-700">
                  Sign Up
                </Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
