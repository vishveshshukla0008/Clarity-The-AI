import { body, validationResult, param } from "express-validator";
import AppError from "../utils/AppError.js";

const validator = (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        throw new AppError(400, "Validation Failed", errors.array());
    }

    next();
};


export const sendMessageValidation = [
    body("message").notEmpty().withMessage("message is required !").trim(),
    body("chatId").optional().customSanitizer((value) => value || null),
    body("model").notEmpty().withMessage("Please enter the model you want to use !"),
    validator
]




export const paramsChatIdValidation = [
    param("chatId").isMongoId().withMessage("Chat Id must be valid !"), validator
]

