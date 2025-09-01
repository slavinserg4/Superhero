import { useEffect, useState } from "react";
import { ISuperhero, ISuperheroResponse } from "../../models/ISuperhero";
import { superheroService } from "../../services/api.service";
import Pagination from "../Pagination/Pagination";
import Superhero from "../Superhero/Superhero";
import "./styleForSuperheroes.css"

const SuperHeroes = () => {
    const [superHeroes, setSuperHeroes] = useState<ISuperhero[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const pageSize = 5;

    useEffect(() => {
        const fetchHeroes = async () => {
            try {
                const response: ISuperheroResponse = await superheroService.getAll(currentPage, pageSize);
                setSuperHeroes(response.data);
                setTotalPages(response.totalPages);
            } catch (error) {
                console.error('Помилка при завантаженні героїв:', error);
            }
        };

        fetchHeroes().catch();
    }, [currentPage]);

    return (
        <div>
            <div className={"SuperHeroes"}>
             {superHeroes?.length > 0 ? (
                    superHeroes.map((hero) => (
                       <Superhero key={hero._id} hero={hero} />
                    ))
                    ) : (<p>Героїв не знайдено</p>)}
            </div>
            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
            />
        </div>
    );
};

export default SuperHeroes;