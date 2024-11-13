import PropTypes from "prop-types";
import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

const TaskContext = createContext();

const apiUrl = "http://localhost:5000";

export const useTaskContext = () => {
  return useContext(TaskContext);
};

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [filteredTask, setFilteredTask] = useState([]);
  const [totalTask, setTotalTask] = useState(0);
  const [completedTask, setCompletedTask] = useState(0);
  const [pendingTask, setpendingTask] = useState(0);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${apiUrl}/tasks`);
      setTasks(response.data);
      setFilteredTask(response.data);
      setTotalTask(response.data.length);
      const taskCompleted = response.data.filter(
        (task) => task.status === "completed"
      ).length;
      setCompletedTask(taskCompleted);
      setpendingTask(response.data.length - taskCompleted);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [totalTask]);

  const handleFilterClick = (status) => {
    if (status === "all") {
      setFilteredTask(tasks);
    } else {
      const filtered = tasks.filter((task) => task.status === status);
      setFilteredTask(filtered);
    }
  };

  const addTask = async (title, description, status) => {
    try {
      const response = await axios.post(`${apiUrl}/tasks`, {
        title,
        description,
        status,
      });
      setTasks([...tasks, response.data]);
      if (status === "completed") {
        setCompletedTask((prev) => prev + 1);
      } else {
        setpendingTask((prev) => prev + 1);
      }
      setTotalTask((prev) => prev + 1);
    } catch (error) {
      console.error("Error adding task", error);
    }
  };

  const editTask = async (taskId, editTitle, editDescription, editStatus) => {
    try {
      await axios.put(`${apiUrl}/tasks/${taskId}`, {
        title: editTitle,
        description: editDescription,
        status: editStatus,
      });
      fetchData();
    } catch (error) {
      console.error("Error editing task", error);
    }
  };

  const deleteTask = async (taskId) => {
    try {
      await axios.delete(`${apiUrl}/tasks/${taskId}`);
      const updatedTasks = tasks.filter((task) => task.id !== taskId);
      setTasks(updatedTasks);
      setFilteredTask(updatedTasks);
      setTotalTask((prev) => prev - 1);
      const completedCount = updatedTasks.filter(
        (task) => task.status === "completed"
      ).length;
      setCompletedTask(completedCount);
      setpendingTask(updatedTasks.length - completedCount);
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const updateTaskStatus = async (taskId, status) => {
    try {
      await axios.put(`${apiUrl}/tasks/${taskId}`, { status });
      const updatedTasks = tasks.map((task) =>
        task._id === taskId ? { ...task, status } : task
      );
      setTasks(updatedTasks);
      setFilteredTask(updatedTasks);
      setCompletedTask((prev) =>
        status === "completed" ? prev + 1 : prev - 1
      );
      setpendingTask((prev) => (status !== "completed" ? prev + 1 : prev - 1));
    } catch (error) {
      console.error("Error updating task status:", error);
    }
  };

  return (
    <TaskContext.Provider
      value={{
        filteredTask,
        handleFilterClick,
        totalTask,
        completedTask,
        pendingTask,
        addTask,
        editTask,
        deleteTask,
        updateTaskStatus,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

TaskProvider.propTypes = {
  children: PropTypes.array,
};
