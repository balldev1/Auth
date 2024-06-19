"use client";

import {useState, useEffect} from "react";
import {Inter} from "next/font/google";
import config from '@/next.config.mjs';
import "./globals.css";
import {PrimeReactProvider} from "primereact/api";
import {Sidebar} from "primereact/sidebar";
import {SidebarPage} from "@/app/components/(layout)/sidebar";
import {DarkmodePage} from "@/app/components/(toggle)/darkmode";

const inter = Inter({subsets: ["latin"]});

export default function RootLayout({children}: { children: React.ReactNode }) {
    const [currentClassMode, setClassMode] = useState('light');
    const [currentTheme, setCurrentTheme] = useState('/themes/lara-light-purple/theme.css');

    // Function to change the theme
    const setTheme = (theme: string) => {
        setCurrentTheme(theme);
        const themeLink = document.getElementById('theme-css') as HTMLLinkElement;
        if (themeLink) {
            themeLink.href = theme;
        }
    };

    // Update theme based on state changes
    useEffect(() => {
        setTheme(currentTheme);
    }, [currentTheme]);

    const handleClassModeChange = (mode: string) => {
        setClassMode(mode);
        setTheme(mode === 'light' ? '/themes/lara-dark-teal/theme.css' : '/themes/lara-light-purple/theme.css');
    };

    return (
        <html lang="en" className={currentClassMode}>
        <head>
            <link id="theme-css" href={`${config.basePath}${currentTheme}`} rel="stylesheet"></link>
        </head>
        <body>
        <div  className="flex flex-col  p-0 dark:bg-base-100  min-h-screen  bg-cover  bg-center bg-no-repeat bg-fixed w-full   "
        style={{
                 backgroundImage: currentClassMode === 'light' ? "url('/images/wp2.jpg')" : "url('/images/wp1.jpg')"
             }}
        >
            <DarkmodePage setClassMode={handleClassModeChange} />
            <PrimeReactProvider>
                {children}
            </PrimeReactProvider>
        </div>
        </body>
        </html>
    );
}
