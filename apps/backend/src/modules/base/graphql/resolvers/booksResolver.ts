import { z } from 'zod'

import { ResolversSchema } from './booksResolver.z.js';

import { fetchBooks, createBook, updateBook, deleteBook } from '../../services/booksServices.js'

const resolvers : z.infer<typeof ResolversSchema> = {
    Query: {
        books: fetchBooks,
    },
    Mutation: {
      createBook: async(_:unknown, {input: {author, title} }: {input: {author:string, title:string}}) => {
        return await createBook({author, title})
      },
      updateBook: async(_:unknown, {input: {id, author, title} }: {input: {id:string, author:string, title:string}}) => {
        return await updateBook(id, {author, title})
      },
      deleteBook: async(_:unknown, {input: {id} }: {input: {id:string}}) => {
        return await deleteBook(id)
      },
    }
};

export default resolvers