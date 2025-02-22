import Navbar from "./components/Navbar";
import { ConvexClientProvider } from "./ConvexClientProvider";

import type { Metadata } from "next";
import { Chivo, Besley } from "next/font/google";
import "./globals.css";

const chivo = Chivo({
  variable: "--font-chivo",
  subsets: ["latin"],
});

const besley = Besley({
  variable: "--font-besley",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Meal Planner App",
  description:
    "Browse recipes, add to your favorites and craft your perfect weekly meal plan.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${besley.variable} ${chivo.variable}`}>
      <body className="font-chivo antialiased text-dark">
        <Navbar />
        <ConvexClientProvider>{children}</ConvexClientProvider>
      </body>
    </html>
  );
}
