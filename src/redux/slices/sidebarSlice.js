import { createSlice } from "@reduxjs/toolkit";

const initalState = {
    isExpanded: true,
}

const sidebarSlice = createSlice({
    name: 'sidebar',
    initialState: initalState,
    reducers: {
        toggleSidebar: (state) => {
            state.isExpanded = !state.isExpanded;
        },
        expandSidebar: (state) => {
            state.isExpanded = true;
        },
        collapseSidebar: (state) => {
            state.isExpanded = false
        }
    }
});

export const { toggleSidebar, expandSidebar, collapseSidebar } = sidebarSlice.actions;
export const selectIsSidebarExpanded = state => state.sidebar.isExpanded;
export default sidebarSlice.reducer;