import {Dispatch} from 'redux'
import {SetAppErrorActionType, setAppStatusAC, SetAppStatusActionType} from '../../app/app-reducer'
import {authAPI, LoginParamsType} from '../../api/todolists-api'
import {handleServerAppError, handleServerNetworkError} from '../../utils/error-utils'
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";

const initialState = {
    isLoggedIn: false
}

export const AuthSlice = createSlice({
    name: "auth",
    initialState: initialState,
    reducers: {
        setIsLoggedInAC(state, action: PayloadAction<boolean>){
            state.isLoggedIn = action.payload;
        }
    }
});

export const authReducer = AuthSlice.reducer;
export const AuthSliceActions = AuthSlice.actions

// thunks
// export const loginTC = createAsyncThunk("test",(data: LoginParamsType,ThunkApi) => {
//     const {dispatch} = ThunkApi
//     dispatch(setAppStatusAC({status: 'loading'}))
//     authAPI.login(data)
//         .then(res => {
//             if (res.data.resultCode === 0) {
//                 dispatch(AuthSliceActions.setIsLoggedInAC(true))
//                 dispatch(setAppStatusAC({status: 'succeeded'}))
//             } else {
//                 handleServerAppError(res.data, dispatch)
//             }
//         })
//         .catch((error) => {
//             handleServerNetworkError(error, dispatch)
//         })
// }

export const loginTC = createAsyncThunk("test",(data: LoginParamsType,ThunkApi) => {
    const {dispatch} = ThunkApi
   // dispatch(setAppStatusAC({status: 'loading'}))
    authAPI.login(data)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(AuthSliceActions.setIsLoggedInAC(true))
                dispatch(setAppStatusAC({status: 'succeeded'}))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch((error) => {
            handleServerNetworkError(error, dispatch)
        })
}

export const logoutTC = () => (dispatch: Dispatch<SetAppErrorActionType | SetAppStatusActionType>) => {
    dispatch(setAppStatusAC( 'loading'))
    authAPI.logout()
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(setIsLoggedInAC({value: false}))
                dispatch(setAppStatusAC( 'succeeded'))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch((error) => {
            handleServerNetworkError(error, dispatch)
        })
}