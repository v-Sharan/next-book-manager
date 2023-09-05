"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Nav = () => {
  const path = usePathname();
  const { setTheme } = useTheme();
  return (
    <div className="flex justify-between items-center border-b-2 px-10 py-4">
      <h1 className="font-bold text-3xl">Book Order</h1>
      <ol className="flex gap-10 text-black dark:text-gray-400">
        <Link
          href={"/"}
          className={`${
            path === "/" && "dark:text-white font-bold"
          }  dark:hover:text-gray-50`}
        >
          <li>Customer page</li>
        </Link>
        <Link
          href={"/seller"}
          className={`${
            path === "/seller" && "dark:text-white font-bold"
          }  dark:hover:text-gray-50 `}
        >
          <li>Seller page</li>
        </Link>
      </ol>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="icon">
            <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => setTheme("light")}>
            Light
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setTheme("dark")}>
            Dark
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setTheme("system")}>
            System
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default Nav;
