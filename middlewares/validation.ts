import { ZodError } from 'zod';

const formatZodErrors = (error: ZodError) => {
    return error.errors.map(err => ({
        field: err.path.join('.'),
        message: err.message,
        code: err.code
    }));
};

const validate = (schema: any) => (req: any, res: any, next: any) => {
    try {
        schema.parse(req.body);
        next();
    } catch (error) {
        if (error instanceof ZodError) {
            const formattedErrors = formatZodErrors(error);
            return res.status(400).json({ errors: formattedErrors });
        }
        next(error);
    }
};

export default validate;
