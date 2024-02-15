"use client";
import { Product } from "@prisma/client";
import React, { useState, useEffect, FormEvent } from "react";
import axios from "axios";
import Header from "~/components/header";
import { useRouter } from "next/navigation";
import Image from "next/image";
type GetProductsData = {
  products: Product[];
};
const SearchPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const router = useRouter();

  const getProducts = async () => {
    try {
      selectedCategory == null;
      {
        const { data } = await axios.get<GetProductsData>("/api");
        setProducts(data.products);
      }
    } catch (error) {
      throw error;
    }
  };
  useEffect(() => {
    getProducts();
  });
  const showDetails = async (id: string) => {
    try {
      const { data } = await axios.post("/api/product", {
        id: id,
      });
      console.log(data);
      if (data.product) {
        localStorage.setItem("product", JSON.stringify(data.product));
        router.push("/product");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const sortProductsByNameAZ = () => {
    const sortedProducts = [...products].sort((a, b) => {
      const nameA = a.name.toLowerCase();
      const nameB = b.name.toLowerCase();
      return sortOrder === "asc"
        ? nameA.localeCompare(nameB)
        : nameB.localeCompare(nameA);
    });
    setProducts(sortedProducts);
  };
  const sortProductsByNameZA = () => {
    const sortedProducts = [...products].sort((a, b) => {
      const nameA = a.name.toLowerCase();
      const nameB = b.name.toLowerCase();
      return sortOrder === "desc"
        ? nameA.localeCompare(nameB)
        : nameB.localeCompare(nameA);
    });
    setProducts(sortedProducts);
  };
  return (
    <div>
      <Header searchQuery={searchQuery} onSearchChange={setSearchQuery} />
      <main className="border-2 border-gray-200 grid-cols-3 inline-flex w-screen place-items-center">
        <div className="grid place-items-start mx-5">
          <ul className="-mt-52">
            <li>
              <button className="hover:font-semibold">Potkategorija 1</button>
              <button className="hover:font-semibold">Potkategorija 2</button>
              <button className="hover:font-semibold">Potkategorija 3</button>
            </li>
          </ul>
        </div>
        <div className="m-10 grid grid-cols-3 grid-rows-2 gap-10">
          {products.map((product, index) => (
            <div key={""}>
              <button
                onClick={() => showDetails(product.id)}
                key={index}
                className="hover:border-2 hover:border-blue-600 "
              >
                <Image
                  src={product.imageUrl}
                  alt={product.id}
                  width={300}
                  height={300}
                ></Image>
              </button>
              <div className="inline-flex rounded-full w-auto text-sm  h-8 place-items-center bg-gray-200 py-2 px-1">
                <div className="place-items-center mx-3 font-semibold">
                  {product.name}
                </div>
                <div className="rounded-full w-auto h-auto bg-blue-600 text-white place-items-center px-1">
                  {product.price}
                  {"€"}
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="grid place-items-start mx-5">
          <ul className="-mt-52">
            <li>
              <button
                onClick={sortProductsByNameAZ}
                className="hover:font-semibold"
              >
                Sort by Name A-Z{sortOrder === "asc"}
              </button>
              <button
                onClick={sortProductsByNameZA}
                className="hover:font-semibold"
              >
                Sort by Name Z-A{sortOrder === "desc"}
              </button>
            </li>
          </ul>
        </div>
      </main>
    </div>
  );
};
export default SearchPage;
