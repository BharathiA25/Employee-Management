import { configureStore } from "@reduxjs/toolkit";
import employeeReducer from '../features/employee-manages/employeeSlice'

export const store = configureStore({
    reducer : {
        employees : employeeReducer
    }
})