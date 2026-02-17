import { render, screen, fireEvent } from "@testing-library/react";
import { ProductModal } from "@/components/modal/ProductModal";
import { Product } from "@/types/product";

const mockProduct: Product = {
  codigo: "P001",
  nome: "Produto Teste",
  referencia: "REF123",
  codigo_categoria: "CAT001",
  imagem: "imagem-teste.jpg",
  preco: "99.90",
  descricao: "Descrição do produto teste",
};

describe("ProductModal", () => {
  it("não deve renderizar conteúdo quando open=false", () => {
    render(
      <ProductModal
        product={mockProduct}
        open={false}
        onOpenChange={() => {}}
      />,
    );
    expect(screen.queryByText("Produto Teste")).not.toBeInTheDocument();
  });

  it("deve renderizar conteúdo quando open=true", () => {
    render(
      <ProductModal
        product={mockProduct}
        open={true}
        onOpenChange={() => {}}
      />,
    );

    expect(screen.getByText("Produto Teste")).toBeInTheDocument();
    expect(screen.getByText("Descrição do produto teste")).toBeInTheDocument();
    expect(screen.getByText("R$ 99,90")).toBeInTheDocument();

    const img = screen.getByRole("img") as HTMLImageElement;
    expect(img.src).toContain("imagem-teste.jpg");
  });

  it("deve chamar onOpenChange ao fechar modal", () => {
    const mockOnOpenChange = jest.fn();
    render(
      <ProductModal
        product={mockProduct}
        open={true}
        onOpenChange={mockOnOpenChange}
      />,
    );

    const closeButton = screen.getByRole("button", { name: /close/i });
    fireEvent.click(closeButton);

    expect(mockOnOpenChange).toHaveBeenCalledWith(false);
  });
});
