import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../models/users';

const JWT_SECRET = process.env.JWT_SECRET || 'your_super_secret_key';

export interface AuthenticatedRequest extends Request {
    user?: any;
}

export const authenticateToken = async (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
) => {
    try {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];

        if (!token) {
            return res.status(401).json({
                status: false,
                message: "Access denied. No token provided."
            });
        }

        const decoded: any = jwt.verify(token, JWT_SECRET);

        if (!decoded || !decoded.username || !decoded.accessToken) {
            return res.status(403).json({
                status: false,
                message: "Invalid token payload."
            });
        }

        const user: any = await User.findOne({
            where: {
                username: decoded.username,
                access_token: token
            }
        });

        if (!user) {
            return res.status(403).json({
                status: false,
                message: "Token does not match any active session."
            });
        }

        req.user = decoded;
        next();
    } catch (error) {
        return res.status(403).json({
            status: false,
            message: "Invalid or expired token."
        });
    }
};
