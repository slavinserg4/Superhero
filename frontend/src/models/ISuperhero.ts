export interface ISuperhero {
  _id: string;
  nickname: string;
  real_name: string;
  origin_description: string;
  superpowers: string[];
  catch_phrase: string;
  images: string[];
}

export interface ISuperheroUpdate {
  nickname?: string;
  real_name?: string;
  origin_description?: string;
  superpowers?: string[];
  catch_phrase?: string;
  images?: File[];
}

export interface ISuperheroResponse{
  totalItems: number;
  totalPages: number;
  prevPage: boolean;
  nextPage: boolean;
  data: ISuperhero[];
}