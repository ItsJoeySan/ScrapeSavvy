"use server";

import prisma from "../prismaClient/prisma";

const findProduct = async () => {
  const product = await prisma.product.findMany();
  return product;
};

export default findProduct;
