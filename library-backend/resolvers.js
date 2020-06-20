const resolvers = {
    Query: {
      bookCount: () => books.length,
      authorCount: () => authors.length,
      allBooks: (root, args) => {
        //Return only books of the given genre and author
        if (args.genre && args.author) {
          return books.filter(
            (book) =>
              book.author === args.author && book.genres.includes(args.genre)
          );
        }
        //Return only books of the given genre
        if (args.genre) {
          return books.filter((book) => book.genres.includes(args.genre));
        }
        //Return only books of the given author
        if (args.author) {
          return books.filter((book) => book.author === args.author);
        }
  
        return books;
      },
      allAuthors: () => authors,
    },
    Author: {
      bookCount: (root) => {
        const count = books.filter((book) => root.name === book.author).length;
        return count;
      },
    },
    Book: {
      author: (root) => {
        console.log(root)
        return {
          id: root.id,
          name: root.author,
          born: authors.find(a => a.name === root.author).born
        }
      }
    },
    Mutation: {
      addBook(root, args) {
        const book = { ...args, id: uuid() };
        books = [...books, book];
        const userExists = authors.find((author) => author.name === book.author);
        if (!userExists) {
          authors = [...authors, { name: book.author, id: uuid() }];
        }
        return books.find((b) => b.id === book.id);
      },
      editAuthor(root, args) {
        let author = authors.find((a) => a.name === args.name);
        if (author) {
          author.born = args.setBornTo;
          const authorsDbUpdate = authors.filter((a) => a.name !== author.name);
          authors = [...authorsDbUpdate, author];
          return author;
        }
        return;
      },
    },
  };

  module.exports = resolvers;