"use client";

import { useEffect, useState } from "react";

type Theme = "light" | "dark";

export function useTheme() {
    // Ambil theme langsung dari localStorage untuk initial state
    const [theme, setTheme] = useState<Theme>(() => {
        if (typeof window === "undefined") return "light";
        const saved = localStorage.getItem("darkMode");
        return saved === "true" ? "dark" : "light";
    });

    // Terapkan class ke DOM setelah render pertama
    useEffect(() => {
        document.documentElement.classList.toggle("dark", theme === "dark");
    }, [theme]);

    const applyTheme = (mode: Theme) => {
        setTheme(mode);
        localStorage.setItem("darkMode", mode === "dark" ? "true" : "false");
    };

    const toggleTheme = () => applyTheme(theme === "dark" ? "light" : "dark");

    return {
        theme,
        isDark: theme === "dark",
        toggleTheme,
        setTheme: applyTheme,
    };
}
