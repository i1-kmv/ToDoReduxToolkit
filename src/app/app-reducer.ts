import {Dispatch} from "redux";
import {authApi} from "../api/todolists-api";
import {setIsLoggedInAC} from "../features/Login/auth-reducer";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

const initialState: InitialStateType = {
    status: 'idle',
    error: null,
    isInitialized: false
}

const slice = createSlice({
    name: "app",
    initialState: initialState,
    reducers: {
        setAppErrorAC: (state, action: PayloadAction<{error: string | null}>) => {
            state.error = action.payload.error
        },
        setAppStatusAC: (state, action: PayloadAction<{status: RequestStatusType}>) => {
            state.status = action.payload.status
        },
        setAppIsInitializedAC: (state, action: PayloadAction<{value: boolean}>) => {
            state.isInitialized = action.payload.value
        }
    }
})

export const appReducer = slice.reducer;


export type RequestStatusType =  'idle' | 'loading' | 'succeeded' | 'failed'
export type InitialStateType = {
    // происходит ли сейчас взаимодействие с сервером
    status: RequestStatusType
    // если ошибка какая-то глобальная произойдёт - мы запишем текст ошибки сюда
    error: string | null,
    // true когда приложение проинициализировалось
    isInitialized: boolean
}

export const setAppErrorAC = slice.actions.setAppErrorAC //(error: string | null) => ({ type: 'APP/SET-ERROR', error } as const)
export const setAppStatusAC = slice.actions.setAppStatusAC //(status:  RequestStatusType) => ({ type: 'APP/SET-STATUS', status } as const)
export const setAppIsInitializedAC = slice.actions.setAppIsInitializedAC //(value:  boolean) => ({ type: 'APP/SET-IS-INITIALIZED', value } as const)

export const initializeAppTC = () => (dispatch: Dispatch) => {
    authApi.me().then(res => {
        if (res.data.resultCode === 0) {
            dispatch(setIsLoggedInAC({value:true}))
        }else {

        }
        dispatch(setAppIsInitializedAC({value: true}))
    })
}


export type SetAppErrorActionType = ReturnType<typeof setAppErrorAC>
export type SetAppStatusActionType = ReturnType<typeof setAppStatusAC>
