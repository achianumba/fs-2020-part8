import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { ALL_AUTHORS } from "../queries";
import { EDIT_AUTHOR } from "../mutations";

const Authors = (props) => {
  const authors = useQuery(ALL_AUTHORS);
  const [editAuthor] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [
      { query: ALL_AUTHORS }
    ]
  });
  const [name, setName] = useState('');
  const [age, setAge] = useState('');

  if (!props.show) {
    return null;
  }

  if (authors.loading) {
    return <h2>Loading users...</h2>
  }

  const editBirthYear = async (e) => {
    e.preventDefault();

    if (!name) return alert('Please select an author');

    editAuthor({
      variables: {
        name,
        setBornTo: Number(age)
      }
    });

    setName('');
    setAge('');
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

      <h2>Set Birth year</h2>
      <form onSubmit={ editBirthYear }>
        <select value={ name } onChange={({ target }) => setName(target.value)}>
          <option value={null}>Select author</option>
          {authors &&
            authors.data.allAuthors.map(author => (
              <option key={author.name} value={ author.name }>{ author.name }</option>
            ))}
        </select>

        <label>Born</label>
        <input type="number" value={ age } onChange={ ({ target }) => setAge(target.value)} />
        <button type="submit">Update author</button>
      </form>
    </div>
  );
};

export default Authors;
