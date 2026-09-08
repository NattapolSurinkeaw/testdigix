

export class BookController {
    OngetBooks = async (req: any, res: any) => {
        return res.status(200).json({
            status: true,
            message: "ok",
            descriptin: "get book all ok"
        });
    }
}