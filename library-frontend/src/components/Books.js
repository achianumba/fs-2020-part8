import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { ALL_BOOKS } from '../queries';

const Books = (props) => {
  const { loading, data } = useQuery(ALL_BOOKS);
  const [genre, setGenre] = useState(null);
  // Dynamically set books to display
  let books = genre && data ? data.allBooks.filter(b => b.genres.includes(genre)) : !genre && data ? data.allBooks : null;
  //Extract genres into an array of unique values
  let genres = data ? data.allBooks.reduce((genresArr, book) => genresArr.concat(book.genres), []) : null;
  genres = [...new Set(genres)];

  const showGenre = e => {
    e.preventDefault();
    
    if (e.target.textContent === 'All genres') {
      return !genres ? null : setGenre(null);
    }

    if (e.target.className === 'genre') {
      setGenre(e.target.textContent);
    }
  }

  if (!props.show) {
    return <></>
  }

  if (loading) {
    return <h2>Loading books...</h2>;
  }

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th>title</th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {books && books.map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>
      <div id="genres-container" onClick={ showGenre }>
        <button className="genre">All genres</button>
        { genres && genres.map(genre => (<button key={ genre } className="genre">{ genre }</button>)) }
      </div>
    </div>
  )
}

export default Books