import { Model, model, Schema } from "mongoose";

import { ISuperhero } from "../interfaces/superhero.interface";

const superheroSchema = new Schema(
    {
        nickname: { type: String, required: true },
        real_name: { type: String, required: true },
        origin_description: { type: String, required: true },
        superpowers: {
            type: [String],
            required: true,
            validate: {
                validator: function (v: string[]) {
                    return (
                        v &&
                        v.length > 0 &&
                        v.every(
                            (power) =>
                                power.length >= 2 &&
                                power.length <= 100 &&
                                /^[a-zA-Zа-яА-ЯіІїЇєЄґҐ0-9\s,-]{2,100}$/.test(
                                    power,
                                ),
                        )
                    );
                },
            },
        },

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
