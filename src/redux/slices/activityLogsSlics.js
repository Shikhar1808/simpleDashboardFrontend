import { createSlice } from "@reduxjs/toolkit";

const initalState = {
    logs: []
}

const activityLogsSlice = createSlice({
    name: 'activityLogs',
    initialState: initalState,
    reducers: {
        addLog: (state, action) =>{
            state.logs.push(action.payload);
        }
    } 
})

export const { addLog } = activityLogsSlice.actions;
export const selectLogs = state => state.activityLogs.logs;
export default activityLogsSlice.reducer;