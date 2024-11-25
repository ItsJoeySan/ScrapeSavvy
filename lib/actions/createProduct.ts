"use server";

import { prisma } from "../prismaClient/prisma";

const createProduct = async (data: any) => {
  console.log("here is data:", data);
  const existingProduct = await prisma.product.findFirst({
    where: {
      title: data.title,
    },
  });

  if (existingProduct) {
    console.log("product alrady exits:", existingProduct);
    return existingProduct;
  }
  const product = await prisma.product.create({ data });
  return product;
};

export default createProduct;
