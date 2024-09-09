import React, { useState } from 'react';
import PlacesAutocomplete from 'react-places-autocomplete';
import { useDispatch, useSelector } from 'react-redux';
import { saveMessage } from '../store/common';
import { createBuilding } from '../store/features/createBuilding/createBuildingAction';
import { AppDispatch, RootState } from '../store/store';
import { MapComponentProps } from '../types/interfaces';
import Floor from './Floors';
import NewFloorModal from './NewFloorModal';


const MapWorkComponent: React.FC<MapComponentProps> = ({
    address,
    setAddress,
    handleChange,
    handleSelect, }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    // const [floors, setFloors] = useState<Floor[]>([]);
    const dispatch = useDispatch<AppDispatch>();
    const token = useSelector((state: RootState) => state.auth.token);
    const buildingIdData = useSelector((state: RootState) => state.building?.buildingDataById);

    const handleModalClose = () => {
        setIsModalOpen(false);
    };

    const handleModalSubmit = (floorData: { name: string; order: number; image: File | null }) => {
        if (floorData.image) {
            const reader = new FileReader();
            reader.onloadend = () => {

            };
            reader.readAsDataURL(floorData.image);
        }
    };


    // const handleMapClick = (e: React.MouseEvent<HTMLImageElement>) => {
    //     if (placingMarker) {
    //         const { offsetX, offsetY } = e.nativeEvent;
    //         setPendingPosition({ top: offsetY, left: offsetX });
    //         setIsLabelModalOpen(true);
    //     }
    // };



    const handleCreateBuilding = async () => {
        if (address.trim() === "") {
            const Data = {
                message: 'Building name is required.',
                type: 'error'
            }
            dispatch(saveMessage(Data))
            return;
        }
        dispatch(createBuilding({ name: address, token }));
        setIsModalOpen(true);
    }

    return (
        <div className='w-full h-full ps-17'>
            {buildingIdData ? null :
                <div className="mb-4 flex flex-row w-[38%] gap-3">
                    <PlacesAutocomplete
                        value={address}
                        onChange={handleChange}
                    >
                        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                            <div className='w-full'>
                                <input
                                    {...getInputProps({
                                        placeholder: 'Enter Your Address Here ...',
                                        className: 'location-search-input outline-none w-[100%] md:h-[36px] ps-3',
                                    })}
                                />
                                <div className="autocomplete-dropdown-container">
                                    {loading && <div>Loading...</div>}
                                    {suggestions.map((suggestion) => {
                                        const className = suggestion.active
                                            ? 'bg-blue-500 text-black'
                                            : 'bg-white text-black';
                                        return (
                                            <div
                                                {...getSuggestionItemProps(suggestion, {
                                                    className: `p-2 cursor-pointer ${className} hover:bg-blue-100`,
                                                })}
                                                style={{
                                                    border: '1px solid #ddd',
                                                    borderRadius: '4px',
                                                    marginBottom: '2px',
                                                }}
                                            >
                                                <span>{suggestion.description}</span>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        )}
                    </PlacesAutocomplete>
                    <button
                        className="bg-[#47A96E] hover:bg-[#47A96E] text-white font-bold py-1 px-4 max-h-[35px] w-[80px] rounded"
                        onClick={() => {
                            handleCreateBuilding();
                            handleSelect(address);
                        }}
                    >
                        Create
                    </button>
                </div>
            }
            <NewFloorModal
                isOpen={isModalOpen}
                onClose={handleModalClose}
                onSubmit={handleModalSubmit}
                buildname={buildingIdData?.name}
                bookingId={1}
            />

            {buildingIdData?.id ? (
                <div className="flex flex-col lg:flex-row gap-8 lg:gap-20 justify-between items-center w-full h-[90vh]">
                    <Floor setAddress={setAddress} />
                </div>
            ) : null}
        </div>
    );
};

export default MapWorkComponent;
