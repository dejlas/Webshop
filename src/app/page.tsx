"use client";
import { Product } from "@prisma/client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "~/components/header";
import { useRouter } from "next/navigation";
import Image from "next/image";
import AnimatedProducts from "~/components/animatedProducts";
type GetProductsData = {
  products: Product[];
};
const Home: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [product, setProduct] = useState<Product | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const router = useRouter();

  const targetProductIds = [
    "clqni4b3v0000v4zcnizf01pa",
    "clqnhgare0001v4okklkm5vay",
  ];

  const targetProducts = products.filter((product) =>
    targetProductIds.includes(product.id)
  );

  const getProductById = async (productId: string) => {
    try {
      const { data } = await axios.post("/api/product", { id: productId });
      if (data.product) {
        setProduct(data.product);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProductById("clqni2yv90000v4b8cmb6c7xa");
  }, []);

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

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (!selectedCategory || product.category === selectedCategory)
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
    <div className="">
      <Header searchQuery={searchQuery} onSearchChange={setSearchQuery} />
      <main className="">
        <div className="flex mx-3 ">
          <div className=" w-2/3">
            {product && (
              <div>
                <div className="mr-3">
                  <div>
                    <button
                      onClick={() => showDetails(product.id)}
                      className="hover:border-l hover:border-r hover:border-t hover:border-b hover:border-blue-600 border-slate border-t border-b border-l border-r"
                      style={{
                        borderRadius: "10px 10px 10px 10px",
                      }}
                    >
                      <Image
                        className=""
                        src={product.imageUrl}
                        alt={product.id}
                        width={900}
                        height={900}
                        style={{
                          borderRadius: "10px 10px 10px 10px",
                        }}
                      ></Image>
                    </button>
                  </div>
                </div>
                <div className=" inline-flex rounded-full w-auto text-sm  h-8 place-items-center bg-gray-200 px-2">
                  <div className="place-items-center mx-3 font-semibold">
                    {product.name}
                  </div>
                  <div className="rounded-full w-auto h-auto bg-blue-600 text-white place-items-center px-2">
                    {product.price}
                    {"€"}
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="">
            {targetProducts.map((product, index) => (
              <div key={index}>
                <div>
                  <button
                    onClick={() => showDetails(product.id)}
                    className="hover:border-l hover:border-r hover:border-t hover:border-b hover:border-blue-600 border-slate border-t border-b border-l border-r"
                    style={{
                      borderRadius: "10px 10px 10px 10px",
                    }}
                  >
                    <Image
                      src={product.imageUrl}
                      alt={product.id}
                      width={400}
                      height={450}
                      style={{
                        borderRadius: "10px 10px 10px 10px",
                      }}
                    />
                  </button>
                </div>

                <div className="inline-flex rounded-full w-auto text-sm h-8 place-items-center bg-gray-200 mb-5 px-2">
                  <div className="place-items-center mx-3 font-semibold">
                    {product.name}
                  </div>
                  <div className="rounded-full w-auto h-auto bg-blue-600 text-white place-items-center px-2">
                    {product.price}
                    {"€"}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="inline-flex overflow-hidden">
          <AnimatedProducts></AnimatedProducts>
        </div>
      </main>
    </div>
  );
};
export default Home;
