import React, { useState } from 'react';

interface MarkerLabelModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (label: string) => void;
}

const MarkerLabelModal: React.FC<MarkerLabelModalProps> = ({ isOpen, onClose, onSubmit }) => {
    const [label, setLabel] = useState('');

    const handleSubmit = () => {
        onSubmit(label);
        handleClose(); 
    };

    const handleClose = () => {
        setLabel(''); 
        onClose(); 
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded shadow-lg">
                <h2 className="text-lg mb-4">Enter label for this POI:</h2>
                <input
                    type="text"
                    value={label}
                    onChange={(e) => setLabel(e.target.value)}
                    placeholder="Label"
                    className="w-full p-2 mb-4 border border-gray-300 rounded"
                />
                <div className="flex justify-end">
                    <button
                        onClick={onClose}
                        className="bg-gray-500 text-white py-1 px-4 rounded mr-2"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSubmit}
                        className="bg-blue-500 text-white py-1 px-4 rounded"
                    >
                        Add
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MarkerLabelModal;
