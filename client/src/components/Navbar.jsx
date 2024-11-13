import { useState } from "react";
import AddTaskModel from "../models/AddTaskModel";

function Navbar() {
  const [isModelOpen, setIsModalOpen] = useState(false);

  const openModel = () => {
    setIsModalOpen(true);
  };

  const closeModel = () => {
    setIsModalOpen(false);
  };

  return (
    <nav className="bg-gray-800 py-4">
      <div
        className="max-w-7xl mx-auto px-4 flex
     justify-between items-center"
      >
        <div>
          <span
            className="text-white text-lg
             font-bold"
          >
            Task Manager
          </span>
        </div>

        <div>
          <button
            className="bg-blue-500 hover:bg-blue-600
             text-white font-bold py-2 px-4 rounded"
            onClick={openModel}
          >
            Add
          </button>
        </div>
      </div>
      <AddTaskModel isOpen={isModelOpen} closeModel={closeModel} />
    </nav>
  );
}

export default Navbar;
