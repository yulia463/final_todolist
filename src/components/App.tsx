import React, {useState} from 'react';
import '../App.css';
import {Todolist} from "./TodoList";
import {v1} from "uuid";
import {FilterValuesType, TodolistsType} from "./Types";

function App() {

    let todolistID1 = v1()
    let todolistID2 = v1()

    let [todolists, setTodolists] = useState<Array<TodolistsType>>([
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'},
    ])

    let [tasks, setTasks] = useState({
        [todolistID1]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'ReactJS', isDone: false},

        ],
        [todolistID2]: [
            {id: v1(), title: 'Rest API', isDone: true},
            {id: v1(), title: 'GraphQL', isDone: false},
        ]
    })


    const removeTask = (todolistId: string, id: string) => {
        let todolistTasks = tasks[todolistId]
        tasks[todolistId] = todolistTasks.filter(el => el.id !== id)
        setTasks({...tasks})
    }
    const changeFilter = (todolistId: string, value: FilterValuesType) => {
        let todolist = todolists.find(el => el.id === todolistId)
        if (todolist) {
            todolist.filter = value
            setTodolists([...todolists])
        }
    }
    const changeTaskStatus = (todolistId: string, id: string, isDone: boolean) => {
        let todolistTasks = tasks[todolistId]
        let task = todolistTasks.find(el => el.id === id)
        if (task) {
            task.isDone = isDone
        }
        setTasks({...tasks})
    }
    const addTask = (todolistId: string, title: string) => {
        let task = {id: v1(), title, isDone: false}

        let todolistTasks = tasks[todolistId]
        tasks[todolistId] = [task, ...todolistTasks]
        setTasks({...tasks})
    }
    const removeTodolist = (todolistId: string) => {
        setTodolists(todolists.filter(el => el.id !== todolistId))
        delete tasks[todolistId]
        setTasks({...tasks})
    }

    return (
        <div className="App">
            {todolists.map(el => {
                let allTodolistTasks = tasks[el.id]
                let tasksForTodolist = allTodolistTasks

                if (el.filter === 'active') {
                    tasksForTodolist = allTodolistTasks.filter(el => !el.isDone)
                }
                if (el.filter === 'completed') {
                    tasksForTodolist = allTodolistTasks.filter(el => el.isDone)
                }

                return <Todolist
                    key={el.id}
                    todolistId={el.id}
                    tasks={tasksForTodolist}
                    title={el.title}
                    removeTask={removeTask}
                    changeFilter={changeFilter}
                    addTask={addTask}
                    changeTaskStatus={changeTaskStatus}
                    filter={el.filter}
                    removeTodolist={removeTodolist}

                />
            })}
        </div>
    );
}

export default App;
