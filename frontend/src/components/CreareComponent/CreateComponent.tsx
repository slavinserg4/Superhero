import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import { superheroService } from "../../services/api.service";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { superheroValidator } from "../../validators/superheroValidator";
import { useState } from "react";
import "./styleForCreate.css"

interface IFormInputs {
    nickname: string;
    real_name: string;
    origin_description: string;
    catch_phrase: string;
    superpowers: string[];
}

const CreateComponent = () => {
    const navigate = useNavigate();
    const [files, setFiles] = useState<File[]>([]);
    const [loading, setLoading] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
        watch
    } = useForm<IFormInputs>({
        resolver: joiResolver(superheroValidator.create),
        defaultValues: {
            nickname: '',
            real_name: '',
            origin_description: '',
            catch_phrase: '',
            superpowers: ['']
        }
    });

    const superpowers = watch('superpowers');

    const [error, setError] = useState<string>('');
    const MAX_FILE_SIZE = 5 * 1024 * 1024;

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setError('');
        const fileList = e.target.files;

        if (!fileList) {
            return;
        }

        const selectedFiles: File[] = Array.from(fileList);

        for (const file of selectedFiles) {
            if (!file.type.startsWith('image/')) {
                setError('Будь ласка, завантажуйте лише зображення');
                e.target.value = '';
                setFiles([]);
                return;
            }
            if (file.size > MAX_FILE_SIZE) {
                setError(`Файл ${file.name} завеликий. Максимальний розмір - 5MB. Поточний розмір: ${(file.size / (1024 * 1024)).toFixed(2)}MB`);
                e.target.value = '';
                setFiles([]);
                return;
            }
        }

        setFiles(selectedFiles);
    };


    const addSuperpower = () => {
        setValue('superpowers', [...superpowers, '']);
    };

    const removeSuperpower = (index: number) => {
        const newSuperpowers = superpowers.filter((_, i) => i !== index);
        setValue('superpowers', newSuperpowers);
    };

    const onSubmit = async (data: IFormInputs) => {
        setLoading(true);

        try {
            const filteredSuperpowers = data.superpowers.filter(power => power.trim() !== '');

            const heroData = {
                ...data,
                superpowers: filteredSuperpowers
            };

            const hero = await superheroService.create(heroData);

            if (files.length > 0) {
                const imageFormData = new FormData();
                files.forEach(file => {
                    imageFormData.append('images', file);
                });

                await superheroService.uploadImages(hero._id, imageFormData);
            }

            navigate('/');
        } catch (error) {
            if (axios.isAxiosError(error)) {
                const message = error.response?.data?.message || 'Something went wrong';
                console.error('Error:', message);
                alert('Creation error: ' + message);
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="create-superhero-container">
            <div className="create-form-wrapper">
                <h2 className="form-title">Create New Superhero</h2>

                <form onSubmit={handleSubmit(onSubmit)} className="create-form">
                    <div className="form-group">
                        <label className="form-label">Nickname</label>
                        <input
                            {...register("nickname")}
                            className="form-input"
                            placeholder="Enter superhero nickname"
                        />
                        {errors.nickname && (
                            <p className="error-message">{errors.nickname.message}</p>
                        )}
                    </div>

                    <div className="form-group">
                        <label className="form-label">Real Name</label>
                        <input
                            {...register("real_name")}
                            className="form-input"
                            placeholder="Enter real name"
                        />
                        {errors.real_name && (
                            <p className="error-message">{errors.real_name.message}</p>
                        )}
                    </div>

                    <div className="form-group">
                        <label className="form-label">Origin Description</label>
                        <textarea
                            {...register("origin_description")}
                            className="form-textarea"
                            placeholder="Describe the origin story"
                            rows={4}
                        />
                        {errors.origin_description && (
                            <p className="error-message">{errors.origin_description.message}</p>
                        )}
                    </div>

                    <div className="form-group">
                        <label className="form-label">Superpowers</label>
                        <div className="superpowers-container">
                            {superpowers.map((_, index) => (
                                <div key={index} className="superpower-input-group">
                                    <input
                                        {...register(`superpowers.${index}`)}
                                        className="form-input"
                                        placeholder="Enter superpower"
                                    />
                                    {superpowers.length > 1 && (
                                        <button
                                            type="button"
                                            onClick={() => removeSuperpower(index)}
                                            className="remove-power-btn"
                                        >
                                            ✕
                                        </button>
                                    )}
                                </div>
                            ))}
                            <button
                                type="button"
                                onClick={addSuperpower}
                                className="add-power-btn"
                            >
                                + Add Superpower
                            </button>
                        </div>
                    </div>

                    <div className="form-group">
                        <label className="form-label">Catch Phrase</label>
                        <input
                            {...register("catch_phrase")}
                            className="form-input"
                            placeholder="Enter catch phrase"
                        />
                        {errors.catch_phrase && (
                            <p className="error-message">{errors.catch_phrase.message}</p>
                        )}
                    </div>

                    <div className="form-group">
                        <label className="form-label">Images</label>
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
                                Choose Files
                            </label>
                        </div>
                        <p className="file-info">
                            Max file size: 1MB. Formats: JPG, PNG, GIF
                        </p>
                        {error && <p className="error-message">{error}</p>}
                        {files.length > 0 && (
                            <div className="selected-files">
                                <p className="selected-files-title">Selected files:</p>
                                <ul className="files-list">
                                    {files.map((file, index) => (
                                        <li key={index} className="file-item">
                                            {file.name} ({(file.size / (1024 * 1024)).toFixed(2)} MB)
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className={`submit-button ${loading ? 'loading' : ''}`}
                    >
                        {loading ? 'Creating...' : 'Create Superhero'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CreateComponent;