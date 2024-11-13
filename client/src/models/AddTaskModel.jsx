import PropTypes from "prop-types";
import { useTaskContext } from "../context/TaskContext";
import { useState } from "react";

function AddTaskModel({ isOpen, closeModel }) {
  const { addTask } = useTaskContext();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("pending");

  const handleSubmit = () => {
    addTask(title, description, status);
    setTitle("");
    setDescription("");
    setStatus("pending");
    closeModel();
  };

  return (
    <div
      className={`model ${isOpen ? "block" : "hidden"}
    fixed inset-0 z-10 overflow-y-auto`}
    >
      <div
        className="modal-container bg-white
        w-full md:w-1/3 mx-auto mt-24 p-6 rounded shadow-lg"
      >
        <div className="modal-header flex justify-between items-center">
          <h3 className="text-lg font-semibold">Add New Task</h3>
          <button
            className="bg-red-500 text-white rounded-full px-2.5 py-1"
            onClick={closeModel}
          >
            X
          </button>
        </div>
        <div className="modal-body mt-4">
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="title"
            >
              Title
            </label>
            <input
              className="border rounded w-full py-2 px-3 text-gray-700 
              leading-tight focus:outline-none focus:shadow-outline"
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="description"
            >
              Description
            </label>
            <input
              className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="description"
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <button
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
            onClick={handleSubmit}
          >
            Add Task
          </button>
        </div>
      </div>
    </div>
  );
}

AddTaskModel.propTypes = {
  isOpen: PropTypes.bool,
  closeModel: PropTypes.func,
};
export default AddTaskModel;
