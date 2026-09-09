import { Router } from "express"
import { BookController } from "../controllers/BookController"
import { upload } from "../middlewares/upload"

const router = Router()
const bookController = new BookController()

router.get('/books', bookController.onGetBooks)
router.get('/book/:id', bookController.onGetBookById);
router.post('/book', upload.single('thumnail'), bookController.onCreateBook);
router.post('/book/:id', upload.single('thumnail'), bookController.onUpdateBook);
router.delete('/book/:id', bookController.onDeleteBook);

export const bookRoute = router