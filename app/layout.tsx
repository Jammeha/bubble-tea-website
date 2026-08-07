import type { Metadata } from "next";
import { Fredoka } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/components/context/CartContext";
import PromotionBanner from "@/components/PromotionBanner";

const fredoka = Fredoka({
  variable: "--font-fredoka",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: "Bubbles | Fresh & Premium Bubble Tea & Waffles",
  description: "Experience the magic in every cup. Best Bubble Tea in The Gambia.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={fredoka.className} suppressHydrationWarning>
        <CartProvider>
          <PromotionBanner />
          {children}
        </CartProvider>
      </body>
    </html>
  );
}
