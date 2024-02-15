import prisma from "../../lib/prisma";
export async function GET() {
  const products = await prisma.product.findMany({
    where: { category: "MARKETING" },
  });

  return Response.json({ products });
}
