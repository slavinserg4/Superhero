import { IBase } from "./base.interface";

export interface ISuperhero extends IBase {
    _id: string;
    nickname: string;
    real_name: string;
    origin_description: string;
    superpowers: string[];
    catch_phrase: string;
    images: string[];
}
export type ICreateSuperhero = Pick<
    ISuperhero,
    | "nickname"
    | "real_name"
    | "origin_description"
    | "superpowers"
    | "catch_phrase"
    | "images"
>;
export interface ISuperheroQuery {
    pageSize: number;
    page: number;
}
