import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api/axios';
import { useAuth } from '../context/AuthContext';

function Boards() {
  const [boards, setBoards] = useState([]);
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { logout } = useAuth();
  const navigate = useNavigate();

  const fetchBoards = async () => {
    try {
      setError('');
      const { data } = await api.get('/boards');
      setBoards(data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load boards');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBoards();
  }, []);

  const handleCreateBoard = async (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    try {
      setError('');
      await api.post('/boards', { name });
      setName('');
      await fetchBoards();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create board');
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="page">
      <header className="page-header">
        <h1>Boards</h1>
        <button type="button" className="btn btn-secondary" onClick={handleLogout}>
          Logout
        </button>
      </header>

      {error && <p className="error-message">{error}</p>}

      <form className="create-form" onSubmit={handleCreateBoard}>
        <input
          className="input"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Board name"
          required
        />
        <button type="submit" className="btn btn-primary">
          Create Board
        </button>
      </form>

      <ul className="board-grid">
        {boards.map((board) => (
          <li key={board._id}>
            <Link className="board-card" to={`/boards/${board._id}`}>
              {board.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Boards;
