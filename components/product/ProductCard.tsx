"use client";

import { useState } from "react";
import Image from "next/image";
import { Product } from "@/types/product";
import { Button } from "@/components/ui/button";
import { ProductModal } from "../modal/ProductModal";
import { Heart } from "lucide-react";
import { useFavorites } from "./FavoritesContext";
import { ProductPrice } from "./ProductPrice";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const [open, setOpen] = useState(false);

  const { toggleFavorite, isFavorite } = useFavorites();

  return (
    <>
      <div className="rounded-lg shadow p-4 flex flex-col h-full gap-10 relative">
        <button
          onClick={() => toggleFavorite(Number(product.codigo))}
          aria-label={
            isFavorite(Number(product.codigo))
              ? "Remover dos favoritos"
              : "Adicionar aos favoritos"
          }
          className="absolute top-2 right-2 z-10 transform transition-transform duration-150 hover:scale-110"
        >
          <Heart
            fill={isFavorite(Number(product.codigo)) ? "red" : "none"}
            className={`w-6 h-6 transition-all duration-300 ${
              isFavorite(Number(product.codigo))
                ? "text-red-500 animate-pulse-heart"
                : "text-gray-400 hover:text-red-400"
            }`}
          />
        </button>

        <div className="relative w-full h-48 mb-4">
          <Image
            src={product.imagem || "/placeholder.jpg"}
            alt={product.nome}
            title={product.nome}
            fill
            className="object-contain rounded-md"
          />
        </div>

        <div className="flex flex-col gap-2">
          <h2 className="text-lg font-semibold">{product.nome}</h2>
          <p className="text-sm text-gray-500 pt-3">
            {product.descricao.split(" ").slice(0, 12).join(" ")}
            {product.descricao.split(" ").length > 12 ? "..." : ""}
          </p>
          <p className="text-md text-gray-500 line-clamp-2 font-medium flex flex-col gap-1">
            a partir de <br></br>{" "}
            <ProductPrice
              value={product.preco}
              className="text-2xl font-bold"
            />
            gerado pela melhor oferta
          </p>
        </div>

        <Button
          className="mt-auto font-medium rounded-none transition duration-300"
          onClick={() => setOpen(true)}
          title={`Ver detalhes de ${product.nome}`}
        >
          CONFIRA
        </Button>
      </div>

      <ProductModal product={product} open={open} onOpenChange={setOpen} />
    </>
  );
}
