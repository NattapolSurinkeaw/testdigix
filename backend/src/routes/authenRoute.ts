import { Router } from "express"
import { AuthenController } from "../controllers/AuthenController"
import { upload } from "../middlewares/upload";

const router = Router()
const authenController = new AuthenController

router.post('/login', upload.single('profile_img'), authenController.onLogin)
router.post('/register', upload.single('profile_img'), authenController.onRegister)
router.post('/logout', upload.none(), authenController.onLogout)

export const authenRoute = router