import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getTasks, deleteTask } from '../taskService.js';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    try {
      const data = await getTasks();
      setTasks(data);
    } catch (error) {
      console.error('Error loading tasks:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        await deleteTask(id);
        setTasks(tasks.filter(task => task.id !== id));
      } catch (error) {
        console.error('Error deleting task:', error);
      }
    }
  };

  if (loading) {
    return <div>Loading tasks...</div>;
  }

  return (
    <div>
      <h1>Task Manager</h1>
      <Link to="/add">
        <button>Add New Task</button>
      </Link>
      
      {tasks.length === 0 ? (
        <p>No tasks found. Add a new task to get started!</p>
      ) : (
        <div>
          {tasks.map(task => (
            <div key={task.id} style={{ border: '1px solid #ccc', margin: '10px', padding: '10px' }}>
              <h3>{task.title}</h3>
              <p>{task.description}</p>
              <p><strong>Status:</strong> {task.status}</p>
              <div>
                <Link to={`/edit/${task.id}`}>
                  <button>Edit</button>
                </Link>
                <button onClick={() => handleDelete(task.id)} style={{ marginLeft: '10px', backgroundColor: '#ff4444', color: 'white' }}>
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TaskList;
