export interface Product {
  codigo: string;
  nome: string;
  referencia: string;
  codigo_categoria: string;
  imagem: string;
  preco: string; 
  descricao: string;
}

export type ProductsResponse = Product[];

export interface ProductFilterRequest {
  nome_produto?: string;
  codigo_produto?: string;
}
