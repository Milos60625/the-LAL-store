import React, {useEffect} from 'react'
import {connect} from 'react-redux'
import {fetchSingleBook} from '../store/singleBook'

function SingleBook(props) {
  if (!props.book) props.book = []
  useEffect(() => {
    props.loadSingleBook(props.match.params.id)
  }, [])
  if (!props.book.reviews) props.book.reviews = []
  return (
    <div>
      <h2>{props.book.title}</h2>
      <h3>{props.book.author}</h3>
      <img src={props.book.imageUrl} />
      <p>{props.book.genre}</p>
      <p>{props.book.synopsis}</p>
      <p>{props.book.price}</p>
      <p>{props.book.ratings}</p>

      <h3>Reviews</h3>
      {!props.book.reviews.length ? (
        <p>No Reviews</p>
      ) : (
        props.book.reviews.map(review => (
          <div key={review.id} className="review">
            <p>{review.rating}</p>
            <p>{review.review}</p>
          </div>
        ))
      )}
    </div>
  )
}

const mapState = state => ({
  book: state.singleBook
})

const mapDispatch = dispatch => ({
  loadSingleBook: id => dispatch(fetchSingleBook(id))
})

export default connect(mapState, mapDispatch)(SingleBook)