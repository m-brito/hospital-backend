import { ZodError, ZodSchema } from 'zod';

const formatZodErrors = (error: ZodError) => {
    return error.errors.map(err => ({
        field: err.path.join('.'),
        message: err.message
    }));
};

const validate = (schema: ZodSchema) => (req: any, res: any, next: any) => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
        const formattedErrors = formatZodErrors(result.error);
        return res.status(400).json({ errors: formattedErrors });
    }
    next();
};

export default validate;
