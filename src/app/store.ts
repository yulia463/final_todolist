import {tasksReducer} from '../features/TodolistsList/tasks-reducer';
import {todolistsReducer} from '../features/TodolistsList/todolists-reducer';
import {AnyAction, combineReducers} from 'redux'
import thunkMiddleware from 'redux-thunk'
import {appReducer} from './app-reducer'
import {authReducer} from '../features/Login/auth-reducer'
import {configureStore, ThunkDispatch} from "@reduxjs/toolkit";
import {useDispatch} from "react-redux";
//import logger from 'redux-logger'

// объединяя reducer-ы с помощью combineReducers,
// мы задаём структуру нашего единственного объекта-состояния
const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer,
    app: appReducer,
    auth: authReducer
})
//export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        })
            .prepend(thunkMiddleware)
})

// непосредственно создаём store
// определить автоматически тип всего объекта состояния
export type AppRootStateType = ReturnType<typeof store.getState>

// а это, чтобы можно было в консоли браузера обращаться к store в любой момент
export type TypedDispatch = ThunkDispatch<AppRootStateType, any, AnyAction>;
export const useTypedDispatch = () => useDispatch<TypedDispatch>();
// @ts-ignore
window.store = store;
