"use server";

import prisma from "../prismaClient/prisma";

const createProduct = async (data: any) => {
  const existingProduct = await prisma.product.findFirst({
    where: { title: data.title },
  });
  if (existingProduct) {
    return existingProduct;
  }
  const product = await prisma.product.create({ data });
  return product;
};

export default createProduct;
