import { Request, Response } from 'express';
import { Author } from '../models/authors';
import fs from 'fs';
import path from 'path';

export class AuthorController {
    onGetAuthorAll = async(req: Request, res: Response) => {
        const authors = await Author.findAll();
        console.log(authors)
        return  res.status(200).json({
            status: true,
            message: "ok",
            descriptin: "get authors all ok",
            authors: authors
        });
    }

    onGetAuthorById = async (req: Request, res: Response) => {
        try {
            const id = req.params.id as string;
            const author = await Author.findByPk(id); 
            
            if (!author) {
                return res.status(404).json({
                    status: "error",
                    message: "not found author",
                });
            }

            return res.status(200).json({
                status: "success",
                message: "get authors ok",
                author: author
            });
        } catch (error) {
            return res.status(500).json({
                status: "error",
                message: "Internal server error",
                error: error instanceof Error ? error.message : error
            });
        }
    }

    onCreateAuthor = async (req: Request, res: Response) => {
        try {
            const { author_name, description, status_display } = req.body;
            
            if (!author_name) {
                return res.status(400).json({
                    status: "error",
                    message: "author_name is required",
                });
            }
           
            let photo_img = null;
            if (req.file) {
                photo_img = req.file.path.replace(/\\/g, "/");
            }
            console.log(req.file)
            const newAuthor = await Author.create({
                author_name,
                description,
                photo_img,
                status_display: status_display !== undefined ? status_display : true
            });

            return res.status(201).json({
                status: "success",
                message: "create author successfully",
                author: newAuthor
            });

        } catch (error) {
            return res.status(500).json({
                status: "error",
                message: "Internal server error",
                error: error instanceof Error ? error.message : error
            });
        }
    }

    onUpdateAuthor = async (req: Request, res: Response) => {
        try {
            const id = req.params.id as string;
            const { author_name, description, status_display } = req.body;

            const author = (await Author.findByPk(id)) as any; // ใช้ as any เพื่อให้เข้าถึง properties ของ model ได้สะดวก
            
            if (!author) {
                if (req.file) {
                    fs.unlinkSync(req.file.path);
                }
                return res.status(404).json({
                    status: "error",
                    message: "not found author",
                });
            }

            let updateData: any = {
                author_name: author_name !== undefined ? author_name : author.author_name,
                description: description !== undefined ? description : author.description,
                status_display: status_display !== undefined ? status_display : author.status_display,
                photo_img: author.photo_img // ค่าเดิม
            };

            if (req.file) {
                const newPhotoImg = req.file.path.replace(/\\/g, "/");

                // (ทางเลือกแนะนำ) ถ้ามีรูปเก่าอยู่แล้ว และรูปเก่าไม่ใช่ URL ภายนอก ให้ลบไฟล์รูปเก่าทิ้งเพื่อประหยัดพื้นที่
                if (author.photo_img && fs.existsSync(author.photo_img)) {
                    try {
                        fs.unlinkSync(author.photo_img);
                    } catch (err) {
                        console.error("Failed to delete old image:", err);
                    }
                }

                updateData.photo_img = newPhotoImg;
            }

            await author.update(updateData);

            return res.status(200).json({
                status: "success",
                message: "update author ok",
                author: author
            });
        } catch (error) {
            if (req.file) {
                try {
                    fs.unlinkSync(req.file.path);
                } catch (err) {}
            }

            return res.status(500).json({
                status: "error",
                message: "Internal server error",
                error: error instanceof Error ? error.message : error
            });
        }
    }

    onDeleteAuthor = async (req: Request, res: Response) => {
        try {
            const id = req.params.id as string;

            const author = await Author.findByPk(id);
            
            if (!author) {
                return res.status(404).json({
                    status: "error",
                    message: "not found author",
                });
            }

            await author.destroy();

            return res.status(200).json({
                status: "success",
                message: "delete author ok"
            });
        } catch (error) {
            return res.status(500).json({
                status: "error",
                message: "Internal server error",
                error: error instanceof Error ? error.message : error
            });
        }
    }
}