import { useState } from "react";
import { useTaskContext } from "../context/TaskContext";
import EditTaskModal from "../models/EditTaskModal";
import DeleteTaskModal from "../models/DeleteTaskModal";

function TaskList() {
  const { filteredTask, updateTaskStatus } = useTaskContext();
  const [openDropDownId, setOpenDropDownId] = useState(null);

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [taskId, setTaskId] = useState("");
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");

  const [isDeleteModelOpen, setIsDeleteModelOpen] = useState(false);

  const handleComplete = (taskId) => {
    updateTaskStatus(taskId, "completed");
    setOpenDropDownId(null);
  };

  const handleEdit = (taskId, taskTitle, taskDescription) => {
    setIsEditModalOpen(true);
    setOpenDropDownId(null);
    setTaskId(taskId);
    setTaskTitle(taskTitle);
    setTaskDescription(taskDescription);
  };

  const handleDelete = (taskId) => {
    setTaskId(taskId);
    setIsDeleteModelOpen(true);
    setOpenDropDownId(null);
  };

  const toggleDropDown = (taskId) => {
    setOpenDropDownId(openDropDownId === taskId ? null : taskId);
  };

  const isDropdownOpen = (taskId) => {
    return openDropDownId === taskId;
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-red-200";
      case "completed":
        return "bg-green-200";
      default:
        return "bg-indigo-200";
    }
  };

  return (
    <div className="my-8 grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 container">
      {filteredTask.map((task) => (
        <div
          key={task._id}
          className={`relative rounded-md shadow-md ${getStatusColor(
            task.status
          )}`}
        >
          <div className="px-2 py-4">
            <div className="flex gap-2 items-center mb-2">
              <button
                className="text-gray-500 hover:text-gray-700"
                onClick={() => toggleDropDown(task._id)}
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
              <h3 className="text-lg font-semibold mt-2">{task.title}</h3>
            </div>
            <p className="text-sm font-bold text-gray-600 ml-8 mb-4">
              {task.description}
            </p>
          </div>
          {isDropdownOpen(task._id) && (
            <div className="absolute top-5 left-10 w-48 md:w-44 rounded-xl shadow-md z-10 bg-white">
              <button
                className="block w-full py-1 px-2 text-left text-gray-800 hover:bg-gray-300"
                onClick={() =>
                  handleEdit(task._id, task.title, task.description)
                }
              >
                Edit
              </button>
              <button
                className="block w-full py-1 px-2 text-left text-red-600 hover:bg-red-100"
                onClick={() => handleDelete(task._id)}
              >
                Delete
              </button>
              <button
                className="block w-full py-1 px-2 text-left text-green-600 hover:bg-green-200"
                onClick={() => handleComplete(task._id)}
              >
                Mark as completed
              </button>
            </div>
          )}
        </div>
      ))}
      <EditTaskModal
        isOpen={isEditModalOpen}
        closeModal={() => setIsEditModalOpen(false)}
        taskId={taskId}
        initialTitle={taskTitle}
        initialDescription={taskDescription}
      />
      <DeleteTaskModal
        isOpen={isDeleteModelOpen}
        closeModal={() => setIsDeleteModelOpen(false)}
        taskId={taskId}
      />
    </div>
  );
}

export default TaskList;
