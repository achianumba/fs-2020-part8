import React, { useState, useEffect } from 'react';
import Authors from './components/Authors';
import Books from './components/Books';
import NewBook from './components/NewBook';
import Login from './components/Login';
import Signup from './components/Signup';
import Recommended from './components/Recommended';
import { useSubscription, useApolloClient } from '@apollo/client';
import { BOOK_ADDED } from './subscriptions';
import { ALL_BOOKS } from './queries';

const App = () => {
  const [page, setPage] = useState('authors');
  const [token, setToken] = useState(null);
  const client = useApolloClient();

  useEffect(() => {
    if (localStorage.token) {
      setToken(localStorage.token);
    }
  }, []);

  const updateCacheWith = (addedBook) => {
    const includedIn = (booksInStore, newBook) => {
      return booksInStore.map(book => book.id).includes(newBook.id);
    }

    const dataInStore = client.readQuery({ query: ALL_BOOKS });

    if (!includedIn(dataInStore.allBooks, addedBook)) {
      client.writeQuery({
        query: ALL_BOOKS,
        data: { allBooks : dataInStore.allBooks.concat(addedBook) }
      });
    }
  }

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const addedBook = subscriptionData.data.bookAdded;
      alert(`New book:\n"${addedBook.title}" has been added to the library`);
      updateCacheWith(addedBook)
    }
  });

  const logout = e => {
    setToken(null);
    localStorage.clear();
    client.resetStore();
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