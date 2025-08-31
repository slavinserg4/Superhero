import {
    ICreateSuperhero,
    ISuperhero,
    ISuperheroQuery,
} from "../interfaces/superhero.interface";
import { Superhero } from "../models/superhero.model";

class SuperheroRepository {
    public async getAll(
        query: ISuperheroQuery,
    ): Promise<[ISuperhero[], number]> {
        const skip = query.pageSize * (query.page - 1);
        return await Promise.all([
            Superhero.find().limit(query.pageSize).skip(skip).lean() as Promise<
                ISuperhero[]
            >,
            Superhero.countDocuments(),
        ]);
    }

    public async create(dto: ICreateSuperhero): Promise<ISuperhero> {
        return (await Superhero.create(dto)).toObject() as ISuperhero;
    }

    public async delete(id: string): Promise<ISuperhero | null> {
        const deleted = await Superhero.findByIdAndDelete(id).lean();
        return deleted as ISuperhero | null;
    }

    public async update(
        id: string,
        dto: Partial<ISuperhero>,
    ): Promise<ISuperhero | null> {
        const updateQuery: any = {};

        // Перебираємо всі поля з dto
        Object.keys(dto).forEach((key) => {
            const value = dto[key as keyof ISuperhero];
            // Якщо поле є масивом, використовуємо $addToSet
            if (Array.isArray(value)) {
                updateQuery[key] = { $addToSet: { [key]: { $each: value } } };
            } else {
                updateQuery[key] = value;
            }
        });

        return await (Superhero.findByIdAndUpdate(id, updateQuery, {
            new: true,
        }).lean() as Promise<ISuperhero | null>);
    }

    public async getById(id: string): Promise<ISuperhero | null> {
        return await (Superhero.findById(
            id,
        ).lean() as Promise<ISuperhero | null>);
    }

    public async addImage(
        id: string,
        image: string,
    ): Promise<ISuperhero | null> {
        return await (Superhero.findByIdAndUpdate(
            id,
            { $push: { images: image } },
            { new: true },
        ).lean() as Promise<ISuperhero | null>);
    }

    public async removeImage(
        id: string,
        imageUrl: string,
    ): Promise<ISuperhero | null> {
        return await (Superhero.findByIdAndUpdate(
            id,
            { $pull: { images: imageUrl } },
            { new: true },
        ).lean() as Promise<ISuperhero | null>);
    }
}

export const superheroRepository = new SuperheroRepository();
