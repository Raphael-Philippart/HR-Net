"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "../../ui/navigation-menu";
import Logo from "../../uix/logo/Logo";

export const MainNav = () => (
  <div className='w-full flex align-middle shadow-bottom'>
    <NavigationMenu>
      <NavigationMenuList className='ml-1'>
        <NavigationMenuItem>
          <NavigationMenuLink asChild>
            <a className='flex h-full w-full align-middle justify-center ml-1' href='/'>
              <Logo
                pathLogo='./images/weath_health_square.png'
                altText='Logo Wealth Health'
                containerWidth={25}
                containerHeight={25}
              />
            </a>
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
      <NavigationMenuList className='ml-1'>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Menu</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className='grid gap-3 p-4 md:w-[200px] lg:w-[300px] lg:grid-cols-[.75fr_1fr] ml-2'>
              <li className='w-[100px]'>
                <NavigationMenuLink asChild>
                  <a
                    className='flex h-full w-full align-middle justify-center select-none flex-col rounded-md bg-gradient-to-b from-muted/50 to-muted p-2 no-underline outline-none hover:shadow-md focus:shadow-lg'
                    href='/'
                  >
                    <Logo
                      pathLogo='./images/weath_health_logo.png'
                      altText='Logo Wealth Health'
                      containerWidth={90}
                      containerHeight={90}
                    />
                  </a>
                </NavigationMenuLink>
              </li>
              <ListItem href='/employees' title='Employées'>
                Liste des Employées
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  </div>
);

const ListItem = React.forwardRef<React.ElementRef<"a">, React.ComponentPropsWithoutRef<"a">>(
  ({ className, title, children, ...props }, ref) => {
    return (
      <li>
        <NavigationMenuLink asChild>
          <a
            ref={ref}
            className={cn(
              "block select-none space-y-1 rounded-md p-2 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
              className,
            )}
            {...props}
          >
            <div className='text-sm font-medium leading-none'>{title}</div>
            <p className='line-clamp-2 text-sm leading-snug text-muted-foreground'>{children}</p>
          </a>
        </NavigationMenuLink>
      </li>
    );
  },
);
ListItem.displayName = "ListItem";

export default MainNav;
