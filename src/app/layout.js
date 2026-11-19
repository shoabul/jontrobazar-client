import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import AppShell from "./components/AppShell";
import { ThemeProvider } from "../context/ThemeContext";
import { AuthProvider } from "../context/AuthContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// The root layout's AppShell reads the pathname at runtime (usePathname) to
// decide whether to render the global Nav/Footer. That blocks instant
// navigation for the root segment, so opt out of instant-navigation
// validation here (documented escape hatch in the instant-navigation guide).
export const instant = false;

export const metadata = {
  title: "JontroBazar — Bangladesh's Trusted Equipment Rental Marketplace",
  description:
    "Rent verified construction machinery, broadcast cinema gear, agricultural harvesters, and commercial tools across 64 districts in Bangladesh.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} min-h-full antialiased`}
    >
      <head>
        {/* Prevent theme flicker before hydration */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                const savedTheme = localStorage.getItem('jb_theme');
                const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
                  document.documentElement.classList.add('dark');
                } else {
                  document.documentElement.classList.remove('dark');
                }
              } catch (e) {}
            `,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-white dark:bg-[#090d16] text-neutral-900 dark:text-neutral-100 transition-colors selection:bg-orange-500 selection:text-white">
        <ThemeProvider>
          <AuthProvider>
            <AppShell>{children}</AppShell>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
