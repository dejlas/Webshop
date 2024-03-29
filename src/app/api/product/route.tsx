import { PrismaClient } from "@prisma/client";
type Product = { id: string };
const prisma = new PrismaClient();

export async function POST(req: Request) {
  const { id } = (await req.json()) as Product;
  try {
    const product = await prisma.product.findFirst({
      where: {
        id,
      },
    });
    if (product) {
      return Response.json({ product });
    } else {
      return Response.json({ message: "There is no poduct in store" });
    }
  } catch (error) {
    console.error(error);
    return { message: "Internal server error" };
  }
}
