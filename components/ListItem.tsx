"use client";

import * as React from "react";
import Link from "next/link";

import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { SheetClose } from "./ui/sheet";

const components: { title: string; href: string; description: string }[] = [
  {
    title: "All Books Data",
    href: "/seller",
    description: "All Data with Available and sold Details",
  },
  {
    title: "Sold Books Data",
    href: "/seller/sold",
    description: "Details about Sold Books",
  },
];

export function NavigationMenuDemo({ open }: { open: boolean }) {
  const path = usePathname();

  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger
            className={`${
              path.startsWith("/seller") && "dark:text-white font-bold text-xl"
            }  dark:hover:text-gray-50 `}
          >
            Seller Page
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            {!open ? (
              <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] max-sm:w-[250px] md:grid-cols-2 lg:w-[600px] ">
                {components.map((component) => (
                  <ListItem
                    key={component.title}
                    title={component.title}
                    href={component.href}
                  >
                    {component.description}
                  </ListItem>
                ))}
              </ul>
            ) : (
              <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] max-sm:w-[250px] md:grid-cols-2 lg:w-[600px] ">
                {components.map((component) => (
                  <ListItem
                    key={component.title}
                    title={component.title}
                    href={component.href}
                  >
                    <SheetClose>{component.description}</SheetClose>
                  </ListItem>
                ))}
              </ul>
            )}
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, href, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <Link
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
          href={href!}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
