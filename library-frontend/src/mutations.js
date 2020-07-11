import { gql } from '@apollo/client';

export const ADD_BOOK = gql`
mutation AddBook($title: String!, $author: String! $published: Int!, $genres: [String!]) {
        addBook(
            title: $title
            author: $author
            published: $published
            genres: $genres
        ) {
            title
        }
    }
`;

export const EDIT_AUTHOR = gql`
mutation EditAuthor($name: String!, $setBornTo: Int!) {
    editAuthor(name: $name setBornTo: $setBornTo) {
        born
    }
}
`;

export const LOGIN = gql`
mutation Login($username: String!, $password: String!) {
    login(username: $username password: $password) {
        value,
        favoriteGenre
    }
}
`;

export const SIGN_UP = gql`
mutation Signup($username: String!, $password: String!, $favoriteGenre: String!) {
        createUser(
            username: $username
            password: $password
            favoriteGenre: $favoriteGenre
        ) {
            username
        }
    }
`;