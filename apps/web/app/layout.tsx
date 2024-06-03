import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "#/context/ThemeContext";
import Header from '#/components/Header';
import MobileHeader from "#/components/MobileHeader";
import ThemeScript from "#/components/ThemeScript/ThemeScript";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Sad",
  description: "website feels very sad",
};

// add supressHydrationWraing to make ThemeScript work，it only work one level deep, check the document 
// https://legacy.reactjs.org/docs/dom-elements.html#suppresshydrationwarning:~:text=It%20only%20works%20one%20level%20deep
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning lang="en">
      <head>
        <ThemeScript />
      </head>

      <body className={`transition-colors bg-pink-50 text-slate-800 dark:text-white dark:bg-[#101720] ${inter.className}`}>
        <ThemeProvider>
          <Header />
          <MobileHeader />

          <div>
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
