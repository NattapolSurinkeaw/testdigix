import { Request, Response } from 'express';

export class BookController {
    OngetBooks = async (req: Request, res: Response) => {
        return res.status(200).json({
            status: true,
            message: "ok",
            descriptin: "get book all ok"
        });
    }
}