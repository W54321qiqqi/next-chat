import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import ToasterContext from "./context/ToasterContext";
const inter = Inter({ subsets: ["latin"] });
import ThemeRegistry from "@/app/components/ThemeRegistry/ThemeRegistry";

export const metadata: Metadata = {
  title: "Messenger Clone",
  description: "Messenger Clone",
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeRegistry>
          <ToasterContext></ToasterContext>
          {children}
        </ThemeRegistry>
      </body>
    </html>
  );
}
