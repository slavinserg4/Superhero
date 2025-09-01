import axios from "axios";
import { ISuperhero, ISuperheroResponse, ISuperheroUpdate } from "../models/ISuperhero";

const axiosInstance = axios.create({
    baseURL: "/api/superheroes"
});

export const superheroService = {
    getAll: async (page: number, pageSize: number): Promise<ISuperheroResponse> => {
        const { data } = await axiosInstance.get<ISuperheroResponse>(`?page=${page}&pageSize=${pageSize}`);
        return data;
    },

    getById: async (id: string): Promise<ISuperhero> => {
        const { data } = await axiosInstance.get(`/${id}`);
        return data;
    },

    create: async (data: any): Promise<ISuperhero> => {
        const { data: response } = await axiosInstance.post('/', data);
        return response;
    },

    uploadImages: async (id: string, formData: FormData): Promise<ISuperhero> => {
        const { data } = await axiosInstance.post(`/${id}/images`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        });
        return data;
    },

    update: async (id: string, updateData: ISuperheroUpdate): Promise<ISuperhero> => {
        const jsonData = {
            nickname: updateData.nickname,
            real_name: updateData.real_name,
            origin_description: updateData.origin_description,
            catch_phrase: updateData.catch_phrase,
            superpowers: updateData.superpowers
        };

        try {
            const { data } = await axiosInstance.put(`/${id}`, jsonData);

            if (updateData.images && updateData.images.length > 0) {
                const formData = new FormData();
                updateData.images.forEach((file: File) => {
                    formData.append('images', file);
                });

                const response = await axiosInstance.post(`/${id}/images`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
                return response.data;
            }

            return data;
        } catch (error: any) {
            if (error.response) {
                throw new Error(error.response.data.message || 'Помилка оновлення');
            }
            throw error;
        }
    },

    delete: async (id: string): Promise<void> => {
        await axiosInstance.delete(`/${id}`);
    },

    removeImage: async (id: string, imageUrl: string): Promise<void> => {
        await axiosInstance.delete(`/${id}/images`, {
            data: { imageUrl  }
        });
    }
};