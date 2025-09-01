import { useNavigate, useParams } from "react-router-dom";
import { ISuperhero } from "../../models/ISuperhero";
import { useEffect, useState } from "react";
import { superheroService } from "../../services/api.service";
import "./styleForSuperhero.css";

const SuperheroDetails = () => {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const [hero, setHero] = useState<ISuperhero | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [activeImage, setActiveImage] = useState(0);

    useEffect(() => {
        const fetchHeroDetails = async () => {
            if (!id) {
                setError("ID not found");
                return;
            }

            try {
                setLoading(true);
                const response = await superheroService.getById(id);
                setHero(response);
            } catch (err) {
                console.error('Error loading hero:', err);
                setError("Error loading hero data");
            } finally {
                setLoading(false);
            }
        };

        fetchHeroDetails().catch();
    }, [id]);

    if (loading) {
        return <div className="loading-spinner">Loading...</div>;
    }

    if (error) {
        return <div className="error-message">Error: {error}</div>;
    }

    if (!hero) {
        return <div className="not-found">Hero not found</div>;
    }

    return (
        <div className="hero-details-container">
            <div className="hero-header">
                <h1>{hero.nickname}</h1>
                <button
                    className="edit-button"
                    onClick={() => navigate(`/edit/${id}`)}
                >
                    Edit Hero
                </button>
            </div>

            <div className="hero-content">
                <div className="hero-images-section">
                    <div className="main-image">
                        <img
                            src={`/api${hero.images[activeImage]}`}
                            alt={`${hero.nickname} main`}
                        />
                    </div>
                    <div className="image-thumbnails">
                        {hero.images.map((image, index) => (
                            <img
                                key={index}
                                src={`/api${image}`}
                                alt={`${hero.nickname} thumbnail ${index + 1}`}
                                className={activeImage === index ? 'active' : ''}
                                onClick={() => setActiveImage(index)}
                            />
                        ))}
                    </div>
                </div>

                <div className="hero-info">
                    <div className="info-card">
                        <h2>Hero Details</h2>
                        <div className="info-item">
                            <span className="label">Real Name:</span>
                            <span className="value">{hero.real_name}</span>
                        </div>
                        <div className="info-item">
                            <span className="label">Catch Phrase:</span>
                            <span className="value">{hero.catch_phrase}</span>
                        </div>
                        <div className="info-item">
                            <span className="label">Origin:</span>
                            <p className="value description">{hero.origin_description}</p>
                        </div>
                        <div className="info-item">
                            <span className="label">Superpowers:</span>
                            <div className="powers-list">
                                {hero.superpowers.map((power, index) => (
                                    <span key={index} className="power-tag">
                                        {power}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SuperheroDetails;