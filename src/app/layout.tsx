import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Krabbelwetter | Entdecke den Garten",
  description: "Wetterdaten und kleine Entdeckertipps für den Garten.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="de">
      <body>{children}</body>
    </html>
  );
}
