let authors = [
    {
      name: "Robert Martin",
      id: "afa51ab0-344d-11e9-a414-719c6709cf3e",
      born: 1952,
    },
    {
      name: "Martin Fowler",
      id: "afa5b6f0-344d-11e9-a414-719c6709cf3e",
      born: 1963,
    },
    {
      name: "Fyodor Dostoevsky",
      id: "afa5b6f1-344d-11e9-a414-719c6709cf3e",
      born: 1821,
    },
    {
      name: "Joshua Kerievsky", // birthyear not known
      id: "afa5b6f2-344d-11e9-a414-719c6709cf3e",
    },
    {
      name: "Sandi Metz", // birthyear not known
      id: "afa5b6f3-344d-11e9-a414-719c6709cf3e",
    },
  ];
  
  let books = [
    {
      title: "Clean Code",
      published: 2008,
      author: "Robert Martin",
      id: "afa5b6f4-344d-11e9-a414-719c6709cf3e",
      genres: ["refactoring"],
    },
    {
      title: "Agile software development",
      published: 2002,
      author: "Robert Martin",
      id: "afa5b6f5-344d-11e9-a414-719c6709cf3e",
      genres: ["agile", "patterns", "design"],
    },
    {
      title: "Refactoring, edition 2",
      published: 2018,
      author: "Martin Fowler",
      id: "afa5de00-344d-11e9-a414-719c6709cf3e",
      genres: ["refactoring"],
    },
    {
      title: "Refactoring to patterns",
      published: 2008,
      author: "Joshua Kerievsky",
      id: "afa5de01-344d-11e9-a414-719c6709cf3e",
      genres: ["refactoring", "patterns"],
    },
    {
      title: "Practical Object-Oriented Design, An Agile Primer Using Ruby",
      published: 2012,
      author: "Sandi Metz",
      id: "afa5de02-344d-11e9-a414-719c6709cf3e",
      genres: ["refactoring", "design"],
    },
    {
      title: "Crime and punishment",
      published: 1866,
      author: "Fyodor Dostoevsky",
      id: "afa5de03-344d-11e9-a414-719c6709cf3e",
      genres: ["classic", "crime"],
    },
    {
      title: "The Demon ",
      published: 1872,
      author: "Fyodor Dostoevsky",
      id: "afa5de04-344d-11e9-a414-719c6709cf3e",
      genres: ["classic", "revolution"],
    },
  ];

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