import React, { useEffect, useState } from 'react';
import { BuildingItemProps, BuildingsModalProps } from '../types/interfaces';
import { AppDispatch, RootState } from '../store/store';
import { useDispatch, useSelector } from 'react-redux';
import { deleteBuildingId, getBuilding, getBuildingById } from '../store/features/createBuilding/createBuildingAction';
import { resetBuilding } from '../store/features/createBuilding/createBuildingSlice';
import { useNavigate } from 'react-router-dom';
import { saveMessage } from '../store/common';

const BuildingItem: React.FC<BuildingItemProps> = ({ name, id, onClick, onDelete }) => (
    <div className="flex justify-between items-center p-2 bg-white rounded-lg mb-3 mt-1" onClick={() => onClick(id)}>
        <span style={{ color: '#000' }}>{name}</span>
        <button onClick={(e) => {
            e.stopPropagation();
            onDelete(id);
        }} className="text-red-500 hover:text-red-700">
            <svg className="h-5 w-5" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                <path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
            </svg>
        </button>
    </div>
);

const BuildingsModal: React.FC<BuildingsModalProps> = ({  showAddressInput }) => {
    const BuildingData = useSelector((state: RootState) => state.building?.buildingData);
    console.log("BuildingData ===>", BuildingData)
    const dispatch = useDispatch<AppDispatch>();
    const token = useSelector((state: RootState) => state.auth?.token)
    const navigate = useNavigate()
    const [id, setId] = useState<number>(0)

    const handleAddBuilding = () => {
        navigate('/dashboard')
        dispatch(resetBuilding());
    };
    const handleItemClick = (id: number) => {
        dispatch(getBuildingById({ id, token }));
        setId(id)
    };
    const handleBuildingDelete = async (id: number) => {
        try {
            const res = await dispatch(deleteBuildingId({ id, token })).unwrap();
            if (res?.success === true) {
                const data = {
                    message: res?.message,
                    type: "success",
                };
                dispatch(saveMessage(data));
                dispatch(getBuilding({ token }));
            }
        } catch (error) {
            console.log(error)
            const errorMessage = {
                message: error,
                type: "error",
            };
            dispatch(saveMessage(errorMessage));
        }
    };


    useEffect(() => {
        dispatch(getBuilding({ token }));
        dispatch(getBuildingById({ id, token }));
    }, []);
    return (
        <div className="bg-[#0D1B3E] text-white p-4 rounded-lg w-90 ">
            <h2 className="text-lg font-bold mb-4">Your casinos ({BuildingData?.length})</h2>
            {showAddressInput ? (
                null
            ) : BuildingData.length === 0 ? (
                <div className="flex flex-col items-center justify-center mx-12 rounded-[8px] p-4 bg-[#fff] w-[200px]">
                    <svg className="h-12 w-12 mb-2 text-black" fill="white" stroke="#3442A7" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                    <p className="text-center text-[#000] weight-[500] text-[12px]">No casino yet, please use the button below to create one</p>
                </div>
            ) : (
                <div className="max-h-60 overflow-y-auto">
                    {BuildingData?.map((building, index) => (
                        <BuildingItem key={index} name={building?.name} id={building?.id} onClick={handleItemClick} onDelete={handleBuildingDelete} />
                    ))}
                </div>
            )}
            <button
                onClick={handleAddBuilding}
                className="mt-4 w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 gap-3 rounded flex flex-row items-center justify-center"
            >
                New casino.index.feature_name
                <span className="mr-2">+</span>
            </button>
        </div>
    );
};

export default BuildingsModal;