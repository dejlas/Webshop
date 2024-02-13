import { Category, PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
async function main() {
  /* const user = await prisma.user.upsert({
    where: { id: "" },
    update: {},
    create: {
      email: "dejla.saric@gmail.com",
      username: "Dejla",
      password: "12345",
    },
  }); */
  const product = await prisma.product.upsert({
    where: { id: "" },
    update: {},
    create: {
      name: "Mobile application",
      description: "We can develop great mobile app for your bussines",
      imageUrl: "/mobile.jpg",
      category: Category.DEVELOPMENT,
      price: 1234.0,
    },
  });
  console.log(product);
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
