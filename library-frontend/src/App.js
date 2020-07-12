import React, { useState, useEffect } from 'react';
import Authors from './components/Authors';
import Books from './components/Books';
import NewBook from './components/NewBook';
import Login from './components/Login';
import Signup from './components/Signup';
import Recommended from './components/Recommended';

const App = () => {
  const [page, setPage] = useState('authors');
  const [token, setToken] = useState(null);

  useEffect(() => {
    if (localStorage.token) {
      setToken(localStorage.token);
    }
  }, []);

  const logout = e => {
    setToken(null);
    localStorage.clear();
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {token && <button onClick={() => setPage('recommended')}>recommended</button>}
        {token && <button onClick={() => setPage('add')}>add book</button>}
        <button onClick={() => token ? logout() : setPage('login')}>
          {!token ? 'login' : 'log out'}
        </button>
        {!token && <button onClick={() => setPage('signup')}>signup</button>}
      </div>

      <Authors
        show={page === 'authors'}
      />

      <Books
        show={page === 'books'}
      />

      <Recommended
        show={page === 'recommended'}
      />

      <NewBook
        show={page === 'add'}
      />

      <Login
        show={page === 'login'}
        setToken={setToken}
      />

      <Signup show={page === 'signup'} />
    </div>
  )
}

export default App