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

export const updateExam = async (req: Request, res: Response) => {
    const examId = Number(req.params.id);

    try {
        const updatedExam = await examService.updateExam(examId, req.body);
        return res.status(200).json(updatedExam);
    } catch (error) {
        if (error instanceof Error) {
            return res.status(400).json({ message: error.message });
        }
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};

export const getExams = async (req: Request, res: Response) => {
    try {
        const user = req.user;
        if(!user) return res.status(400).json({ message: 'User not found' });
        const exams = await examService.getExams(user);
        return res.status(200).json(exams);
    } catch (error) {
        if (error instanceof Error) {
            return res.status(400).json({ message: error.message });
        }
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};