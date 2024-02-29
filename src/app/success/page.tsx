"use client";
import Header from "~/components/header";
import { useState } from "react";
import { useRouter } from "next/navigation";
const Privacy: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const router = useRouter();
  const goToHomePage = async () => {
    localStorage.removeItem("cart");
    router.push("/");
  };
  return (
    <div>
      <Header searchQuery={searchQuery} onSearchChange={setSearchQuery} />
      <div className="p-20 mx-64">
        <h1 className="font-bold text-5xl mb-10 text-green-700">Success!</h1>
        <div className="">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Nam libero
          justo laoreet sit amet cursus sit. Dictumst quisque sagittis purus sit
          amet volutpat consequat.
        </div>
        <div>
          <button
            onClick={goToHomePage}
            className="text-gray-700 bg-gray-200 border-0 py-1 px-4 focus:outline-none hover:bg-gray-300 rounded text-lg inline-flex "
          >
            Back
          </button>
        </div>
      </div>
    </div>
  );
};
export default Privacy;
