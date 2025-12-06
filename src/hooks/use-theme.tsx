"use client";

import { useEffect, useState } from "react";
import { flushSync } from "react-dom";

type Theme = "light" | "dark";

export function useTheme() {
    const [mounted, setMounted] = useState(false);
    const [theme, setTheme] = useState<Theme>(() => {
        // Initialize from localStorage if available (client-side only)
        if (typeof window !== "undefined") {
            const savedTheme = localStorage.getItem("darkMode");
            const isDark = savedTheme === "true";
            return isDark ? "dark" : "light";
        }
        return "light";
    });

    // Mark as mounted using flushSync to avoid cascading render warning
    useEffect(() => {
        flushSync(() => {
            setMounted(true);
        });
    }, []);

    // Apply theme class to document
    useEffect(() => {
        if (theme === "dark") {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
    }, [theme]);

    // Toggle theme function
    const toggleTheme = () => {
        const newTheme = theme === "dark" ? "light" : "dark";
        setTheme(newTheme);
        localStorage.setItem("darkMode", (newTheme === "dark").toString());

        if (newTheme === "dark") {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
    };

    // Set theme directly
    const setThemeMode = (mode: Theme) => {
        setTheme(mode);
        localStorage.setItem("darkMode", (mode === "dark").toString());

        if (mode === "dark") {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
    };

    return {
        theme,
        isDark: theme === "dark",
        toggleTheme,
        setTheme: setThemeMode,
        mounted, // Useful to prevent hydration mismatch
    };
}
