import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { DndContext, useDraggable, useDroppable } from '@dnd-kit/core';
import api from '../api/axios';
import { useAuth } from '../context/AuthContext';

const COLUMNS = [
  { key: 'todo', label: 'To Do' },
  { key: 'in-progress', label: 'In Progress' },
  { key: 'done', label: 'Done' },
];

function DroppableColumn({ id, children }) {
  const { setNodeRef, isOver } = useDroppable({ id });
  return (
    <ul
      ref={setNodeRef}
      className="kanban-column-body"
      style={{ background: isOver ? 'rgba(79, 70, 229, 0.08)' : undefined }}
    >
      {children}
    </ul>
  );
}

function DraggableTask({ task }) {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: task._id,
  });
  return (
    <li
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className={`task-card${isDragging ? ' task-card--dragging' : ''}`}
    >
      <span className="task-card-title">{task.title}</span>
    </li>
  );
}

function BoardDetail() {
  const { boardId } = useParams();
  const { socket } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchTasks = async () => {
    try {
      setError('');
      const { data } = await api.get(`/tasks/${boardId}`);
      setTasks(data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load tasks');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [boardId]);

  useEffect(() => {
    if (!socket) return;

    const handleTaskCreated = (task) => {
      const taskBoardId = (task.board?._id || task.board)?.toString();
      if (taskBoardId === boardId) {
        setTasks((prev) => {
          if (prev.some((t) => t._id === task._id)) return prev;
          return [...prev, task];
        });
      }
    };

    socket.on('task:created', handleTaskCreated);
    return () => socket.off('task:created', handleTaskCreated);
  }, [socket, boardId]);

  const handleAddTask = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    try {
      setError('');
      await api.post('/tasks', { title, boardId });
      setTitle('');
      await fetchTasks();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add task');
    }
  };

  const handleDragEnd = async (event) => {
    const { active, over } = event;
    if (!over) return;

    const taskId = active.id;
    const newStatus = over.id;
    const task = tasks.find((t) => t._id === taskId);

    if (!task || task.status === newStatus) return;

    setTasks((prev) =>
      prev.map((t) => (t._id === taskId ? { ...t, status: newStatus } : t))
    );

    try {
      await api.patch(`/tasks/${taskId}`, { status: newStatus });
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update task');
      fetchTasks();
    }
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="page">
      <div className="board-detail-header">
        <Link className="back-link" to="/boards">
          Back to Boards
        </Link>
        <h1>Board Tasks</h1>
      </div>
      {error && <p className="error-message">{error}</p>}
      <form className="create-form" onSubmit={handleAddTask}>
        <input
          className="input"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Task title"
          required
        />
        <button type="submit" className="btn btn-primary">
          Add Task
        </button>
      </form>
      <DndContext onDragEnd={handleDragEnd}>
        <div className="kanban-board">
          {COLUMNS.map(({ key, label }) => (
            <div key={key} className={`kanban-column kanban-column--${key}`}>
              <div className="kanban-column-header">
                <h2>{label}</h2>
              </div>
              <DroppableColumn id={key}>
                {tasks
                  .filter((task) => task.status === key)
                  .map((task) => (
                    <DraggableTask key={task._id} task={task} />
                  ))}
              </DroppableColumn>
            </div>
          ))}
        </div>
      </DndContext>
    </div>
  );
}

export default BoardDetail;
