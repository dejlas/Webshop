"use client";
import Header from "~/components/header";
import { useState } from "react";
const Privacy: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  return (
    <div>
      <Header searchQuery={searchQuery} onSearchChange={setSearchQuery} />
      <div className="p-20 mx-64">
        <h1 className="font-bold text-5xl mb-10">Privacy Policy</h1>
        <div className="">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Nam libero
          justo laoreet sit amet cursus sit. Dictumst quisque sagittis purus sit
          amet volutpat consequat. Egestas diam in arcu cursus euismod. Sed
          faucibus turpis in eu mi bibendum. Consectetur libero id faucibus
          nisl. Quisque id diam vel quam elementum. Eros donec ac odio tempor
          orci dapibus ultrices. Turpis tincidunt id aliquet risus. Pellentesque
          eu tincidunt tortor aliquam nulla facilisi cras fermentum odio.
        </div>
      </div>
    </div>
  );
};
export default Privacy;
