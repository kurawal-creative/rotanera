"use client";

import { motion, useReducedMotion } from "motion/react";
import Link from "next/link";
import type React from "react";
import type { ComponentProps, ReactNode } from "react";
import { FacebookIcon, GithubIcon, InstagramIcon } from "lucide-react";
import { Button } from "./ui/button";

type FooterLink = {
  title: string;
  href: string;
  icon?: React.ComponentType<{ className?: string }>;
};

type FooterSection = {
  label: string;
  links: FooterLink[];
};

const footerLinks: FooterSection[] = [
  {
    label: "Product",
    links: [
      { title: "Features", href: "#" },
      { title: "Pricing", href: "#" },
      { title: "Testimonials", href: "#" },
      { title: "Integration", href: "#" },
    ],
  },
  {
    label: "Company",
    links: [
      { title: "FAQs", href: "#" },
      { title: "About Us", href: "#" },
      { title: "Privacy Policy", href: "#" },
      { title: "Terms of Services", href: "#" },
    ],
  },
  {
    label: "Resources",
    links: [
      { title: "Blog", href: "#" },
      { title: "Changelog", href: "#" },
      { title: "Brand", href: "#" },
      { title: "Help", href: "#" },
    ],
  },
];

const socialLinks = [
  {
    icon: FacebookIcon,
    link: "#",
  },
  {
    icon: GithubIcon,
    link: "#",
  },
  {
    icon: InstagramIcon,
    link: "#",
  },
];

export function Footer() {
  return (
    <footer className="md:rounded-t-6xl relative mx-auto flex w-full flex-col items-center justify-center rounded-t-4xl border-t bg-[radial-gradient(35%_128px_at_50%_0%,theme(backgroundColor.white/8%),transparent)] px-4 py-6 md:px-6">
      <div className="bg-foreground/20 absolute top-0 right-1/2 left-1/2 h-px w-1/3 -translate-x-1/2 -translate-y-1/2 rounded-full blur" />

      <div className="grid w-full max-w-7xl gap-8 xl:grid-cols-3 xl:gap-8">
        <AnimatedContainer className="space-y-4">
          <Link href="/" className="text-purp pb-1.5 text-3xl font-normal">
            rotanera
          </Link>
          <div className="mt-4 flex gap-2">
            {socialLinks.map((item, index) => (
              <Button
                key={`social-${item.link}-${index}`}
                size="icon-sm"
                variant="outline"
              >
                <a href={item.link} target="_blank">
                  <item.icon className="size-3.5" />
                </a>
              </Button>
            ))}
          </div>
        </AnimatedContainer>

        <div className="mt-10 grid grid-cols-2 gap-8 md:grid-cols-3 xl:col-span-2 xl:mt-0">
          {footerLinks.map((section, index) => (
            <AnimatedContainer delay={0.1 + index * 0.1} key={section.label}>
              <div className="mb-10 md:mb-0">
                <h3 className="text-sm font-medium">{section.label}</h3>
                <ul className="text-muted-foreground mt-4 space-y-2 text-sm">
                  {section.links.map((link) => (
                    <li key={link.title}>
                      <a
                        className="hover:text-foreground inline-flex items-center transition-all duration-300"
                        href={link.href}
                        key={`${section.label}-${link.title}`}
                      >
                        {link.icon && <link.icon className="me-1 size-4" />}
                        {link.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </AnimatedContainer>
          ))}
        </div>
      </div>
    </footer>
  );
}

type ViewAnimationProps = {
  delay?: number;
  className?: ComponentProps<typeof motion.div>["className"];
  children: ReactNode;
};

function AnimatedContainer({
  className,
  delay = 0.1,
  children,
}: ViewAnimationProps) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return children;
  }

  return (
    <motion.div
      className={className}
      initial={{ filter: "blur(4px)", translateY: -8, opacity: 0 }}
      transition={{ delay, duration: 0.8 }}
      viewport={{ once: true }}
      whileInView={{ filter: "blur(0px)", translateY: 0, opacity: 1 }}
    >
      {children}
    </motion.div>
  );
}
