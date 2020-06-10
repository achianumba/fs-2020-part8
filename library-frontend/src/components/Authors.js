import React from "react";
import { useQuery } from "@apollo/client";
import { ALL_AUTHORS } from "../queries";

const Authors = (props) => {
  const authors = useQuery(ALL_AUTHORS);

  if (!props.show) {
    return null;
  }

  if (authors.loading) {
    return <h2>Loading users...</h2>
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <thead>
          <tr>
            <th>born</th>
            <th>books</th>
          </tr>
        </thead>
        <tbody>
          {authors &&
            authors.data.allAuthors.map((a) => (
              <tr key={a.name}>
                <td>{a.name}</td>
                <td>{a.born}</td>
                <td>{a.bookCount}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default Authors;
