import { ThemeProvider } from "@/components/Provider/ThemeProvider";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Nav from "@/components/Nav";
import { Toaster } from "@/components/ui/toaster";
const inter = Inter({ subsets: ["latin"] });
import Script from "next/script";

export const metadata: Metadata = {
  title: "Customer Page",
  description: "Buy Books",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <Script src="https://checkout.razorpay.com/v1/checkout.js" />
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <Toaster />
          <Nav />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
