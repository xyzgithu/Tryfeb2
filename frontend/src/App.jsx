import { useState, useEffect } from 'react';
import './App.css';

// Support VITE_API_URL environment variable for production builds
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/todos';

function App() {
    const [todos, setTodos] = useState([]);
    const [loading, setLoading] = useState(true);

    // Initial load: Try API first, fallback to localStorage
    useEffect(() => {
        const loadInitialData = async () => {
            try {
                const response = await fetch(API_URL);
                if (response.ok) {
                    const data = await response.json();
                    setTodos(data);
                    // Save to local as backup
                    localStorage.setItem('todos', JSON.stringify(data));
                } else {
                    throw new Error('API not available');
                }
            } catch (error) {
                console.log('API not reachable, using localStorage fallback');
                const saved = localStorage.getItem('todos');
                if (saved) {
                    setTodos(JSON.parse(saved));
                }
            } finally {
                setLoading(false);
            }
        };

        loadInitialData();
    }, []);

    // Helper to persist data to localStorage
    const persistToLocal = (newTodos) => {
        setTodos(newTodos);
        localStorage.setItem('todos', JSON.stringify(newTodos));
    };

    const addTodo = async (text) => {
        if (!text.trim()) return;

        const newTodo = {
            id: Date.now(),
            text,
            completed: false
        };

        // UI Update (Optimistic)
        const updatedTodos = [...todos, newTodo];
        persistToLocal(updatedTodos);

        // API Sync (Background)
        try {
            await fetch(API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newTodo)
            });
        } catch (error) {
            console.warn('Background sync failed:', error);
        }
    };

    const toggleTodo = async (id) => {
        const updatedTodos = todos.map(todo =>
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
        );
        persistToLocal(updatedTodos);

        // API Sync
        const todo = updatedTodos.find(t => t.id === id);
        try {
            await fetch(`${API_URL}/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ completed: todo.completed })
            });
        } catch (error) {
            console.warn('Background sync failed:', error);
        }
    };

    const deleteTodo = async (id) => {
        const updatedTodos = todos.filter(todo => todo.id !== id);
        persistToLocal(updatedTodos);

        // API Sync
        try {
            await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
        } catch (error) {
            console.warn('Background sync failed:', error);
        }
    };

    if (loading) {
        return (
            <div className="app">
                <div className="container">
                    <h1>✨ Todo App</h1>
                    <p style={{ textAlign: 'center' }}>Initializing...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="app">
            <div className="container">
                <h1>✨ Todo App</h1>

                <TodoForm onAdd={addTodo} />

                {todos.length === 0 ? (
                    <EmptyState />
                ) : (
                    <div className="todos-list">
                        {todos.map((todo) => (
                            <TodoItem
                                key={todo.id}
                                todo={todo}
                                onToggle={toggleTodo}
                                onDelete={deleteTodo}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

// Sub-components for cleaner structure
function TodoForm({ onAdd }) {
    const [text, setText] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onAdd(text);
        setText('');
    };

    return (
        <form onSubmit={handleSubmit} className="add-todo">
            <input
                type="text"
                className="todo-input"
                placeholder="What needs to be done?"
                value={text}
                onChange={(e) => setText(e.target.value)}
            />
            <button type="submit" className="btn btn-primary">Add Todo</button>
        </form>
    );
}

function TodoItem({ todo, onToggle, onDelete }) {
    return (
        <div className="todo-item">
            <input
                type="checkbox"
                className="checkbox"
                checked={todo.completed}
                onChange={() => onToggle(todo.id)}
            />
            <span className={`todo-text ${todo.completed ? 'completed' : ''}`}>
                {todo.text}
            </span>
            <div className="todo-actions">
                <button className="btn btn-danger" onClick={() => onDelete(todo.id)}>
                    Delete
                </button>
            </div>
        </div>
    );
}

function EmptyState() {
    return (
        <div className="empty-state">
            <div className="empty-state-icon">📝</div>
            <p className="empty-state-text">No todos yet. Add one above!</p>
        </div>
    );
}

export default App;
