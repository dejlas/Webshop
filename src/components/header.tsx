import { Category } from "@prisma/client";
import Image from "next/image";
import React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "./sidebar";
import "../styles/sidebar.css";
type HeaderProps = {
  searchQuery: string;
  onSearchChange: (query: string) => void;
};
const Header: React.FC<HeaderProps> = ({ searchQuery, onSearchChange }) => {
  const router = useRouter();
  const goToHomePage = async () => {
    router.push("/");
  };
  const goToSearchPage = async () => {
    router.push("/search");
  };
  const goToDevelopmentPage = async () => {
    router.push("/search/development");
  };
  const goToMarketingPage = async () => {
    router.push("/search/marketing");
  };
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const openSidebar = () => {
    setIsSidebarOpen(true);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };
  return (
    <header className="text-gray-600 body-font ">
      <div className="container  flex flex-wrap px-10 py-2 flex-col md:flex-row">
        <div className="my-4">
          <button
            onClick={goToHomePage}
            className="flex title-font font-medium items-center text-gray-900"
          >
            <Image src={"/logo.svg"} alt="" width={21} height={21}></Image>
          </button>
        </div>
        <div className="my-4">
          <button
            onClick={goToHomePage}
            className="flex title-font mx-2 font-semibold items-center text-gray-900"
          >
            Kahvana shop
          </button>
        </div>

        <nav className="md:mr-28 md:ml-3 md:py-1 md:pl-3 border-l  border-solid	flex flex-wrap items-center justify-cente text-sm font-medium text-inherit text-gray-500">
          <button className="mr-5 hover:text-gray-900" onClick={goToSearchPage}>
            All
          </button>
          <button
            className="mr-5 hover:text-gray-900"
            onClick={goToDevelopmentPage}
          >
            Development
          </button>
          <button
            className="mr-5 hover:text-gray-900"
            onClick={goToMarketingPage}
          >
            Marketing
          </button>
        </nav>

        <input
          className="md:mr-10 w-96 h-10 mt-2 text-sm font-medium items-center border-t border-b border-l border-r border-solid px-2"
          style={{
            borderRadius: "10px 10px 10px 10px",
          }}
          type="text"
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
        />
        <Image
          alt=""
          src={"/search.svg"}
          height={16}
          width={16}
          className="relative -mx-16"
        ></Image>
        <div className="ml-4">
          <button
            onClick={openSidebar}
            className="inline-flex items-center ml-96 border-solid border-t border-b border-l border-r  focus:outline-none hover:bg-gray-200 rounded text-base md:mt-2"
          >
            <Image
              className="m-2"
              src={"/shopping-cart.svg"}
              alt=""
              width={20}
              height={20}
            ></Image>
          </button>
        </div>

        <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar}>
          <div>
            <button onClick={closeSidebar}></button>
          </div>
        </Sidebar>
      </div>
    </header>
  );
};
export default Header;
