import React, { useState } from 'react';
import { FloorDeletionModalProps } from '../types/interfaces';

const FloorDeletionModal: React.FC<FloorDeletionModalProps> = ({ isOpen, onClose, onConfirm }) => {
    const [isChecked, setIsChecked] = useState(false);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
                <div className="flex justify-between items-start mb-4">
                    <h2 className="text-lg font-semibold">Floor Deletion Confirmation</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                        ×
                    </button>
                </div>
                <p className="mb-4">
                    By removing this floor you will lose all its associated elements:
                </p>
                <ul className="list-disc pl-5 mb-4">
                    <li>floor plans</li>
                    <li>calibrations</li>
                    <li>POIs</li>
                    <li>events</li>
                    <li>geofences</li>
                </ul>
                <p className="mb-4">Are you sure?</p>
                <div className="flex items-center mb-4">
                    <input
                        type="checkbox"
                        id="confirmCheck"
                        checked={isChecked}
                        onChange={(e) => setIsChecked(e.target.checked)}
                        className="mr-2"
                    />
                    <label htmlFor="confirmCheck" className="text-sm">
                        Yes, I wish to proceed with the deletion of the floor and its associated elements
                    </label>
                </div>
                <div className="flex justify-end">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 bg-gray-300 text-gray-800 rounded mr-2 hover:bg-gray-400"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onConfirm}
                        disabled={!isChecked}
                        className={`px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 ${!isChecked && 'opacity-50 cursor-not-allowed'
                            }`}
                    >
                        Confirm
                    </button>
                </div>
            </div>
        </div>
    );
};

export default FloorDeletionModal;