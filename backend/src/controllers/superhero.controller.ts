import { NextFunction, Request, Response } from "express";

import { StatusCodesEnum } from "../enums/status-codes.enum";
import { ApiError } from "../errors/api.error";
import {
    ICreateSuperhero,
    ISuperhero,
    ISuperheroQuery,
} from "../interfaces/superhero.interface";
import { superheroService } from "../services/superhero.service";

class SuperheroController {
    public async getAll(req: Request, res: Response, next: NextFunction) {
        try {
            const query = req.query as any as ISuperheroQuery;
            const data = await superheroService.getAll(query);
            res.status(StatusCodesEnum.OK).json(data);
        } catch (err) {
            next(err);
        }
    }
    public async getById(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            const data = await superheroService.getById(id);
            res.status(StatusCodesEnum.OK).json(data);
        } catch (err) {
            next(err);
        }
    }
    public async create(req: Request, res: Response, next: NextFunction) {
        try {
            const body = req.body as ICreateSuperhero;
            const data = await superheroService.create(body);
            res.status(StatusCodesEnum.OK).json(data);
        } catch (error) {
            next(error);
        }
    }
    public async update(req: Request, res: Response, next: NextFunction) {
        try {
            const body = req.body as Partial<ISuperhero>;
            const { id } = req.params;
            const files = req.files as Express.Multer.File[] | undefined;

            let updatedHero = await superheroService.update(id, body);

            if (files && files.length > 0) {
                const imageUrls = files.map(
                    (file) => `/media/${file.filename}`,
                );

                for (const imageUrl of imageUrls) {
                    updatedHero = await superheroService.addImage(id, imageUrl);
                }
            }

            res.status(StatusCodesEnum.OK).json(updatedHero);
        } catch (e) {
            next(e);
        }
    }
    public async delete(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            const data = await superheroService.delete(id);
            res.status(StatusCodesEnum.OK).json(data);
        } catch (error) {
            next(error);
        }
    }
    public async uploadImages(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            const files = req.files as Express.Multer.File[];

            const imageUrls = files.map((file) => `/media/${file.filename}`);

            let superhero = await superheroService.getById(id);

            for (const imageUrl of imageUrls) {
                superhero = await superheroService.addImage(id, imageUrl);
            }

            res.status(StatusCodesEnum.OK).json(superhero);
        } catch (e) {
            next(e);
        }
    }

    public async removeImage(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            const { imageUrl } = req.body;
            if (!imageUrl) {
                throw new ApiError(
                    "imageUrl is required",
                    StatusCodesEnum.BED_REQUEST,
                );
            }

            const superhero = await superheroService.removeImage(id, imageUrl);

            res.status(StatusCodesEnum.OK).json(superhero);
        } catch (e) {
            next(e);
        }
    }
}
export const superheroController = new SuperheroController();
