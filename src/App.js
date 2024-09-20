import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {
    const [tasks, setTasks] = useState(() => JSON.parse(localStorage.getItem('tasks')) || []);
    const [taskInput, setTaskInput] = useState('');
    const [filter, setFilter] = useState('all');
    const [selectedTasks, setSelectedTasks] = useState(new Set());

    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }, [tasks]);

    const addTask = (e) => {
        e.preventDefault();
        if (taskInput.trim()) {
            setTasks([...tasks, { text: taskInput, completed: false }]);
            setTaskInput('');
        }
    };

    const toggleTaskCompletion = (index) => {
        const newTasks = tasks.map((task, i) => 
            i === index ? { ...task, completed: !task.completed } : task
        );
        setTasks(newTasks);
    };

    const toggleSelectTask = (index) => {
        const newSelectedTasks = new Set(selectedTasks);
        if (newSelectedTasks.has(index)) {
            newSelectedTasks.delete(index);
        } else {
            newSelectedTasks.add(index);
        }
        setSelectedTasks(newSelectedTasks);
    };

    const removeSelectedTasks = () => {
        const newTasks = tasks.filter((_, i) => !selectedTasks.has(i));
        setTasks(newTasks);
        setSelectedTasks(new Set());
    };

    const filteredTasks = tasks.filter(task => {
        if (filter === 'completed') return task.completed;
        if (filter === 'active') return !task.completed;
        return true;
    });

    return (
        <div className="container">
            <h1>To-Do List</h1>
            <form onSubmit={addTask}>
                <input 
                    type="text" 
                    value={taskInput} 
                    onChange={(e) => setTaskInput(e.target.value)} 
                    placeholder="Add a new task..."
                />
                <button type="submit">Add</button>
            </form>
            <ul>
                {filteredTasks.map((task, index) => (
                    <li key={index}>
                        <input 
                            type="checkbox" 
                            checked={task.completed} 
                            onChange={() => toggleTaskCompletion(index)} 
                        />
                        <span className={task.completed ? 'completed' : ''}>{task.text}</span>
                    </li>
                ))}
            </ul>
            <div className="filter-buttons">
                <button onClick={() => setFilter('all')}>Show All</button>
                <button onClick={() => setFilter('completed')}>Show Completed</button>
                <button onClick={() => setFilter('active')}>Show Active</button>
                <button onClick={removeSelectedTasks} disabled={selectedTasks.size === 0}>Remove Selected</button>
            </div>
        </div>
    );
};

export default App;
