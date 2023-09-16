"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { mainSiteRoutes } from "@/config/routes";
import { cn } from "@/lib/utils";
import { DetailedHTMLProps, HTMLAttributes } from "react";

interface MainNavProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> {}

const MainNav: React.FC<MainNavProps> = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) => {
  const pathname = usePathname();

  const navRoutes = mainSiteRoutes.filter((route) => Boolean(route.path));
  const routes = navRoutes.map((route) => ({
    href: route.path,
    label: route.title,
    active: pathname === route.path,
    soon: route.soon,
  }));

  return (
    <nav
      className={cn("flex items-center space-x-1 lg:space-x-2", className)}
      {...props}
    >
      {routes.map((route) => {
        if (!route.href) {
          return null;
        }

        return (
          <Link
            key={route.href}
            href={route.href}
            className={`text-sm h-[30px] flex items-center justify-center rounded-full px-[12px]   font-medium transition-colors hover:text-primary ${
              route.active
                ? "bg-[hsla(0,0%,100%,.09)]"
                : "text-muted-foreground"
            }`}
          >
            {route.label}
          </Link>
        );
      })}
    </nav>
  );
};

export default MainNav;
