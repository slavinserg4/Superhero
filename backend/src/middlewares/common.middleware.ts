import { NextFunction, Request, Response } from "express";
import { ObjectSchema } from "joi";
import { isObjectIdOrHexString } from "mongoose";

import { StatusCodesEnum } from "../enums/status-codes.enum";
import { ApiError } from "../errors/api.error";

class CommonMiddleware {
    public isIdValidate(key: string) {
        return (req: Request, res: Response, next: NextFunction) => {
            try {
                const id = req.params[key];

                if (!isObjectIdOrHexString(id)) {
                    throw new ApiError(
                        `${key}: ${id} invalid Id`,
                        StatusCodesEnum.BED_REQUEST,
                    );
                }
                next();
            } catch (e) {
                next(e);
            }
        };
    }

    public validateBody(validator: ObjectSchema) {
        return async (req: Request, res: Response, next: NextFunction) => {
            try {
                // Перевіряємо чи тіло запиту не пусте
                if (!req.body || Object.keys(req.body).length === 0) {
                    throw new ApiError(
                        "Тіло запиту не може бути пустим",
                        StatusCodesEnum.BED_REQUEST,
                    );
                }

                const { error, value } = validator.validate(req.body, {
                    abortEarly: false,
                    allowUnknown: false,
                });

                if (error) {
                    throw new ApiError(
                        error.details
                            .map((detail) => detail.message)
                            .join(", "),
                        StatusCodesEnum.BED_REQUEST,
                    );
                }

                req.body = value;
                next();
            } catch (e: any) {
                if (e instanceof ApiError) {
                    next(e);
                } else {
                    next(new ApiError(e.message, StatusCodesEnum.BED_REQUEST));
                }
            }
        };
    }

    public query(validator: ObjectSchema) {
        return async (req: Request, res: Response, next: NextFunction) => {
            try {
                const value = await validator.validateAsync(req.query);
                (req as any).validatedQuery = value;
                next();
            } catch (e: any) {
                if (e.isJoi && e.details?.length) {
                    return next(
                        new ApiError(
                            e.details[0].message,
                            StatusCodesEnum.BED_REQUEST,
                        ),
                    );
                }
                next(e);
            }
        };
    }

    public isFileExists() {
        return (req: Request, res: Response, next: NextFunction) => {
            try {
                if (
                    !req.files ||
                    (Array.isArray(req.files) && req.files.length === 0)
                ) {
                    throw new ApiError(
                        "No file uploaded",
                        StatusCodesEnum.BED_REQUEST,
                    );
                }
                next();
            } catch (e) {
                next(e);
            }
        };
    }
}

export const commonMiddleware = new CommonMiddleware();
