import React, {ChangeEvent, KeyboardEvent, useState} from 'react'
import {TodolistPropsType} from "./Types";
import {v1} from "uuid";


export const Todolist = (props: TodolistPropsType) => {
    let [title, setTitle] = useState('')
    let [error, setError] = useState<string | null>(null)

    const addTask = (todolistId: string) => {
        if (title.trim() !== '') {
            props.addTask(todolistId,title.trim())
            setTitle('')
        } else {
            setError('Title is required')
        }
    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    const onKeyPressHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (event.key === 'Enter') {
            addTask();
        }
    };
    const onAllClickHandler = (todolistId: string) => {
        props.changeFilter(todolistId, 'all')
    }
    const onActiveClickHandler = (todolistId: string) => {
        props.changeFilter(todolistId, 'active')
    }
    const onCompletedClickHandler = (todolistId: string) => {
        props.changeFilter(todolistId, 'completed')
    }
    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input value={title}
                       onChange={onChangeHandler}
                       onKeyPress={onKeyPressHandler}
                       className={error ? 'error' : ''}
                />
                <button onClick={()=>addTask(props.todolistId)}>+</button>
                {error && <div className={'error-message'}>{error}</div>}
            </div>
            <ul>
                {props.tasks.map((el) => {
                    const onClickHandler = () => props.removeTask(el.id)
                    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        let newIsDoneValue = e.currentTarget.checked
                        props.changeTaskStatus(el.id, newIsDoneValue)
                    }
                    return <li key={el.id}
                               className={el.isDone ? 'is-done' : ''}
                    >
                        <input type="checkbox"
                               checked={el.isDone}
                               onChange={onChangeHandler}
                        />
                        <span>{el.title}</span>
                        <button onClick={onClickHandler}>x</button>
                    </li>
                })}

            </ul>
            <div>
                <button className={props.filter === 'all' ? 'active-filter' : ''}
                        onClick={() => onAllClickHandler(props.todolistId)}>All
                </button>

                <button className={props.filter === 'active' ? 'active-filter' : ''}
                        onClick={() => onActiveClickHandler(props.todolistId)}>Active
                </button>

                <button className={props.filter === 'completed' ? 'active-filter' : ''}
                        onClick={() => onCompletedClickHandler(props.todolistId)}>Completed
                </button>
            </div>
        </div>
    );
}



