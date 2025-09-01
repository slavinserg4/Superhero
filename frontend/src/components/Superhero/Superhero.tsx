import { ISuperhero } from "../../models/ISuperhero";
import { FC } from "react";
import { useNavigate } from "react-router-dom";
import "./styleForSuperhero.css";

interface ISuperheroProps {
    hero: ISuperhero;
}

const Superhero: FC<ISuperheroProps> = ({ hero }) => {
    const navigate = useNavigate();
    const navigateToDetails = () => {
        navigate(`/details/${hero._id}`);
    };

    const hasImages = hero.images && hero.images.length > 0;

    return (
        <div className="superhero-card" onClick={navigateToDetails}>
            <div className="superhero-image-container">
                {hasImages ? (
                    <img
                        src={`/api${hero.images[0]}`}
                        alt={`Фото ${hero.nickname}`}
                        className="superhero-image"
                    />
                ) : (
                    <div className="superhero-image-placeholder">
                        no photo available
                    </div>
                )}
            </div>
            <div className="superhero-content">
                <h3 className="superhero-title">{hero.nickname}</h3>
            </div>
        </div>
    );
};

export default Superhero;