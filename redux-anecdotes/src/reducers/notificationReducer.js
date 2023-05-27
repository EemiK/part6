import { createSlice } from "@reduxjs/toolkit"

const notificationSlice = createSlice({
  name: 'notification',
  initialState: null,
  reducers: {
    notificationChange(state, action) {
      return action.payload
    },
    notificationHide() {
      return null
    }
  }
})

export let timeout = null

export const setNewTimeout = (newTimeout) => timeout = newTimeout 


export const { notificationChange, notificationHide } = notificationSlice.actions
export default notificationSlice.reducer