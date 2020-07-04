import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN } from '../mutations';

const Login = (props) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginUser] = useMutation(LOGIN, {
    ignoreResults: false,
    onCompleted: ({ login: { value } }) => {
      props.setToken(value);
      setUsername('');
      setPassword('');
      alert('logged in successfully');
    },
    onError: (err) => {
      alert(err.message);
    }
  });

  if (!props.show) {
    return <></>;
  }

  const login = async (e) => {
    e.preventDefault();
    if (username && password) {
      await loginUser({
        variables: {
          username,
          password
        }
      });
    }
  }

  return (
    <div>
      <form onSubmit={login}>
        <label>Username</label>
        <input type="text" id="username" value={username} onChange={e => setUsername(e.target.value)} />
        <label>Password</label>
        <input type="password" id="password" value={password} onChange={e => setPassword(e.target.value)} />
        <button type="submit">Login</button>
      </form>
    </div>
  )
}

export default Login;