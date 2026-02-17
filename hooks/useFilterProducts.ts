"use client";

import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { getFilteredProducts } from "@/services/product.service";
import {
  ProductsResponse,
  ProductFilterRequest,
} from "@/types/products";

function useDebounce<T>(value: T, delay = 400) {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debounced;
}

export const useFilterProducts = (token: string, filters: ProductFilterRequest) => {
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [page, setPage] = useState(1);
  const [visibleCount, setVisibleCount] = useState(10);

  const debouncedFilters = useDebounce(filters, 400);

  const { data, isLoading, isError } = useQuery<Product[]>({
    queryKey: ["products", debouncedFilters, page],
    queryFn: async () => {
      return getFilteredProducts(token, debouncedFilters);
    },
    enabled: !!token,
    keepPreviousData: true,
  });

  useEffect(() => {
    if (!data) return;

    if (page === 1) {
      setAllProducts(data);
      setVisibleCount(10); 
    } else {
      setAllProducts((prev) => {
        const existingIds = new Set(prev.map((p) => p.codigo));
        const newProducts = data.filter((p) => !existingIds.has(p.codigo));
        return [...prev, ...newProducts];
      });
    }
  }, [data, page]);

  useEffect(() => {
    setPage(1);
  }, [debouncedFilters]);

  const loadMore = () => {
    setVisibleCount((prev) => prev + 10);

    if (visibleCount + 8 > allProducts.length) setPage((prev) => prev + 1);
  };

  const sortProducts = (sortBy: "nome" | "preco", order: "asc" | "desc") => {
    setAllProducts((prev) =>
      [...prev].sort((a, b) => {
        if (sortBy === "nome") return order === "asc" ? a.nome.localeCompare(b.nome) : b.nome.localeCompare(a.nome);
        return order === "asc" ? Number(a.preco) - Number(b.preco) : Number(b.preco) - Number(a.preco);
      })
    );
  };

  return {
    products: allProducts.slice(0, visibleCount), 
    totalProducts: allProducts.length,
    isLoading,
    isError,
    loadMore,
    sortProducts,
  };
};
