"use server";

import { prisma } from "../prismaClient/prisma";
import { scrapeAmazonProduct } from "../scraper";
import { getAveragePrice, getHighestPrice, getLowestPrice } from "../utils";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

//get existing product
//if it exists, check the price history of that particular product

const createProduct = async (url: string) => {
  try {
    const scrapedProduct = await scrapeAmazonProduct(url);
    console.log("Product scraped:", scrapedProduct);

    if (!scrapedProduct) return null;

    let product = scrapedProduct;

    const existingProduct = await prisma.product.findFirst({
      where: {
        title: product.title,
      },
      include: {
        priceHistory: true,
      },
    });

    if (existingProduct) {
      const updatedProductData = prisma.product.update({
        where: {
          id: existingProduct?.id,
        },
        data: {
          currentPrice: scrapedProduct.currentPrice,
          lowestPrice: scrapedProduct.lowestPrice,
          highestPrice: scrapedProduct.highestPrice,
          averagePrice: scrapedProduct.averagePrice,
          priceHistory: {
            create: {
              price: existingProduct.currentPrice,
            },
          },
        },
      });
      return updatedProductData;
    }

    const result = await prisma.product.create({ data: scrapedProduct });
    return result;
    // return NextResponse.redirect(
    //   `http://locallhost:3000/products/${result.id}`
    // );
  } catch (error) {
    console.log("error on createProduct", error);
  }
};

export default createProduct;
