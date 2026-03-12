import type { Metadata } from "next";
import { Fredoka } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/components/context/CartContext";
import CartDrawer from "@/components/CartDrawer";
import PromotionBanner from "@/components/PromotionBanner";

const fredoka = Fredoka({
  variable: "--font-fredoka",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: "Boba Shop",
  description: "Delicious Bubble Tea & Waffles",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={fredoka.className} suppressHydrationWarning>
        <CartProvider>
          <PromotionBanner />
          {/* This is the ONLY place children should be */}
          {children}
          <CartDrawer />
        </CartProvider>
        {/* DO NOT PUT {children} HERE AGAIN */}
      </body>
    </html>
  );
}
