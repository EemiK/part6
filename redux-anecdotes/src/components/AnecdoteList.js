import { useDispatch, useSelector } from "react-redux"
import { voteAnecdote } from "../reducers/anecdoteReducer"

const Anecdotes = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector(state => state)

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
              <button onClick={() => dispatch(voteAnecdote(anecdote.id))}>vote</button>
            </div>
          </div>
        )}
    </div>
  )
}

export default Anecdotes