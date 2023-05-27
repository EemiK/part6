import { useDispatch, useSelector } from "react-redux"
import { voteAnecdote } from "../reducers/anecdoteReducer"
import { notificationChange, notificationHide, timeout, setNewTimeout } from "../reducers/notificationReducer"

const Anecdotes = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector(({ filter, anecdotes }) => {
    return anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(filter.toLowerCase()))
  })

  const compareNumbers = (a, b) => {
    return b.votes - a.votes
  }

  return (
    <div>
      {anecdotes
        .sort(compareNumbers)
        .map(anecdote =>
          <div key={anecdote.id}>
            <div>
              {anecdote.content}
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={
                () => {
                  dispatch(voteAnecdote(anecdote.id))

                  if (timeout) {
                    clearTimeout(timeout)
                  }

                  dispatch(notificationChange(`voted '${anecdote.content}'`))
                  setNewTimeout(setTimeout(() => {
                    dispatch(notificationHide())
                  }, 5000))
                }
              }>vote</button>
            </div>
          </div>
        )}
    </div>
  )
}

export default Anecdotes