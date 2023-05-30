import { useDispatch, useSelector } from "react-redux"
import { voteAnecdote } from "../reducers/anecdoteReducer"
import { setNotification } from "../reducers/notificationReducer"

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
                  dispatch(setNotification(`voted ${anecdote.content}`, 5))
                }
              }>vote</button>
            </div>
          </div>
        )}
    </div>
  )
}

export default Anecdotes