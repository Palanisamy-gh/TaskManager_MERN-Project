import { useTaskContext } from "../context/TaskContext";

function Filterbar() {
  const { handleFilterClick } = useTaskContext();
  return (
    <div className="flex justify-center gap-1 my-5">
      <button
        className="bg-indigo-500 text-white text-lg font-bold px-4 py-2 rounded-lg"
        onClick={() => handleFilterClick("all")}
      >
        All
      </button>
      <button
        className="bg-green-600 text-white text-lg font-bold px-4 py-2 rounded-lg"
        onClick={() => handleFilterClick("completed")}
      >
        Completed
      </button>
      <button
        className="bg-red-500 text-white text-lg font-bold px-4 py-2 rounded-lg"
        onClick={() => handleFilterClick("pending")}
      >
        Pending
      </button>
    </div>
  );
}

export default Filterbar;
