import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your_super_secret_key';

// ขยาย Type ของ Request เพื่อให้เก็บข้อมูล payload ของ user ได้
export interface AuthenticatedRequest extends Request {
    user?: any;
}

export const authenticateToken = (
    req: AuthenticatedRequest, 
    res: Response, 
    next: NextFunction
) => {
    // 1. ดึง Authorization Header (รูปแบบ: "Bearer <token>")
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    // 2. ถ้าไม่มี Token ส่งมาด้วย
    if (!token) {
        return res.status(401).json({
            status: false,
            message: "Access denied. No token provided."
        });
    }

    try {
        // 3. ตรวจสอบความถูกต้องของ Token
        const decoded = jwt.verify(token, JWT_SECRET);
        
        // แนบข้อมูล user เข้าไปใน request เพื่อให้ Controller นำไปใช้ต่อได้
        req.user = decoded; 
        
        // ให้ผ่านไปยัง Route หรือ Middleware ถัดไป
        next(); 
    } catch (error) {
        return res.status(403).json({
            status: false,
            message: "Invalid or expired token."
        });
    }
};