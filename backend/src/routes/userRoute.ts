import { Router } from "express"
import { UserController } from "../controllers/UserController"
import { upload } from "../middlewares/upload";

const router = Router()
const userController = new UserController()

router.get('/books', userController.onGetUserAll)

export const userRoute = router