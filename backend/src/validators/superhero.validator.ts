import joi from "joi";

import { RegexEnum } from "../enums/regex.enum";

export class SuperheroValidator {
    private static nickname = joi
        .string()
        .regex(RegexEnum.NICKNAME)
        .required()
        .messages({
            "string.pattern.base":
                "Nickname must contain only letters, numbers, spaces and hyphens (2-30 characters)",
            "string.empty": "Nickname is required",
            "any.required": "Nickname is required",
        });

    private static real_name = joi
        .string()
        .regex(RegexEnum.REAL_NAME)
        .required()
        .messages({
            "string.pattern.base":
                "Real name must contain only letters, spaces and hyphens (2-50 characters)",
            "string.empty": "Real name is required",
            "any.required": "Real name is required",
        });

    private static origin_description = joi
        .string()
        .regex(RegexEnum.DESCRIPTION)
        .required()
        .messages({
            "string.pattern.base":
                "Origin description must be between 10 and 1000 characters",
            "string.empty": "Origin description is required",
            "any.required": "Origin description is required",
        });

    private static superpowers = joi
        .array()
        .items(
            joi
                .string()
                .min(2)
                .max(100)
                .regex(/^[a-zA-Zа-яА-ЯіІїЇєЄґҐ0-9\s,-]{2,100}$/)
                .messages({
                    "string.pattern.base":
                        "Superpower must contain only letters, numbers, spaces and hyphens",
                    "string.min":
                        "Superpower must be at least 2 characters long",
                    "string.max": "Superpower must not exceed 100 characters",
                }),
        )
        .min(1)
        .required()
        .messages({
            "array.min": "At least one superpower is required",
            "array.base": "Superpowers must be an array",
            "any.required": "Superpowers are required",
        });

    private static catch_phrase = joi
        .string()
        .regex(RegexEnum.CATCH_PHRASE)
        .required()
        .messages({
            "string.pattern.base":
                "Catch phrase must be between 5 and 200 characters",
            "string.empty": "Catch phrase is required",
            "any.required": "Catch phrase is required",
        });

    public static create = joi.object({
        nickname: this.nickname.required(),
        real_name: this.real_name.required(),
        origin_description: this.origin_description.required(),
        superpowers: this.superpowers.required(),
        catch_phrase: this.catch_phrase.required(),
    });

    public static update = joi.object({
        nickname: this.nickname.optional(),
        real_name: this.real_name.optional(),
        origin_description: this.origin_description.optional(),
        superpowers: this.superpowers.optional(),
        catch_phrase: this.catch_phrase.optional(),
    });

    public static query = joi.object({
        pageSize: joi.number().min(1).max(100).default(5).required(),
        page: joi.number().min(1).default(1).required(),
    });
}
