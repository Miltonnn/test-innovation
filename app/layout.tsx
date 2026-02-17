import { ReactQueryProvider } from "@/providers/react-query.provider";
import { FavoritesProvider } from "@/components/product/FavoritesContext";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Innovation Store",
  description: "Catálogo de produtos com filtros e favoritos.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body suppressHydrationWarning={true}> 
        <ReactQueryProvider>
          <FavoritesProvider>
          {children}
          </FavoritesProvider> 
        </ReactQueryProvider>
      </body>
    </html>
  );
}