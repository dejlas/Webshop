"use client";
import { Product } from "@prisma/client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Image from "next/image";
type GetProductsData = {
  products: Product[];
};
const AnimatedProducts: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const router = useRouter();

  const targetProductIds = [
    "clqni2yv90000v4b8cmb6c7xa",
    "clqni4b3v0000v4zcnizf01pa",
    "clqnhgare0001v4okklkm5vay",
  ];
  const getProducts = async () => {
    try {
      const { data } = await axios.get<GetProductsData>("/api");
      setProducts(data.products);
    } catch (error) {
      throw error;
    }
  };
  useEffect(() => {
    getProducts();
  }, []);

  const targetProducts = products.filter((product) =>
    targetProductIds.includes(product.id)
  );
  const showDetails = async (id: string) => {
    try {
      const { data } = await axios.post("/api/product", {
        id: id,
      });

      if (data.product) {
        localStorage.setItem("product", JSON.stringify(data.product));
        router.push("/product");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <div className="inline-flex">
        {[0, 1, 2].map((groupIndex) => (
          <div
            key={groupIndex}
            className="inline-flex"
            style={{
              display: "flex",
              animation: `moveRightToLeft 20s linear infinite `,
            }}
          >
            {targetProducts.map((product, index) => (
              <div key={index}>
                <div className="mx-10">
                  <button
                    onClick={() => showDetails(product.id)}
                    className="hover:border-2 hover:border-blue-600 grid place-items-start border-2 mx-5 border-gray-300"
                    style={{
                      borderRadius: "10px 10px 10px 10px",
                    }}
                  >
                    <Image
                      src={product.imageUrl}
                      alt={product.id}
                      width={350}
                      height={350}
                      style={{
                        borderRadius: "10px 10px 10px 10px",
                      }}
                    />
                    <div className="inline-flex rounded-full w-auto text-sm h-8 place-items-center bg-gray-200 my-2  px-2">
                      <div className="place-items-center mx-3 font-semibold">
                        {product.name}
                      </div>
                      <div className="rounded-full w-auto h-auto bg-blue-600 text-white place-items-center px-2">
                        {product.price}
                        {"€"}
                      </div>
                    </div>
                  </button>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
      <style jsx>{`
        @keyframes moveRightToLeft {
          0% {
            transform: translateX(100%);
          }
          0% {
            transform: translateX(-100%);
          }
        }
      `}</style>
    </div>
  );
};
export default AnimatedProducts;
