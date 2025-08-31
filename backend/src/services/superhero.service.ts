import { StatusCodesEnum } from "../enums/status-codes.enum";
import { ApiError } from "../errors/api.error";
import { IPaginatedResponse } from "../interfaces/paginated-response.interface";
import {
    ICreateSuperhero,
    ISuperhero,
    ISuperheroQuery,
} from "../interfaces/superhero.interface";
import { superheroRepository } from "../repository/superhero.repository";

class SuperheroService {
    public async getAll(
        query: ISuperheroQuery,
    ): Promise<IPaginatedResponse<ISuperhero>> {
        const [data, totalItems] = await superheroRepository.getAll(query);
        const totalPages = Math.ceil(totalItems / query.pageSize);
        return {
            totalItems,
            totalPages,
            prevPage: !!(query.page - 1),
            nextPage: query.page + 1 <= totalPages,
            data,
        };
    }
    public async create(dto: ICreateSuperhero): Promise<ISuperhero> {
        return await superheroRepository.create(dto);
    }
    public async update(
        id: string,
        dto: Partial<ISuperhero>,
    ): Promise<ISuperhero> {
        await this.getById(id);
        return await superheroRepository.update(id, dto);
    }
    public async delete(id: string): Promise<ISuperhero> {
        return await superheroRepository.delete(id);
    }
    public async getById(id: string): Promise<ISuperhero> {
        const hero = await superheroRepository.getById(id);
        if (!hero) {
            throw new ApiError("Hero not found", StatusCodesEnum.NOT_FOUND);
        }
        return hero;
    }
    public async addImage(id: string, image: string): Promise<ISuperhero> {
        return await superheroRepository.addImage(id, image);
    }
    public async removeImage(
        id: string,
        imageUrl: string,
    ): Promise<ISuperhero> {
        return await superheroRepository.removeImage(id, imageUrl);
    }
}
export const superheroService = new SuperheroService();
