import React, { useEffect } from 'react';
import { useAuth } from './AuthContext';

const AddTask = ({ initialData,handleChange, handleSubmit, taskData }) => {
  const { user } = useAuth();

  return (
    <form style={{border:"none",boxShadow:"none",background:"none"}} onSubmit={handleSubmit}>
      {/* <div className='close'>
        x
      </div> */}
      <div>
        <label>
          Title:
          <input
            type="text"
            name="title"
            value={taskData.title}
            onChange={handleChange}
            required
          />
        </label>
      </div>
      <div>
        <label>
          <div>Description:</div>
          
          <textarea
          style={{resize:"none",width:"100%",}}
            name="description"
            value={taskData.description}
            onChange={handleChange}
            required
          />
        </label>
      </div>
      <div>
        <label>
        <div>Status:</div>
          
          <select
          style={{resize:"none",width:"102%",height:"40px",borderRadius:"4px"}}
            name="status"
            value={taskData.status}
            onChange={handleChange}
          >
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </label>
      </div>
      <div style={{display:"flex",justifyContent:"center",marginTop:"16px"}}>
      <button type="submit" >{initialData ? 'Update Task' : 'Create Task'}</button>
      </div>
    </form>
  );
};

export default AddTask;
