import joi from "joi";

export const superheroValidator = {
    create: joi.object({
        nickname: joi
            .string()
            .regex(/^[a-zA-Z0-9\s-]{2,30}$/)
            .required()
            .messages({
                "string.pattern.base": "Nickname must contain only Latin letters, numbers, spaces and hyphens (2-30 characters)",
                "string.empty": "Nickname is required",
                "any.required": "Nickname is required",
            }),

        real_name: joi
            .string()
            .regex(/^[a-zA-Z\s-]{2,50}$/)
            .required()
            .messages({
                "string.pattern.base": "Real name must contain only Latin letters, spaces and hyphens (2-50 characters)",
                "string.empty": "Real name is required",
                "any.required": "Real name is required",
            }),

        origin_description: joi
            .string()
            .regex(/^[a-zA-Z0-9\s,.!?-]{10,1000}$/)
            .required()
            .messages({
                "string.pattern.base": "Description must contain only Latin letters, numbers, spaces and punctuation (10-1000 characters)",
                "string.empty": "Origin description is required",
                "any.required": "Origin description is required",
            }),

        superpowers: joi
            .array()
            .items(
                joi
                    .string()
                    .required()
                    .min(2)
                    .max(100)
                    .regex(/^[a-zA-Z0-9\s,-]{2,100}$/)
                    .messages({
                        "string.pattern.base": "Superpower must contain only Latin letters, numbers, spaces and hyphens",
                        "string.min": "Superpower must be at least 2 characters",
                        "string.max": "Superpower must not exceed 100 characters",
                        "string.empty": "Origin description is required",
                        "any.required": "Origin description is required"
                    })
            )
            .min(1)
            .required()
            .messages({
                "array.min": "At least one superpower is required",
                "array.base": "Superpowers must be an array",
                "any.required": "Superpowers are required",
            }),

        catch_phrase: joi
            .string()
            .regex(/^[a-zA-Z0-9\s,.!?-]{5,200}$/)
            .required()
            .messages({
                "string.pattern.base": "Catch phrase must contain only Latin letters, numbers, spaces and punctuation (5-200 characters)",
                "string.empty": "Catch phrase is required",
                "any.required": "Catch phrase is required",
            })
    }),

    update: joi.object({
        nickname: joi
            .string()
            .regex(/^[a-zA-Z0-9\s-]{2,30}$/)
            .optional()
            .messages({
                "string.pattern.base": "Nickname must contain only Latin letters, numbers, spaces and hyphens (2-30 characters)",
            }),

        real_name: joi
            .string()
            .regex(/^[a-zA-Z\s-]{2,50}$/)
            .optional()
            .messages({
                "string.pattern.base": "Real name must contain only Latin letters, spaces and hyphens (2-50 characters)",
            }),

        origin_description: joi
            .string()
            .regex(/^[a-zA-Z0-9\s,.!?-]{10,1000}$/)
            .optional()
            .messages({
                "string.pattern.base": "Description must contain only Latin letters, numbers, spaces and punctuation (10-1000 characters)",
            }),

        superpowers: joi
            .array()
            .items(
                joi
                    .string()
                    .min(2)
                    .max(100)
                    .regex(/^[a-zA-Z0-9\s,-]{2,100}$/)
                    .messages({
                        "string.pattern.base": "Superpower must contain only Latin letters, numbers, spaces and hyphens",
                        "string.min": "Superpower must be at least 2 characters",
                        "string.max": "Superpower must not exceed 100 characters",
                    })
            )
            .min(1)
            .optional()
            .messages({
                "array.min": "At least one superpower is required",
                "array.base": "Superpowers must be an array",
            }),

        catch_phrase: joi
            .string()
            .regex(/^[a-zA-Z0-9\s,.!?-]{5,200}$/)
            .optional()
            .messages({
                "string.pattern.base": "Catch phrase must contain only Latin letters, numbers, spaces and punctuation (5-200 characters)",
            })
    })
};