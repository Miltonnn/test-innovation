import { api } from "./api";
import { ProductsResponse, ProductFilterRequest } from "@/types/product";

export const getProducts = async (token: string): Promise<ProductsResponse> => {
  const { data } = await api.get<ProductsResponse>("/produtos/listar", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
};

export const getFilteredProducts = async (
  token: string,
  filters: ProductFilterRequest,
): Promise<ProductsResponse> => {
  const { data } = await api.post<ProductsResponse>(
    "/produtos/listar",
    filters,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return data;
};
