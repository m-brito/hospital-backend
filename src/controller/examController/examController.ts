import { Request, Response } from 'express';
import * as examService from '../../service/examService';

export const createExam = async (req: Request, res: Response) => {
    try {
        const exam = await examService.createExam(req.body);
        return res.status(201).json(exam);
    } catch (error) {
        if (error instanceof Error) {
            return res.status(400).json({ message: error.message });
        }
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}
