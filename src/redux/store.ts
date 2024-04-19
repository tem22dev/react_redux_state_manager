import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './counter/counterSlice'
import userReducer from './user/userSlice'

// Redux store: chứa toàn bộ state muốn quản lý
export const store = configureStore({
    reducer: {
        counter: counterReducer,
        user: userReducer,
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch