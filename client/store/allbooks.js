import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_BOOKS = 'GET_BOOKS'

/**
 * INITIAL STATE
 */
const defaultBooks = []

/**
 * ACTION CREATORS
 */
const getBooks = books => ({
  type: GET_BOOKS,
  books
})
const pageCount = (bookNumber, limit) => ({
  type: 'GET_COUNT',
  bookNumber,
  limit
})
/**
 * THUNK CREATORS
 */

export const fetchBooks = (page, limit) => {
  return async dispatch => {
    try {
      const {data} = await axios.get(`/api/books/${limit}/${page}`)
      dispatch(getBooks(data[0]))
      dispatch(pageCount(data[1], limit))
    } catch (err) {
      console.log('Something went wrong inside fetchBooks! Err is: ', err)
    }
  }
}

export const addBook = book => {
  return async () => {
    try {
      await axios.post('/api/books', book)
    } catch (err) {
      console.log('Something went wrong inside addBook! Err is: ', err)
    }
  }
}

export const editBook = (id, book) => {
  return async () => {
    try {
      await axios.put(`/api/books/${id}`, book)
    } catch (err) {
      console.log('Something went wrong inside editBook! Err is: ', err)
    }
  }
}

export const deleteBook = id => {
  return async dispatch => {
    try {
      const {data} = await axios.delete(`/api/books/${id}`)
      dispatch(getBooks(data))
    } catch (err) {
      console.log('Something went wrong inside deleteBook! Err is: ', err)
    }
  }
}

/**
 * REDUCER
 */
export default function(state = defaultBooks, action) {
  switch (action.type) {
    case GET_BOOKS:
      return action.books
    default:
      return state
  }
}
