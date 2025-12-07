"use client";

import { ReactNode, useEffect } from "react";

export function ThemeProvider(props: { children: ReactNode }) {
    useEffect(() => {}, []);

    return <>{props.children}</>;
}
