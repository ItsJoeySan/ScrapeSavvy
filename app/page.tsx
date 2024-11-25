"use client";
import HeroCarousel from "@/components/HeroCarousel";
import Searchbar from "@/components/Searchbar";
import Image from "next/image";
import React, { useEffect } from "react";
import { useState } from "react";
import findProduct from "@/lib/actions/findProduct";
import { RedirectStatusCode } from "next/dist/client/components/redirect-status-code";

const home = () => {
  // const [product, setProduct] = useState({
  //   title: "",
  //   currentPrice: "",
  // });
  // const products = async () => {
  //   const product = await findProduct();

  //   return product;
  //   // console.log(product);
  //   // if (product)
  //   //   setProduct({
  //   //     title: product[0].title,
  //   //     currentPrice: product[0].currentPrice,
  //   //   });
  // };
  // useEffect(() => {
  //   products();
  // }, []);
  return (
    <>
      <section className="px-6 md:px-20 py-24 ">
        <div className="flex max-xl:flex-col gap-16">
          <div className="flex flex-col justify-center">
            <p className="small-text">
              Smart Shopping Starts Here:
              <Image
                src="/assets/icons/arrow-right.svg"
                alt="arrow-right"
                width={16}
                height={16}
              />
            </p>

            <h1 className="head-text">
              Unleash the Power of
              <span className="text-primary"> ScrapeSavvy</span>
            </h1>

            <p className="mt-6">
              Smart, self-serve price tracking to help you monitor eCommerce
              products, save money, and buy at the perfect time.
            </p>

            <Searchbar />
          </div>

          <HeroCarousel />
        </div>
      </section>

      <section className="trending-section">
        <h2 className="section-text">Trending</h2>

        {/* {product && <div className="product-card">{product?.title}</div>} */}
      </section>
    </>
  );
};

export default home;
