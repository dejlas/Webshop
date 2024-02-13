import { Category, PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
export async function GET() {
  const products = await prisma.product.findMany({
    where: { category: "DEVELOPMENT" },
  });

  return Response.json({ products });
}
