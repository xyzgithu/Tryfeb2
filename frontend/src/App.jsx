import { useState, useEffect } from 'react';
import './App.css';

const API_URL = 'http://localhost:5000/api/todos';

function App() {
    const [todos, setTodos] = useState([]);
    const [newTodoText, setNewTodoText] = useState('');
    const [loading, setLoading] = useState(true);

    // Fetch todos on mount
    useEffect(() => {
        fetchTodos();
    }, []);

    const fetchTodos = async () => {
        try {
            const response = await fetch(API_URL);
            const data = await response.json();
            setTodos(data);
        } catch (error) {
            console.error('Error fetching todos:', error);
        } finally {
            setLoading(false);
        }
    };

    const addTodo = async (e) => {
        e.preventDefault();
        if (!newTodoText.trim()) return;

        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ text: newTodoText })
            });
            const newTodo = await response.json();
            setTodos([...todos, newTodo]);
            setNewTodoText('');
        } catch (error) {
            console.error('Error adding todo:', error);
        }
    };

    const toggleTodo = async (id, completed) => {
        try {
            const response = await fetch(`${API_URL}/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ completed: !completed })
            });
            const updatedTodo = await response.json();
            setTodos(todos.map(todo => todo.id === id ? updatedTodo : todo));
        } catch (error) {
            console.error('Error updating todo:', error);
        }
    };

    const deleteTodo = async (id) => {
        try {
            await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
            setTodos(todos.filter(todo => todo.id !== id));
        } catch (error) {
            console.error('Error deleting todo:', error);
        }
    };

    if (loading) {
        return (
            <div className="app">
                <div className="container">
                    <h1>✨ Todo App</h1>
                    <p style={{ textAlign: 'center' }}>Loading...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="app">
            <div className="container">
                <h1>✨ Todo App</h1>

                <form onSubmit={addTodo} className="add-todo">
                    <input
                        type="text"
                        className="todo-input"
                        placeholder="What needs to be done?"
                        value={newTodoText}
                        onChange={(e) => setNewTodoText(e.target.value)}
                    />
                    <button type="submit" className="btn btn-primary">
                        Add Todo
                    </button>
                </form>

                {todos.length === 0 ? (
                    <div className="empty-state">
                        <div className="empty-state-icon">📝</div>
                        <p className="empty-state-text">No todos yet. Add one above!</p>
                    </div>
                ) : (
                    <div className="todos-list">
                        {todos.map((todo) => (
                            <div key={todo.id} className="todo-item">
                                <input
                                    type="checkbox"
                                    className="checkbox"
                                    checked={todo.completed}
                                    onChange={() => toggleTodo(todo.id, todo.completed)}
                                />
                                <span className={`todo-text ${todo.completed ? 'completed' : ''}`}>
                                    {todo.text}
                                </span>
                                <div className="todo-actions">
                                    <button
                                        className="btn btn-danger"
                                        onClick={() => deleteTodo(todo.id)}
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default App;
