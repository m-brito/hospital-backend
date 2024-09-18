"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const formatZodErrors = (error) => {
    return error.errors.map(err => ({
        field: err.path.join('.'),
        message: err.message,
        code: err.code
    }));
};
const validate = (schema) => (req, res, next) => {
    try {
        schema.parse(req.body);
        next();
    }
    catch (error) {
        if (error instanceof zod_1.ZodError) {
            const formattedErrors = formatZodErrors(error);
            return res.status(400).json({ errors: formattedErrors });
        }
        next(error);
    }
};
exports.default = validate;
