import { Request, Response } from 'express';
import { User } from '../models/users';

export class UserController {
    onGetUserAll = async(req: Request, res: Response) => {
        const users = await User.findAll();

        res.status(200).json({
            status: true,
            message: "success",
            descriptin: "get users all ok",
            users: users
        });
    }
}