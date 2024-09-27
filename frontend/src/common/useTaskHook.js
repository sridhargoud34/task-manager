import { useState, useEffect } from 'react';
import { getTaskData } from '../services/AuthContainerServices';

const useTasks = (userId) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await getTaskData(userId);
        if (Array.isArray(res.result)) {
            
          setTasks(res.result);
        } else {
          console.error("Expected an array of tasks");
        }
      } catch (err) {
        console.error(err, "Error fetching tasks");
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, [userId]);

  return { tasks, setTasks, loading };
};

export default useTasks;
