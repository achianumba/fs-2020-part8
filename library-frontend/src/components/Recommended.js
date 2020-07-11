import React, { useEffect, useState } from "react";

const Recommended = ({ show, loading, data }) => {
  const [favs, setFavs] = useState(null);

  useEffect(() => {
    const favoriteGenre = localStorage.getItem('favoriteGenre');

    const books = favoriteGenre && data ? data.allBooks.filter((book) => {
      return book.genres.includes(favoriteGenre);
    }) : null;

    setFavs(books);
  }, [localStorage, data]);

  if (!show || loading) {
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