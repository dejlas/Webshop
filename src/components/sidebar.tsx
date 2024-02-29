"use client";
import { ReactNode, useEffect, useState } from "react";
import { ProductWithQuantity } from "./productWithQuantity";
import Image from "next/image";
import axios from "axios";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose, children }) => {
  const [cart, setCart] = useState<ProductWithQuantity[]>([]);

  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, [isOpen]);
  const removeProduct = (productId: string) => {
    const itemIndex = cart.findIndex((item) => item.id === productId);

    if (itemIndex !== -1) {
      const updatedCart = [
        ...cart.slice(0, itemIndex),
        ...cart.slice(itemIndex + 1),
      ];
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      setCart(updatedCart);
    }
  };

  const addItem = (productId: string) => {
    const itemIndex = cart.findIndex((item) => item.id === productId);
    if (itemIndex !== -1) {
      const updatedCart = [...cart];
      updatedCart[itemIndex].quantity += 1;
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      setCart(updatedCart);
    }
  };

  const removeItem = (productId: string) => {
    const itemIndex = cart.findIndex((item) => item.id === productId);

    if (itemIndex !== -1) {
      const updatedCart = [...cart];
      if (updatedCart[itemIndex].quantity > 1) {
        updatedCart[itemIndex].quantity -= 1;
      } else {
        updatedCart.splice(itemIndex, 1);
      }

      localStorage.setItem("cart", JSON.stringify(updatedCart));
      setCart(updatedCart);
    }
  };
  const total = cart.reduce(
    (accumulator, item) => accumulator + item.price * item.quantity,
    0
  );

  if (!isOpen) return null;

  const handlePayment = async () => {
    try {
      const { data } = await axios.post("/api/checkout", {
        amount: total * 100,
      });
      if (data) {
        window.location.href = data.url;
      } else {
        throw new Error("URL not found in response");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="sidebar">
      <div className="sidebarContent">
        <button className={"closeButton font-bold"} onClick={onClose}>
          x
        </button>
        {children}

        <div className="inline-flex">
          {cart.length > 0 ? (
            <div className="my-7">
              <div className="fixed top-2 p-3 text-black font-semibold ">
                My Cart:
              </div>

              <ul className="">
                {cart.map((item: ProductWithQuantity) => (
                  <li key={item.id}>
                    <div className="inline-flex mb-7 ">
                      <div className="inline-flex">
                        <div>
                          <Image
                            src={item.imageUrl}
                            alt={item.id}
                            width={100}
                            height={100}
                          />
                        </div>
                        <div>
                          <button
                            className="rounded-full w-3 h-3 -mx-1 -mt-2 flex items-center bg-gray-500 hover:bg-gray-400 justify-center focus:outline-none"
                            onClick={() => removeProduct(item.id)}
                          >
                            <Image
                              src={"/x.svg"}
                              alt=""
                              width={16}
                              height={16}
                            ></Image>
                          </button>
                        </div>
                      </div>

                      <div className="inline-flex mx-auto my-5 text-black">
                        {item.name}{" "}
                      </div>
                      <div className="fixed right-0 justify-end mx-5 my-3">
                        <div className="text-black">
                          {item.price * item.quantity}€
                        </div>
                        <div className="rounded border-2 border-grey-700 text-black">
                          <button
                            className="mx-3"
                            onClick={() => removeItem(item.id)}
                          >
                            -
                          </button>
                          {item.quantity}
                          <button
                            className="mx-3"
                            onClick={() => addItem(item.id)}
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>

              <div className="fixed inline-flex bottom-0 bg-slate-200 w-full h-24">
                <div>Total Price:</div>
                <div className="fixed right-0 text-black">
                  ${total.toFixed(2)}
                </div>

                <div className="fixed bottom-0 right-16 px-5 py-2">
                  <button
                    className="rounded bg-blue-600 text-white px-5 py-1"
                    onClick={handlePayment}
                  >
                    Proceed To Payment
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <p>Your Cart Is Empty!</p>
          )}
        </div>
      </div>
    </div>
  );
};
export default Sidebar;
