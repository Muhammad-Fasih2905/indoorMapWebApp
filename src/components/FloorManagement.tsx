import React, { useState } from 'react';
import { FiEdit2, FiTrash2, FiPlus } from 'react-icons/fi';
import { FloorDataProps } from '../types/interfaces';
import FloorDeletionModal from './FloorDeletionModal';
import NewFloorModal from './NewFloorModal';
import EditFloorModal from './EditModalFile';
import { useBuilding } from '../useContext/GolobalContext';

const FloorManagement: React.FC<FloorDataProps> = ({ dataSend }) => {
    // const [selectedFloor, setSelectedFloor] = useState<string | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isNewFloorModalOpen, setIsNewFloorModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const { floorData } = useBuilding();
    const openModal = () => {
        // setSelectedFloor(floorName);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        // setSelectedFloor(null);
    };

    const confirmDeletion = () => {
        closeModal();
    };
    const openNewFloorModal = () => {
        setIsNewFloorModalOpen(true);
    };

    const closeNewFloorModal = () => {
        setIsNewFloorModalOpen(false);
    };
    const handleNewFloorSubmit = (newFloorData: { name: string; order: number; image: File | null }) => {
        console.log('New floor data:', newFloorData);
        closeNewFloorModal();
    };
    const openEditModal = () => {
        // setSelectedFloor(floorName);
        setIsEditModalOpen(true);
    };

    const closeEditModal = () => {
        setIsEditModalOpen(false);
        // setSelectedFloor(null);
    };

    const handleEditFloorSubmit = (editedFloorData: { name: string; order: number; image: File | null }) => {
        console.log('Edited floor data:', editedFloorData);
        closeEditModal();
    };
    return (
        <div className="w-full mx-auto">
            <div className="bg-gray-800 text-white p-3 text-lg font-semibold">
                Floors
            </div>
            <div className="bg-white border border-gray-300">
                <div className="flex items-center justify-between p-3 border-b border-gray-300">
                    <span className="text-gray-700">{dataSend}</span>
                    <div className="flex items-center space-x-3">
                        <button className="text-gray-500 hover:text-gray-700" onClick={() => openEditModal()}>
                            <FiEdit2 size={18} />
                        </button>
                        <button className="text-gray-500 hover:text-gray-700" onClick={() => openModal()}>
                            <FiTrash2 size={18} />
                        </button>
                    </div>
                </div>
                <button className="w-full bg-emerald-500 hover:bg-emerald-600 text-white p-2 flex items-center justify-between" onClick={openNewFloorModal}>
                    <span className="mr-1">New floor</span>
                    <FiPlus size={18} />
                </button>
            </div>
            <FloorDeletionModal
                isOpen={isModalOpen}
                onClose={closeModal}
                onConfirm={confirmDeletion}
            />
            <NewFloorModal
                isOpen={isNewFloorModalOpen}
                onClose={closeNewFloorModal}
                onSubmit={handleNewFloorSubmit}
            />
            <EditFloorModal
                isOpen={isEditModalOpen}
                onClose={() => setIsEditModalOpen(false)}
                onSubmit={handleEditFloorSubmit}
                floorData={floorData}
            />
        </div>
    );
};

export default FloorManagement;