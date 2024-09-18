import { NextFunction, Request, Response } from 'express';

import { User } from '../src/models/User';

declare global {
    namespace Express {
        interface Request {
            user?: User
        }
    }
}

export const checkRole = (roles: string[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const user = req.user;
        if (!roles.includes(user?.role ?? '')) {
            return res.status(403).json({ message: 'Access denied' });
        }
        next();
    };
};
