"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import Image from "next/image";
import { Product } from "@/types/products";
import { ProductPrice } from "../product/ProductPrice";

interface ProductModalProps {
  product: Product;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ProductModal({
  product,
  open,
  onOpenChange,
}: ProductModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>{product.nome}</DialogTitle>
          <DialogDescription>
            Referência: {product.referencia}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="relative w-full h-60">
            <Image
              src={product.imagem}
              alt={product.nome}
              fill
              className="object-contain rounded-md"
            />
          </div>

          <p className="text-sm text-muted-foreground">{product.descricao}</p>

          <p className="text-md text-gray-500 line-clamp-2 font-medium flex flex-col gap-1">
            a partir de <br></br>{" "}
            <ProductPrice
              value={product.preco}
              className="text-2xl font-bold"
            />
            gerado pela melhor oferta
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
