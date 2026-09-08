import { Router } from "express"
import 

const router = Router()
const authenController = new BookController()

router.get('/books', bookController.OngetBooks)

export const bookRoute = router