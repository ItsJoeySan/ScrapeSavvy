"use server";

import { generateEmailBody, sendEmail } from "../nodemailer/nodemailer";
import { prisma } from "../prismaClient/prisma";

export const getAllProducts = async () => {
  const products = await prisma.product.findMany();
  return products;
};

export const getProductById = async (id: string) => {
  const product = await prisma.product.findUnique({
    where: {
      id,
    },
    include: {
      priceHistory: true,
    },
  });
  return product;
};

export const getSimilarProducts = async (category: string) => {
  const products = await prisma.product.findMany({
    where: {
      category,
    },
    take: 3,
  });
  if (!products) return [];
  return products;
};

export const addUserEmailToProduct = async (
  productId: string,
  email: string
) => {
  const alradyExists = await prisma.user.findFirst({
    where: {
      email,
    },
  });

  if (alradyExists?.productId === productId) {
    console.log("User already Tracked for this product");
    return alradyExists;
  }

  const addedUserEmail = await prisma.product.update({
    where: {
      id: productId,
    },
    data: {
      user: {
        create: {
          email,
        },
      },
    },
  });

  const emailContent = await generateEmailBody(addedUserEmail, "WELCOME");
  await sendEmail(emailContent, [email]);

  return addedUserEmail;
};
