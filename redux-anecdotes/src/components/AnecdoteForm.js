import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { notificationChange, notificationHide, timeout, setNewTimeout } from '../reducers/notificationReducer'

const NewAnecdote = () => {
  const dispatch = useDispatch()

  const addAnecdote = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    dispatch(createAnecdote(content))

    if (timeout) {
      clearTimeout(timeout)
    }

    dispatch(notificationChange(`added '${content}'`))
    setNewTimeout(setTimeout(() => {
      dispatch(notificationHide())
    }, 5000))
  }

  return (
    <form onSubmit={addAnecdote}>
        <div><input name="anecdote"/></div>
        <button type="submit">create</button>
      </form>
  )
}

export default NewAnecdote