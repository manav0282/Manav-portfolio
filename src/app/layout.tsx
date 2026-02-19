import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Manav Patel | Technical Support Specialist & Developer",
  description:
    "Portfolio of Manav Patel — Technical Support Specialist with 3+ years of experience in SaaS, enterprise support, and web development.",
  keywords: [
    "Manav Patel",
    "Technical Support",
    "Web Developer",
    "React",
    "Next.js",
    "Portfolio",
  ],
  openGraph: {
    title: "Manav Patel | Portfolio",
    description:
      "Technical Support Specialist & Web Developer based in Ottawa.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${jetbrainsMono.variable} font-[family-name:var(--font-jetbrains)] antialiased`}>
        <div className="scanline-overlay" />
        {children}
      </body>
    </html>
  );
}
