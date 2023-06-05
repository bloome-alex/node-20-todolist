import { z } from 'zod'

import Book from '../models/Books.js'

import { FetchBooksSchema, UpdateBookSchema, CreateBooksSchema, deleteBookSchema } from './booksServices.z.js'

export const fetchBooks : z.infer<typeof FetchBooksSchema> = async () => {
    return await Book.find({})
}

const BookSchema = z.instanceof(Book)

export const createBook : z.infer<typeof CreateBooksSchema> = async({
    author, title
}: {
    author: string;
    title: string;
}) => {
    const book : z.infer<typeof BookSchema> = new Book({author, title})
    return await book.save()
}

export const updateBook : z.infer<typeof UpdateBookSchema> = async (id: string, {
    author, title
}: {
    author?: string;
    title?: string;
}) => {
    return await Book.findByIdAndUpdate(id, {author, title}, {new: true})
}

export const deleteBook : z.infer<typeof deleteBookSchema> = async(id: string) => {
    return await Book.findByIdAndDelete(id)
}