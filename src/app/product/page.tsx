"use client";
import { Product } from "@prisma/client";
import { useState, useEffect } from "react";
import axios from "axios";
import Header from "~/components/header";
import Sidebar from "~/components/sidebar";
import { ProductWithQuantity } from "~/components/productWithQuantity";
import Image from "next/image";

type GetProductsData = {
  products: Product[];
};
const ProductPage: React.FC = () => {
  const [product, setProduct] = useState<Product | null>(null);
  // const [product2, setProduct2] = useState<Product | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");

  useEffect(() => {
    const storedProduct = localStorage.getItem("product");
    if (storedProduct) {
      setProduct(JSON.parse(storedProduct));
    }
  }, []);

  const addToCart = async () => {
    if (product) {
      const existingCart: ProductWithQuantity[] = JSON.parse(
        localStorage.getItem("cart") || "[]"
      );
      const existingProductIndex = existingCart.findIndex(
        (item: ProductWithQuantity) => item.id === product.id
      );

      if (existingProductIndex !== -1) {
        existingCart[existingProductIndex].quantity += 1;
      } else {
        const updatedProduct: ProductWithQuantity = {
          ...product,
          quantity: 1,
        };
        existingCart.push(updatedProduct);
      }

      localStorage.setItem("cart", JSON.stringify(existingCart));
      getProducts(product.category);
    }
  };

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const openSidebar = () => {
    setIsSidebarOpen(true);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };
  const getProducts = async (category: string) => {
    try {
      const { data } = await axios.get<GetProductsData>(
        `/api/${category.toLowerCase()}`
      );
      setProducts(data.products);
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    const storedProduct = localStorage.getItem("product");
    if (storedProduct) {
      const parsedProduct = JSON.parse(storedProduct);
      setProduct(parsedProduct);
      getProducts(parsedProduct.category);
    }
  }, []);

  return (
    <div>
      <Header
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      ></Header>
      <div>
        <div className="w-full h-screen grid grid-cols-2 gap-10 border-2 border-gray-200">
          {product && (
            <>
              <div className="grid place-items-center mb-20">
                <div className=" w-96 h-96">
                  <Image
                    src={product.imageUrl}
                    alt={product.id}
                    width={620}
                    height={620}
                  />
                </div>
              </div>

              <div>
                <div className="border-b-2 border-gray-200">
                  <div className="text-3xl font-semibold mt-16 mb-2">
                    {product.name}
                  </div>
                  <div className="rounded-full bg-blue-600 w-16 flex items-center justify-center  text-white px-1 py-1 mb-2">
                    {product.price}
                    {"€"}
                  </div>
                </div>
                <div className="grid mt-5 place-items-center">
                  <div>{product.description}</div>
                </div>
                <div className="grid place-items-center bottom-0 h-screen">
                  <button
                    className="rounded-full  bg-blue-600 h-10 w-80 flex items-center justify-center  text-white px-1 py-1"
                    onClick={async () => {
                      await addToCart();
                      openSidebar();
                    }}
                  >
                    Add To Cart
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
      <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar}>
        <div>
          <button onClick={closeSidebar}></button>
        </div>
      </Sidebar>
      <div className="font-bold text-2xl py-2">Related products</div>
      <div className="border-2 border-gray-200 inline-flex w-screen p-2">
        {products.map((product, index) => (
          <button
            key={index}
            className="mx-5 grid place-items-center border-2 hover:border-blue-600"
          >
            <Image
              src={product.imageUrl}
              alt={product.id}
              width={270}
              height={270}
            ></Image>

            <div className="absolute -mb-36 -ml-16 inline-flex rounded-full w-auto text-sm  h-8 place-items-center bg-gray-200 py-2 px-1">
              <div className="place-items-center mx-3 font-semibold">
                {product.name}
              </div>
              <div className="rounded-full w-auto h-auto bg-blue-600 text-white place-items-center px-1">
                {product.price}
                {"€"}
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProductPage;
