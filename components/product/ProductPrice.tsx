interface ProductPriceProps {
  value: number | string;
  className?: string;
}

export function ProductPrice({ value, className }: ProductPriceProps) {
  const formatted = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(Number(value));

  return (
    <span className={className}>
      {formatted}
    </span>
  );
}
