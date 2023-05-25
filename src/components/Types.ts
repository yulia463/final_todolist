import {v1} from "uuid";

export type FilterValuesType = "all" | "active" | "completed"

export type TodolistPropsType = {
    todolistId: string
    title: string
    tasks: TaskType[]
    removeTask: (todolistId: string, id: string) => void
    changeFilter: (todolistId: string, value: FilterValuesType) => void
    addTask: (todolistId: string, title: string) => void
    changeTaskStatus: (todolistId: string, id: string, isDone: boolean) => void
    filter: FilterValuesType
    removeTodolist: (todolistId: string) => void
}
export type TaskType = {
    id: string,
    title: string,
    isDone: boolean
}
export type TodolistsType = {
    id: string,
    title: string,
    filter: FilterValuesType
}