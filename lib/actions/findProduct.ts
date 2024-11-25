"use server";

import { prisma } from "../prismaClient/prisma";

const findProduct = async () => {
  const product = await prisma.product.findMany();
  if (product) {
    return product;
  }
  return null;
};

export default findProduct;
