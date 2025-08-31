import { Model, model, Schema } from "mongoose";

import { ISuperhero } from "../interfaces/superhero.interface";

const superheroSchema = new Schema(
    {
        nickname: { type: String, required: true },
        real_name: { type: String, required: true },
        origin_description: { type: String, required: true },
        superpowers: { type: [String], required: true, default: [] },
        catch_phrase: { type: String, required: true },
        images: { type: [String], default: [] },
    },
    {
        timestamps: true,
        versionKey: false,
    },
);

type SuperheroModel = Model<ISuperhero>;

export const Superhero = model<ISuperhero, SuperheroModel>(
    "Superhero",
    superheroSchema,
);
