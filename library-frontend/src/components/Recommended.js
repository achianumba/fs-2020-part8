import React, { useEffect, useState } from "react";
import { useLazyQuery } from '@apollo/client';
import { FAV_GENRE } from '../queries';

const Recommended = ({ show }) => {
  const [favs, setFavs] = useState(null);
  const [favsRequest] = useLazyQuery(FAV_GENRE, {
    ignoreResults: false,
    onError: (err) => {
      alert('Unable to fetch books in favorite genre from the server:\n', err);
    },
    onCompleted: ({ allBooks }) => {
      setFavs(allBooks);
    }
  });

  useEffect(() => {
    const favoriteGenre = localStorage.getItem('favoriteGenre');
    if (!favs && favoriteGenre) {
      favsRequest({variables: {
        genre: 'crime'
      }});
    }
  }, [favs, favsRequest]);

  if (!show) {
    return <></>;
  }

  return (
    <div>
      <h2>Recommendations</h2>
      <p>Books in your favourite genre</p>
      <table>
        <thead>
          <tr>
            <th>title</th>
            <th>author</th>
            <th>published</th>
          </tr>
        </thead>
        <tbody>
          { favs && favs.map((book) => (
            <tr key={book.title}>
              <td>{book.title}</td>
              <td>{book.author.name}</td>
              <td>{book.published ? book.published : ''}</td>
            </tr>
          )) }
        </tbody>
      </table>
    </div>
  );
};

export default Recommended;