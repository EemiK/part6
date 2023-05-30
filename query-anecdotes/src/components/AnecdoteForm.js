import { useMutation, useQueryClient } from 'react-query'
import { createAnecdote } from '../requests'
import { useContext } from 'react'
import AnecdoteContext from '../AnecdoteContext'

const AnecdoteForm = () => {
  const [notification, dispatch] = useContext(AnecdoteContext)

  const queryClient = useQueryClient()
  const newAnecdoteMutation = useMutation(createAnecdote, {
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData('anecdotes')
      queryClient.setQueryData('anecdotes', anecdotes.concat(newAnecdote))
    },
    onError: () => {
      dispatch({ type: "SHOW", payload: "too short anecdote, must have length 5 or more" })

      setTimeout(() => {
        dispatch({ type: "HIDE" })
      })
    }
  })

  const onCreate = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''

    if (content.length < 5) {
      console.error('too short')
    }

    newAnecdoteMutation.mutate({ content, votes: 0 })

    await dispatch({ type: "ADD", payload: `added '${content}'` })

    setTimeout(() => {
      dispatch({ type: "ADD", payload: null })
    }, 5000)
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
