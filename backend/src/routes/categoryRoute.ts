import { Router } from "express"
import { CategoryController } from "../controllers/CategoryController"
import multer from 'multer';
const upload = multer();

const router = Router()
const categoryController = new CategoryController;

router.get('/category', categoryController.onGetCategoryAll);
router.get('/category/:id', categoryController.onGetCategoryById);
router.post('/category',upload.none(), categoryController.onCreateCategory);
router.put('/category/:id', categoryController.onUpdateCategory);
router.delete('/category/:id', categoryController.onDeleteCategory);

export const categoryRoute = router