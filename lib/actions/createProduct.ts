"use server";

import prisma from "../prismaClient/prisma";

const createProduct = async (data: any) => {
  const product = await prisma.product.create({ data });
  return product;
};

export default createProduct;
