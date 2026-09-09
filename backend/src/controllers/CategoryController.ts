import { Request, Response } from 'express';
import { Categories } from '../models/categories';

export class CategoryController {
    onGetCategoryAll = async(req: Request, res: Response) => {
        const categories = await Categories.findAll();
        return res.status(200).json({
            status: true,
            message: "ok",
            descriptin: "get category all ok",
            categories: categories
        });
    }

    onGetCategoryById = async (req: Request, res: Response) => {
        try {
            const id = req.params.id as string;
            const category = await Categories.findByPk(id);

            if (!category) {
                return res.status(404).json({
                    status: false,
                    message: "not found category"
                });
            }

            return res.status(200).json({
                status: true,
                message: "ok",
                category: category
            });
        } catch (error) {
            return res.status(500).json({
                status: false,
                message: "Internal server error",
                error: error instanceof Error ? error.message : error
            });
        }
    }

    onCreateCategory = async (req: Request, res: Response) => {
        try {
            const { cate_title, description, priority, status_display } = req.body;

            if (!cate_title || priority === undefined) {
                return res.status(400).json({
                    status: false,
                    message: "cate_title and priority are required"
                });
            }

            const newCategory = await Categories.create({
                cate_title,
                description,
                priority,
                status_display: status_display !== undefined ? status_display : true
            });

            return res.status(201).json({
                status: true,
                message: "create category successfully",
                category: newCategory
            });
        } catch (error) {
            return res.status(500).json({
                status: false,
                message: "Internal server error",
                error: error instanceof Error ? error.message : error
            });
        }
    }

    onUpdateCategory = async (req: Request, res: Response) => {
        try {
            const id = req.params.id as string;
            const { cate_title, description, priority, status_display } = req.body;

            const category = (await Categories.findByPk(id)) as any;

            if (!category) {
                return res.status(404).json({
                    status: false,
                    message: "not found category"
                });
            }

            await category.update({
                cate_title: cate_title !== undefined ? cate_title : category.cate_title,
                description: description !== undefined ? description : category.description,
                priority: priority !== undefined ? priority : category.priority,
                status_display: status_display !== undefined ? status_display : category.status_display
            });

            return res.status(200).json({
                status: true,
                message: "update category ok",
                category: category
            });
        } catch (error) {
            return res.status(500).json({
                status: false,
                message: "Internal server error",
                error: error instanceof Error ? error.message : error
            });
        }
    }

    onDeleteCategory = async (req: Request, res: Response) => {
        try {
            const id = req.params.id as string;
            const category = await Categories.findByPk(id);

            if (!category) {
                return res.status(404).json({
                    status: false,
                    message: "not found category"
                });
            }

            await category.destroy();

            return res.status(200).json({
                status: true,
                message: "delete category ok"
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