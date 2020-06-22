import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { SIGN_UP } from '../mutations';

const Signup = (props) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [favoriteGenre, setFavoriteGenre] = useState('');
  const [SignupUser] = useMutation(SIGN_UP, {
    ignoreResults: false,
    onCompleted: ({ createUser: { username } }) => {
      alert(`${username} registered successfully!`)
      
      setUsername('');
      setPassword('');
      setFavoriteGenre('');
    },
    onError: (err) => {
      alert(err.message);
    }
  });

  if (!props.show) {
    return <></>;
  }

  const signup = async (e) => {
    e.preventDefault();
    if (username && password && favoriteGenre) {
      await SignupUser({
        variables: {
          username,
          password,
          favoriteGenre
        }
      });
    }
  }

  return (
    <div>
      <form onSubmit={signup}>
        <label>Username</label>
        <input type="text" id="username" value={username} onChange={e => setUsername(e.target.value)} />
        <label>Password</label>
        <input type="password" id="password" value={password} onChange={e => setPassword(e.target.value)} />
        <label>Favorite Genre</label>
        <input type="text" id="favoriteGenre" value={favoriteGenre} onChange={e => setFavoriteGenre(e.target.value)} />
        <button type="submit">Signup</button>
      </form>
    </div>
  )
}

export default Signup;