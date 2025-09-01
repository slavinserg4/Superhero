import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import { superheroService } from '../../services/api.service';
import { superheroValidator } from '../../validators/superheroValidator';
import { ISuperheroUpdate } from '../../models/ISuperhero';
import "./styleForUpdate.css"

const UpdateSuperhero = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [files, setFiles] = useState<File[]>([]);
    const [currentImages, setCurrentImages] = useState<string[]>([]);
    const [error, setError] = useState<string>('');
    const [superpowers, setSuperpowers] = useState<string[]>([]);
    const [superpowersInput, setSuperpowersInput] = useState('');


    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
    } = useForm<ISuperheroUpdate>({
        resolver: joiResolver(superheroValidator.update)
    });

    useEffect(() => {
        const loadHero = async () => {
            if (!id) return;

            try {
                const hero = await superheroService.getById(id);
                setValue('nickname', hero.nickname);
                setValue('real_name', hero.real_name);
                setValue('origin_description', hero.origin_description);
                setValue('catch_phrase', hero.catch_phrase);
                setSuperpowers(hero.superpowers);
                setSuperpowersInput(hero.superpowers.join(', '));
                setCurrentImages(hero.images);
            } catch (err) {
                console.error('Помилка завантаження героя:', err);
                setError('Не вдалося завантажити дані героя');
            }
        };

        loadHero().catch();
    }, [id, setValue]);

    const handleSuperpowersChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = e.target.value;
        setSuperpowersInput(inputValue);

        const powers = inputValue.split(',').map(power => {
            const trimmedPower = power.trim();
            const cleanedPower = trimmedPower.replace(/[^a-zA-Zа-яА-ЯіїєґІЇЄҐ0-9\s-]/g, '');
            return cleanedPower;
        });

        setSuperpowers(powers.filter(power => power !== ''));
    };




    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const fileList = e.target.files;
        if (!fileList) return;
        setFiles(Array.from(fileList));
    };

    const handleImageDelete = async (imageUrl: string) => {
        try {
            await superheroService.removeImage(id!, imageUrl);
            setCurrentImages(prev => prev.filter(img => img !== imageUrl));
        } catch (err) {
            console.error('Помилка видалення зображення:', err);
            setError('Не вдалося видалити зображення');
        }
    };

    const onSubmit = async (data: ISuperheroUpdate) => {
        if (!id) return;

        setLoading(true);
        try {
            const heroData = {
                nickname: data.nickname,
                real_name: data.real_name,
                origin_description: data.origin_description,
                catch_phrase: data.catch_phrase,
                superpowers: superpowers
            };

            await superheroService.update(id, heroData);

            if (files.length > 0) {
                const formData = new FormData();
                files.forEach(file => {
                    formData.append('images', file);
                });
                await superheroService.uploadImages(id, formData);
            }

            navigate(`/details/${id}`);
        } catch (err: any) {
            console.error('Помилка оновлення:', err);
            setError(err.message || 'Не вдалося оновити дані героя');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="update-hero-container">
            <div className="update-form-wrapper">
                <h2 className="update-title">Edit Superhero</h2>

                {error && <div className="error-banner">{error}</div>}

                <form onSubmit={handleSubmit(onSubmit)} className="update-form">
                    <div className="form-group">
                        <label className="form-label">Nickname</label>
                        <input
                            {...register('nickname')}
                            className="form-input"
                            placeholder="Enter nickname"
                        />
                        {errors.nickname && <p className="error-message">{errors.nickname.message}</p>}
                    </div>

                    <div className="form-group">
                        <label className="form-label">Real Name</label>
                        <input
                            {...register('real_name')}
                            className="form-input"
                            placeholder="Enter real name"
                        />
                        {errors.real_name && <p className="error-message">{errors.real_name.message}</p>}
                    </div>

                    <div className="form-group">
                        <label className="form-label">Origin Description</label>
                        <textarea
                            {...register('origin_description')}
                            className="form-textarea"
                            placeholder="Describe the origin story"
                            rows={4}
                        />
                        {errors.origin_description &&
                            <p className="error-message">{errors.origin_description.message}</p>
                        }
                    </div>

                    <div className="form-group">
                        <label className="form-label">Superpowers</label>
                        <input
                            type="text"
                            value={superpowersInput}
                            onChange={handleSuperpowersChange}
                            className="form-input"
                            placeholder="Enter superpowers (e.g., Super-Strength, Flight)"
                        />
                        <small className="help-text">
                            Use only letters, numbers, spaces and hyphens. Separate powers with commas.
                        </small>
                        {errors.superpowers && <p className="error-message">{errors.superpowers.message}</p>}
                    </div>




                    <div className="form-group">
                        <label className="form-label">Catch Phrase</label>
                        <input
                            {...register('catch_phrase')}
                            className="form-input"
                            placeholder="Enter catch phrase"
                        />
                        {errors.catch_phrase && <p className="error-message">{errors.catch_phrase.message}</p>}
                    </div>

                    <div className="form-group">
                        <label className="form-label">Current Images</label>
                        <div className="images-grid">
                            {currentImages.map((image, index) => (
                                <div key={index} className="image-container">
                                    <img
                                        src={`/api${image}`}
                                        alt={`Image ${index + 1}`}
                                        className="hero-image"
                                        loading="lazy"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => handleImageDelete(image)}
                                        className="delete-image-btn"
                                    >
                                        ✕
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="form-group">
                        <label className="form-label">Add New Images</label>
                        <div className="file-upload-container">
                            <input
                                type="file"
                                multiple
                                accept="image/*"
                                onChange={handleFileChange}
                                className="file-input"
                                id="file-input"
                            />
                            <label htmlFor="file-input" className="file-input-label">
                                Choose Images
                            </label>
                        </div>
                        {files.length > 0 && (
                            <div className="selected-files">
                                <p>{files.length} file(s) selected</p>
                            </div>
                        )}
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className={`submit-button ${loading ? 'loading' : ''}`}
                    >
                        {loading ? 'Updating...' : 'Update Hero'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default UpdateSuperhero;