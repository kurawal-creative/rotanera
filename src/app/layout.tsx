import type { Metadata } from "next";
import { Toaster } from "sonner";
import "./globals.css";

export const metadata: Metadata = {
    title: "Rotanera - AI-Powered Rattan Design Generator",
    description: "Buat desain furnitur rotan yang menakjubkan dengan bantuan AI. Generate, customize, dan ekspor ide-ide Anda dengan mudah untuk proyek rotan berkelas dunia.",
    keywords: ["rotan", "desain", "AI", "furnitur", "generator", "rattan design", "rotan furniture"],
    authors: [{ name: "Kurawal Creative" }],
    creator: "Kurawal Creative",
    publisher: "Kurawal Creative",
    formatDetection: {
        email: false,
        address: false,
        telephone: false,
    },
    metadataBase: new URL("https://rotanera.kurawal.site"),
    alternates: {
        canonical: "/",
    },
    openGraph: {
        title: "Rotanera - AI-Powered Rattan Design Generator",
        description: "Buat desain furnitur rotan yang menakjubkan dengan bantuan AI. Generate, customize, dan ekspor ide-ide Anda dengan mudah.",
        url: "https://rotanera.kurawal.site",
        siteName: "Rotanera",
        locale: "id_ID",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Rotanera - AI-Powered Rattan Design Generator",
        description: "Buat desain furnitur rotan yang menakjubkan dengan bantuan AI.",
        creator: "@kurawal-creative",
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            "max-video-preview": -1,
            "max-image-preview": "large",
            "max-snippet": -1,
        },
    },
    icons: {
        icon: "/favicon.ico",
        shortcut: "/favicon.ico",
        apple: "/apple-touch-icon.png",
    },
    manifest: "/manifest.json",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <head>
                <script
                    dangerouslySetInnerHTML={{
                        __html: `
              (function() {
                try {
                  const darkMode = localStorage.getItem('darkMode') === 'true';
                  if (darkMode) {
                    document.documentElement.classList.add('dark');
                  }
                } catch (e) {}
              })();
            `,
                    }}
                />
            </head>
            <body className="antialiased" style={{ fontFamily: "Satoshi, sans-serif" }}>
                {children}
                <Toaster position="top-right" richColors />
            </body>
        </html>
    );
}
