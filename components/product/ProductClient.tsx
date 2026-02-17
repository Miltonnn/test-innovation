"use client";

import { ProductCard } from "./ProductCard";
import { useFavorites } from "./FavoritesContext";
import { useState } from "react";
import { SkeletonCard } from "./SkeletonCard";
import { useFilterProducts } from "@/hooks/useFilterProducts";
import { ProductFilterRequest } from "@/types/products";

interface Props {
  token: string;
}

export function ProductClient({ token }: Props) {
  const { favorites } = useFavorites();
  const [onlyFavorites, setOnlyFavorites] = useState(false);
  const [filters, setFilters] = useState<ProductFilterRequest>({ nome_produto: "", codigo_produto: "" });

  const {
    products,
    isLoading,
    isError,
    loadMore,
    sortProducts,
  } = useFilterProducts(token, filters);

  const filteredProducts = onlyFavorites
    ? products.filter((p) => favorites.includes(Number(p.codigo)))
    : products;

  return (
    <section className="min-h-screen py-10 px-5 lg:px-20">
      <div className="container m-auto mb-10 flex flex-col md:flex-row gap-4 items-start md:items-center justify-center">
        
        <input
          type="text"
          placeholder="Buscar por nome"
          value={filters.nome_produto}
          onChange={(e) =>
            setFilters({ ...filters, nome_produto: e.target.value })
          }
          className="border p-2 rounded w-full md:w-64"
        />

        {/* Favoritos */}
        <button
          onClick={() => setOnlyFavorites(!onlyFavorites)}
          className="border px-4 py-2 rounded hover:bg-primary hover:text-white transition duration-300"
        >
          {onlyFavorites ? "Mostrar todos" : "Mostrar apenas favoritos"}
        </button>

        {/* Ordenação */}
        <select
          onChange={(e) => {
            const [sortBy, order] = e.target.value.split("_") as ["nome" | "preco", "asc" | "desc"];
            sortProducts(sortBy, order);
          }}
          className="border p-2 rounded"
        >
          <option value="nome_asc">Nome A-Z</option>
          <option value="nome_desc">Nome Z-A</option>
          <option value="preco_asc">Preço Crescente</option>
          <option value="preco_desc">Preço Decrescente</option>
        </select>
      </div>

      {/* Grid */}
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-6">
          {Array.from({ length: 10 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      ) : (
        <>
          {filteredProducts.length === 0 ? (
            <p className="text-center text-gray-500">Nenhum produto encontrado</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-6">
              {filteredProducts.map((produto) => (
                <ProductCard key={produto.codigo} product={produto} />
              ))}
            </div>
          )}

          {/* Botão de carregar mais */}
          {products.length > 0 && (
            <div className="flex justify-center mt-6">
              <button
                onClick={loadMore}
                title="Carregar mais produtos"
                className="bg-primary text-white px-6 py-2 rounded hover:bg-primary-dark transition"
              >
                Carregar mais
              </button>
            </div>
          )}
        </>
      )}

      {isError && (
        <p className="text-red-500 text-center mt-4">Erro ao carregar produtos</p>
      )}
    </section>
  );
}
