import React, {useState} from 'react';
import '../App.css';
import {Todolist} from "./TodoList";
import {v1} from "uuid";

export type FilterValuesType = "all" | "active" | "completed"

function App() {

    const [tasks, setTasks] = useState([
        {id: v1(), title: "HTML&CSS", isDone: true},
        {id: v1(), title: "JS", isDone: true},
        {id: v1(), title: "ReactJS", isDone: false},
        {id: v1(), title: "SocialNW", isDone: false},
        {id: v1(), title: "NodeJS", isDone: true}
    ])

    const [filter, setFilter] = useState<FilterValuesType>('all')
    let tasksForTodolist = tasks
    if (filter === 'active') {
        tasksForTodolist = tasks.filter(el => !el.isDone)
    }
    if (filter === 'completed') {
        tasksForTodolist = tasks.filter(el => el.isDone)
    }

    const removeTask = (id: string) => {
        setTasks(tasks.filter(el => el.id !== id))
    }
    const changeFilter = (value: FilterValuesType) => {
        setFilter(value)
    }

    const changeTaskStatus = (id: string, isDone: boolean) => {
        let newTasks = tasks.map(t => {
            if( t.id === id) return {...t,isDone}
            else return t
        })
        setTasks(newTasks)
    }


    const addTask = (title: string) => {
        let task = {id: v1(), title, isDone: false}
        let newTask = [task, ...tasks]
        setTasks(newTask)
    }

    return (
        <div className="App">
            <Todolist
                tasks={tasksForTodolist}
                title="What to learn"
                removeTask={removeTask}
                changeFilter={changeFilter}
                addTask={addTask}
                changeTaskStatus={changeTaskStatus}
                filter={filter}

            />
        </div>
    );
}

export default App;
