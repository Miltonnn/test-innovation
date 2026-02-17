import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { ProductCard } from "@/components/product/ProductCard";
import { FavoritesProvider } from "@/components/product/FavoritesContext"; 

const mockProduct = {
  codigo: "P001",
  nome: "Produto Teste",
  referencia: "REF123",
  codigo_categoria: "CAT001",
  imagem: "imagem-teste.jpg",
  preco: "99.90",
  descricao: "Descrição do produto teste",
};

describe("ProductCard", () => {
  it("renderiza nome e preço do produto", () => {
    render(
      <FavoritesProvider>
        <ProductCard product={mockProduct} />
      </FavoritesProvider>
    );
    expect(screen.getByText("Produto Teste")).toBeInTheDocument();
    expect(screen.getByText("R$ 99,90")).toBeInTheDocument();
  });

  it("renderiza placeholder se a imagem não existir", () => {
    render(
      <FavoritesProvider>
        <ProductCard product={{ ...mockProduct, imagem: "" }} />
      </FavoritesProvider>
    );
    const img = screen.getByRole("img") as HTMLImageElement;
    expect(img.src).toContain("placeholder.jpg");
  });
});
