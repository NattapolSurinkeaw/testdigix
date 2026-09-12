import { Request, Response } from 'express';
import { Books } from '../models/books';
import fs from 'fs';
import path from 'path';

export class BookController {
    onGetBooks = async (req: Request, res: Response) => {
        try {
            const { categoryId, authorId } = req.query;

            const whereCondition: any = {};
            if (authorId) {
                whereCondition.author_id = authorId;
            }
            if (categoryId) {
                whereCondition.cate_id = categoryId;
            }

            const books = await Books.findAll({ where: whereCondition });

            return res.status(200).json({
                status: true,
                message: "ok",
                description: "get book all ok",
                books: books
            });
        } catch (error) {
            return res.status(500).json({
                status: false,
                message: "Internal server error",
                error: error instanceof Error ? error.message : error
            });
        }
    }

    onGetBookById = async (req: Request, res: Response) => {
        try {
            const id = req.params.id as string;
            const book = await Books.findByPk(id);

            if (!book) {
                return res.status(404).json({
                    status: false,
                    message: "not found book"
                });
            }

            return res.status(200).json({
                status: true,
                message: "ok",
                book: book
            });
        } catch (error) {
            return res.status(500).json({
                status: false,
                message: "Internal server error",
                error: error instanceof Error ? error.message : error
            });
        }
    }

    onCreateBook = async (req: Request, res: Response) => {
        try {
            const { title, description, author_id, cate_id, publish_year, status_display } = req.body;

            if (!title || !author_id || !cate_id || !publish_year) {
                if (req.file) {
                    fs.unlinkSync(req.file.path);
                }
                return res.status(400).json({
                    status: false,
                    message: "title, author_id, cate_id, and publish_year are required"
                });
            }

            let thumnail = null;
            if (req.file) {
                thumnail = `uploads/${path.basename(req.file.path)}`.replace(/\\/g, '/');
            }

            const newBook = await Books.create({
                title,
                description,
                author_id,
                cate_id,
                thumnail,
                publish_year,
                status_display: status_display !== undefined ? status_display : true
            });

            return res.status(201).json({
                status: true,
                message: "create book successfully",
                book: newBook
            });
        } catch (error) {
            if (req.file) {
                try {
                    fs.unlinkSync(req.file.path);
                } catch (err) {}
            }
            return res.status(500).json({
                status: false,
                message: "Internal server error",
                error: error instanceof Error ? error.message : error
            });
        }
    }

    onUpdateBook = async (req: Request, res: Response) => {
        try {
            const id = req.params.id as string;
            const { title, description, author_id, cate_id, publish_year, status_display } = req.body;

            const book = (await Books.findByPk(id)) as any;

            if (!book) {
                if (req.file) {
                    fs.unlinkSync(req.file.path);
                }
                return res.status(404).json({
                    status: false,
                    message: "not found book"
                });
            }

            let updateData: any = {
                title: title !== undefined ? title : book.title,
                description: description !== undefined ? description : book.description,
                author_id: author_id !== undefined ? author_id : book.author_id,
                cate_id: cate_id !== undefined ? cate_id : book.cate_id,
                publish_year: publish_year !== undefined ? publish_year : book.publish_year,
                status_display: status_display !== undefined ? status_display : book.status_display,
                thumnail: book.thumnail
            };

            if (req.file) {
                const newThumnail = `uploads/${path.basename(req.file.path)}`.replace(/\\/g, '/');

                if (book.thumnail && fs.existsSync(book.thumnail)) {
                    try {
                        fs.unlinkSync(book.thumnail);
                    } catch (err) {
                        console.error("Failed to delete old thumbnail:", err);
                    }
                }

                updateData.thumnail = newThumnail;
            }

            await book.update(updateData);

            return res.status(200).json({
                status: true,
                message: "update book ok",
                book: book
            });
        } catch (error) {
            if (req.file) {
                try {
                    fs.unlinkSync(req.file.path);
                } catch (err) {}
            }
            return res.status(500).json({
                status: false,
                message: "Internal server error",
                error: error instanceof Error ? error.message : error
            });
        }
    }

    onDeleteBook = async (req: Request, res: Response) => {
        try {
            const id = req.params.id as string;
            const book = (await Books.findByPk(id)) as any;

            if (!book) {
                return res.status(404).json({
                    status: false,
                    message: "not found book"
                });
            }

            if (book.thumnail && fs.existsSync(book.thumnail)) {
                try {
                    fs.unlinkSync(book.thumnail);
                } catch (err) {
                    console.error("Failed to delete thumbnail:", err);
                }
            }

            await book.destroy();

            return res.status(204).json({
                status: true,
                message: "delete book ok"
            });
        } catch (error) {
            return res.status(500).json({
                status: false,
                message: "Internal server error",
                error: error instanceof Error ? error.message : error
            });
        }
    }
}