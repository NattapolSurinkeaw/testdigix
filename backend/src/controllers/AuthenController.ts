import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from '../models/users';

const JWT_SECRET = process.env.JWT_SECRET || 'your_super_secret_key';

export class AuthenController {
    onRegister = async (req: Request, res: Response) => {
        try {
            const { username, password, email, display_name } = req.body;

            if (!username || !password || !email || !display_name) {
                return res.status(400).json({
                    status: false,
                    message: "กรุณากรอกข้อมูลให้ครบถ้วน (username, password, email, display_name)"
                });
            }

            const existingUser = await User.findOne({
                where: { username }
            });

            if (existingUser) {
                return res.status(400).json({
                    status: false,
                    message: "Username นี้ถูกใช้งานแล้ว"
                });
            }

            const hashedPassword = await bcrypt.hash(password, 10);

            const statusConfirm = 'confirmed';
            const status = 'active';

            const basePayload = {
                username,
                email
            };

            const innerToken = jwt.sign(basePayload, JWT_SECRET, { expiresIn: '1d' });

            const tokenPayload = {
                ...basePayload,
                accessToken: innerToken
            };

            const accessToken = jwt.sign(tokenPayload, JWT_SECRET, { expiresIn: '1d' });

            const newUser: any = await User.create({
                username,
                password: hashedPassword,
                email,
                display_name,
                access_token: accessToken,
                status_confirm: statusConfirm,
                status,
                profile_img: req.file ? req.file.path.replace(/\\/g, "/") : null // รองรับการอัปโหลดรูปโปรไฟล์ (ถ้ามี)
            });

            const userData = newUser.toJSON();
            delete userData.password;

            return res.status(201).json({
                status: true,
                message: "ลงทะเบียนสำเร็จ",
                token: accessToken,
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

    onLogin = async (req: Request, res: Response) => {
        try {
            const { username, password } = req.body;

            if (!username || !password) {
                return res.status(400).json({
                    status: false,
                    message: "กรุณากรอก Username และ Password"
                });
            }

            const user: any = await User.findOne({ where: { username } });

            if (!user) {
                return res.status(401).json({
                    status: false,
                    message: "Username หรือ Password ไม่ถูกต้อง"
                });
            }

            const isPasswordValid = await bcrypt.compare(password, user.password);

            if (!isPasswordValid) {
                return res.status(401).json({
                    status: false,
                    message: "Username หรือ Password ไม่ถูกต้อง"
                });
            }

            if (user.status !== 'active') {
                return res.status(403).json({
                    status: false,
                    message: "บัญชีของคุณถูกระงับการใช้งาน"
                });
            }

            const basePayload = {
                id: user.id,
                users_code: user.users_code,
                username: user.username,
                email: user.email,
            };

            const innerToken = jwt.sign(basePayload, JWT_SECRET, { expiresIn: '1d' });

            const tokenPayload = {
                ...basePayload,
                accessToken: innerToken
            };

            const newAccessToken = jwt.sign(tokenPayload, JWT_SECRET, { expiresIn: '1d' });

            await user.update({ access_token: newAccessToken });

            const userData = user.toJSON();
            delete userData.password;

            return res.status(200).json({
                status: true,
                message: "เข้าสู่ระบบสำเร็จ",
                token: newAccessToken,
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
}