"use client";

import React from "react";
import clsx from "clsx";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { SidebarTrigger } from "@/components/ui/sidebar";
import SearchBar from "./search-project";

interface Crumb {
  label: string;
  href?: string;
}

interface TopbarProps {
  className?: string;
  breadcrumb?: Crumb[];
  title?: string;
}

export function Topbar({
  className = "",
  breadcrumb = [],
  title,
}: TopbarProps) {
  const lastIndex = breadcrumb.length - 1;

  return (
    <header
      className={clsx(
        "sticky top-0 z-5 w-full border-b bg-white/80 px-2 py-3 backdrop-blur",
        "flex items-center justify-between",
        className,
      )}
    >
      <div className="flex min-w-0 items-center gap-2">
        <SidebarTrigger />

        <div className="ml-2 min-w-0">
          {/* Optional title (ke kiri breadcrumb) */}
          {title && (
            <div className="text-sm font-semibold text-neutral-800">
              {title}
            </div>
          )}

          {/* Breadcrumb (only render if has items) */}
          {breadcrumb.length > 0 && (
            <nav aria-label="Breadcrumb">
              <Breadcrumb>
                <BreadcrumbList className="flex items-center">
                  {breadcrumb.map((item, idx) => (
                    <React.Fragment key={idx}>
                      <BreadcrumbItem>
                        {idx === lastIndex ? (
                          <BreadcrumbPage
                            aria-current="page"
                            className="text-sm text-neutral-700"
                          >
                            {item.label}
                          </BreadcrumbPage>
                        ) : (
                          <BreadcrumbLink
                            href={item.href || "#"}
                            className="text-sm text-neutral-500 transition-colors hover:text-neutral-700"
                          >
                            {item.label}
                          </BreadcrumbLink>
                        )}
                      </BreadcrumbItem>

                      {idx !== lastIndex && (
                        <BreadcrumbSeparator
                          aria-hidden
                          className="text-neutral-400"
                        />
                      )}
                    </React.Fragment>
                  ))}
                </BreadcrumbList>
              </Breadcrumb>
            </nav>
          )}
        </div>
      </div>

      {/* Right area for controls (search, avatar, actions) */}
      <div className="flex items-center gap-2">
        <SearchBar />
      </div>
      <div className="pointer-events-none absolute inset-x-0 top-15 -z-10 h-24 bg-linear-to-b from-[#6D28D9]/5 via-[#6D28D9]/0 to-transparent" />
    </header>
  );
}
