import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from '../models/users';

const JWT_SECRET = process.env.JWT_SECRET || 'your_super_secret_key';

export class UserController {
    onGetUserAll = async (req: Request, res: Response) => {
        try {
            const users = await User.findAll();
            return res.status(200).json({
                status: true,
                message: "get users all ok",
                users: users
            });
        } catch (error) {
            return res.status(500).json({
                status: false,
                message: "Internal server error",
                error: error instanceof Error ? error.message : error
            });
        }
    }

    onCreateUser = async (req: Request, res: Response) => {
        try {
            const { username, password, email, display_name, status_confirm, status } = req.body;

            if (!username || !password || !email || !display_name) {
                return res.status(400).json({
                    status: false,
                    message: "username, password, email และ display_name จำเป็นต้องกรอก"
                });
            }

            const existing = await User.findOne({ where: { username } });
            if (existing) {
                return res.status(400).json({
                    status: false,
                    message: "Username นี้ถูกใช้งานแล้ว"
                });
            }

            const hashedPassword = await bcrypt.hash(password, 10);
            const userStatusConfirm = status_confirm || 'confirmed';
            const userStatus = status || 'active';

            const tokenPayload = { username, email };
            const accessToken = jwt.sign(tokenPayload, JWT_SECRET, { expiresIn: '1d' });

            const newUser: any = await User.create({
                username,
                password: hashedPassword,
                email,
                display_name,
                access_token: accessToken,
                status_confirm: userStatusConfirm,
                status: userStatus,
                profile_img: req.file ? req.file.path.replace(/\\/g, "/") : null
            });

            const userData = newUser.toJSON();
            delete userData.password;

            return res.status(201).json({
                status: true,
                message: "create user successfully",
                user: userData
            });
        } catch (error) {
            return res.status(500).json({
                status: false,
                message: "Internal server error",
                error: error instanceof Error ? error.message : error
            });
        }
    }

    onGetDeleteUserById = async (req: Request, res: Response) => {
        try {
            const id = req.params.id as string;
            const user = await User.findByPk(id);
            if (!user) {
                return res.status(404).json({
                    status: false,
                    message: "not found user"
                });
            }
            await user.destroy();
            return res.status(200).json({
                status: true,
                message: "delete user ok"
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
