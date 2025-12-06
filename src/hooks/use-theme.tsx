"use client";

import { useEffect, useState } from "react";

type Theme = "light" | "dark";

export function useTheme() {
    const [theme, setTheme] = useState<Theme>("light");
    const [mounted, setMounted] = useState(false);

    // Initialize theme from localStorage on mount
    useEffect(() => {
        setMounted(true);
        const savedTheme = localStorage.getItem("darkMode");
        const isDark = savedTheme === "true";
        setTheme(isDark ? "dark" : "light");
    }, []);

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
