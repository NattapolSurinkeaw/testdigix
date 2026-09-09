import { Router } from "express"
import { AuthorController } from "../controllers/AuthorController"
import { upload } from "../middlewares/upload";

const router = Router()
const authorController = new AuthorController;

router.get('/authors', authorController.onGetAuthorAll);
router.get('/author/:id', authorController.onGetAuthorById);
router.post('/author', upload.single('photo_img'), authorController.onCreateAuthor);
router.post('/author/:id', upload.single('photo_img'), authorController.onUpdateAuthor);
router.delete('/author/:id', authorController.onDeleteAuthor); 

export const authorRoute = router