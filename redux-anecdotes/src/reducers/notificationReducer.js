import { createSlice } from "@reduxjs/toolkit"

const notificationSlice = createSlice({
  name: 'notification',
  initialState: null,
  reducers: {
    changeNotification(state, action) {
      return action.payload
    }
  }
})

export const { changeNotification } = notificationSlice.actions

export let timeout = null

export const setNotification = (message, time) => {
  return async dispatch => {
    if (timeout) {
      clearTimeout(timeout)
    }

    dispatch(changeNotification(message))
    timeout = setTimeout(() => {
      dispatch(changeNotification(null))
    }, time * 1000)
  }
}

export default notificationSlice.reducer