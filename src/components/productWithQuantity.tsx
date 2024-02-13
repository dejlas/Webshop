import { Product } from "@prisma/client";
export interface ProductWithQuantity extends Product {
  quantity: number;
}
