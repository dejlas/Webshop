import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
export async function GET() {
  const product = await prisma.product.findFirst({
    where: { id: "clqni2yv90000v4b8cmb6c7xa" },
  });

  return Response.json({ product });
}
