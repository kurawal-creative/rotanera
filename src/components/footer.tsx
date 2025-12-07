import { motion, useReducedMotion } from "motion/react";
import Link from "next/link";
import type React from "react";
import type { ComponentProps, ReactNode } from "react";
import { GithubIcon, InstagramIcon } from "lucide-react";
import { Button } from "./ui/button";

import logoText from "@/assets/image/logo.png";
import Image from "next/image";

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
        label: "Menu Utama",
        links: [
            { title: "Tentang Kami", href: "/tentang-kami" },
            { title: "Harga", href: "harga" },
        ],
    },
];

const socialLinks = [
    {
        icon: GithubIcon,
        link: "https://github.com/kurawal-creative/rotanera",
    },
    {
        icon: InstagramIcon,
        link: "https://www.instagram.com/kurawal.creative/",
    },
];

export function Footer() {
    return (
        <footer className="md:rounded-t-6xl relative mx-auto flex w-full flex-col items-center justify-center rounded-t-4xl border-t bg-[radial-gradient(35%_128px_at_50%_0%,theme(backgroundColor.white/8%),transparent)] px-4 py-8 md:px-6">
            <div className="bg-foreground/20 absolute top-0 right-1/2 left-1/2 h-px w-1/3 -translate-x-1/2 -translate-y-1/2 rounded-full blur" />

            {/* TOP PART */}
            <div className="flex w-full max-w-7xl flex-col gap-8 md:flex-row md:items-start md:justify-between">
                {/* Logo + Social */}
                <AnimatedContainer className="flex flex-col items-center gap-4 md:items-start">
                    <Link href="/">
                        <Image src={logoText} alt="logo rotanera" className="h-auto w-24 md:w-32" priority draggable="false" />
                    </Link>

                    <div className="flex gap-2">
                        {socialLinks.map((item, index) => (
                            <Button key={`social-${item.link}-${index}`} size="icon-sm" variant="outline">
                                <a href={item.link} target="_blank">
                                    <item.icon className="size-3.5" />
                                </a>
                            </Button>
                        ))}
                    </div>
                </AnimatedContainer>

                {/* Menu link */}
                <div className="grid grid-cols-1 gap-6 md:gap-10">
                    {footerLinks.map((section, index) => (
                        <AnimatedContainer delay={0.1 + index * 0.1} key={section.label}>
                            <div>
                                <h3 className="text-sm font-medium">{section.label}</h3>
                                <ul className="text-muted-foreground mt-3 space-y-2 text-sm">
                                    {section.links.map((link) => (
                                        <li key={link.title}>
                                            <a className="hover:text-foreground inline-flex items-center transition-all duration-300" href={link.href}>
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

            {/* COPYRIGHT */}
            <div className="mt-8 w-full border-t pt-4">
                <p className="text-center text-xs text-neutral-500">© {new Date().getFullYear()} Rotanera — All rights reserved.</p>
            </div>
        </footer>
    );
}

type ViewAnimationProps = {
    delay?: number;
    className?: ComponentProps<typeof motion.div>["className"];
    children: ReactNode;
};

function AnimatedContainer({ className, delay = 0.1, children }: ViewAnimationProps) {
    const shouldReduceMotion = useReducedMotion();

    if (shouldReduceMotion) {
        return children;
    }

    return (
        <motion.div className={className} initial={{ filter: "blur(4px)", translateY: -8, opacity: 0 }} transition={{ delay, duration: 0.8 }} viewport={{ once: true }} whileInView={{ filter: "blur(0px)", translateY: 0, opacity: 1 }}>
            {children}
        </motion.div>
    );
}
