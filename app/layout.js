import { Outfit, Plus_Jakarta_Sans, Urbanist } from "next/font/google";
import "./globals.css";
import ThemeProviderWrapper from "@/components/theme-provider";
import { Toaster } from "sonner";
import FloatingShapes from "@/components/floating-shapes";
import Header from "@/components/header";
import ConvexClientProvider from "@/app/convex-client-provider";

const outfit = Outfit({
  variable: "--font-outfit",
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta-sans",
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

const urbanist = Urbanist({
  variable: "--font-urbanist",
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

export const metadata = {
  title: "SnapIQ",
  description: "SnapIQ is a tool that allows you to edit images using AI",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${outfit.variable} ${plusJakartaSans.variable} ${urbanist.variable} antialiased`}
      >
        <ConvexClientProvider>  
        <ThemeProviderWrapper
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {/* Header */}
          <main className="bg-slate-900 min-h-screen text-white overflow-x-hidden">
            <Toaster richColors />
            <FloatingShapes />
            <Header />
            {children}
          </main>
        </ThemeProviderWrapper>
        </ConvexClientProvider>
      </body>
    </html>
  );
}
