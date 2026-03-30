import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "RoboTech Club — GEHU Bhimtal | Robotics & Electronics Innovation",
  description: "Official Robotics Club of Graphic Era Hill University, Bhimtal Campus. Electronics & Communication Engineering. Workshops, hackathons, competitions, and more.",
  keywords: ["GEHU", "Robotics Club", "Bhimtal", "Graphic Era Hill University", "ECE", "Electronics", "Robotics"],
  authors: [{ name: "RoboTech Club GEHU" }],
  openGraph: {
    title: "RoboTech Club — GEHU Bhimtal",
    description: "Where innovation meets electronics. Building the future through robotics, IoT, and embedded systems.",
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
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
