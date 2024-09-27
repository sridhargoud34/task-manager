import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import useTasks from "../common/useTaskHook";
import AddTask from "./AddTask";
import { deleteTask, updateTask, postTask } from "../services/TaskService";
import "../assets/pagination.css";
import { useAuth } from "./AuthContext";
import { toast } from "react-toastify";
const Pagination = ({ userId }) => {
  const { user } = useAuth();
  const { tasks, setTasks, loading } = useTasks(userId);
  const [taskData, setTaskData] = useState({
    title: "",
    description: "",
    status: "Pending",
    userId: user?.id,
  });
  const [editingTask, setEditingTask] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTaskData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let response;
      if (editingTask) {
        response = await updateTask(taskData);
        handleSave(taskData);
        toast.success(response?.result?.message)
      } else {
        response = await postTask(taskData);
        handleSave(response?.result?.task);
        toast.success(response?.result?.message)
      }
    } catch (error) {
      console.error("Error creating/updating task:", error);
    }
  };

  const handleDelete = async (taskId,userId) => {
    try {
     const response =  await deleteTask({taskId:taskId,userId:userId});
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
      toast.success(response?.result?.message)
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const handleEdit = (task) => {
    setTaskData({ ...task, userId: task?.user_id, taskId: task?.id });
    setShowForm(true);
    setEditingTask(true);
  };

  const handleSave = (newTask) => {
    if (editingTask) {
      setTasks((prevTasks) =>
        prevTasks.map((task) => (task.id === newTask.id ? newTask : task))
      );
    } else {
      setTasks((prevTasks) => [...prevTasks, newTask]);
    }
    setTaskData({
      title: "",
      description: "",
      status: "Pending",
      userId: user?.id,
    });

    setShowForm(false);
    setEditingTask(false);
  };
  const columns = [
    { name: "S No", selector: (row) => row.id, sortable: true },
    { name: "Title", selector: (row) => row.title, sortable: true },
    { name: "Description", selector: (row) => row.description, sortable: true },
    { name: "Status", selector: (row) => row.status, sortable: true },
    {
      name: "Action",
      cell: (row) => (
        <div style={{ display: "flex", gap: "4px" }}>
          <div
            style={{
              cursor: "pointer",
              color: "green",
              height: "24px",
              width: "24px",
            }}
            onClick={() => handleEdit(row)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="size-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
              />
            </svg>
          </div>
          <div
            style={{
              cursor: "pointer",
              color: "red",
              height: "24px",
              width: "24px",
            }}
            onClick={() => handleDelete(row.id,row.user_id)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="size-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
              />
            </svg>
          </div>
          {/* <button onClick={() => handleEdit(row)}>Edit</button> */}
          {/* <button onClick={() => handleDelete(row.id)}>Delete</button> */}
        </div>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
  ];

  return (
    <div className="full-width">
      <div className="task-header">    
        <div className="task-heading">User Tasks</div>
      <button
        onClick={() => {
          setShowForm(true);
          setEditingTask(false);
        }}
      >
        Add Task
      </button></div>
  
      <DataTable
        columns={columns}
        data={tasks}
        progressPending={loading}
        pagination
        paginationPerPage={5}
        customStyles={{headCells:{style:{background:"#e8ecf1",color:"#333",fontSize:"18px",fontWeight:700}}}}
        paginationRowsPerPageOptions={[5, 10, 20]}
      />
      {showForm && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="close-button" onClick={() => {setTaskData({
    title: "",
    description: "",
    status: "Pending",
    userId: user?.id,
  });setShowForm(false)}}>
              ×
            </button>
            <AddTask
              initialData={editingTask}
              handleChange={handleChange}
              handleSubmit={handleSubmit}
              taskData={taskData}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Pagination;
