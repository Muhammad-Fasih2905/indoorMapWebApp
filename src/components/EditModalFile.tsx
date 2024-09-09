import React, { useState, useEffect } from 'react';
import { EditFloorModalProps } from '../types/interfaces';

const EditFloorModal: React.FC<EditFloorModalProps> = ({ isOpen, onClose, onSubmit, floorData }) => {
    const [name, setName] = useState<string>('');
    const [order, setOrder] = useState<number>(0);
    const [image, setImage] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);

    useEffect(() => {
        if (floorData) {
            setName(floorData.name || '');
            setOrder(floorData.order || 0);
            setImage(floorData.image || null);
            setImagePreview(floorData.imagePreview || null);
        }
    }, [floorData]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit({ name, order, image });
        onClose();
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImage(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-55 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl">
                <h2 className="text-2xl font-bold mb-4">Edit Floor {'N/A'}</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Name (maximum of 6 characters)</label>
                        <input
                            type="text"
                            maxLength={6}
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="mt-1 block w-full outline-none rounded-md border border-gray-300 shadow-sm h-[45px] ps-3"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Order *</label>
                        <input
                            type="number"
                            value={order}
                            onChange={(e) => setOrder(parseInt(e.target.value, 10))}
                            className="mt-1 block w-full rounded-md outline-none border rounded-md border-gray-300 shadow-sm h-[45px] ps-3"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Floor plan image *</label>
                        <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                            <div className="space-y-1 text-center">
                                {imagePreview ? (
                                    <img src={imagePreview} alt="Preview" className="mt-2 max-w-full h-48 object-contain" />
                                ) : (
                                    <>
                                        <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                                            <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                        <div className="flex text-sm text-gray-600">
                                            <label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
                                                <span>Upload a file</span>
                                                <input id="file-upload" name="file-upload" type="file" className="sr-only" onChange={handleImageChange} />
                                            </label>
                                            <p className="pl-1">or drag and drop</p>
                                        </div>
                                    </>
                                )}
                                <p className="text-xs text-gray-500">Supported formats: png, jpg<br />Maximum resolution: 4096x4096</p>
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-end space-x-2">
                        <button type="button" onClick={onClose} className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700">Cancel</button>
                        <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Update</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditFloorModal;
