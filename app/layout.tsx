import { ReactQueryProvider } from "@/providers/react-query.provider";
import { FavoritesProvider } from "@/components/product/FavoritesContext";
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
      <body>
        <ReactQueryProvider>
          <FavoritesProvider>
          {children}
          </FavoritesProvider> 
        </ReactQueryProvider>
      </body>
    </html>
  );
}
