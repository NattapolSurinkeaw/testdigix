import { Router } from "express"
import { UserController } from "../controllers/UserController"

const router = Router()
const userController = new UserController()

router.get('/users', userController.onGetUserAll)
router.post('/user', userController.onCreateUser)
router.delete('/user/:id', userController.onGetDeleteUserById)

export const userRoute = router
