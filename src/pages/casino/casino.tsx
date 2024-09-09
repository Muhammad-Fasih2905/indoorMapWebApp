import { useState } from 'react'
import { GoogleMap, useJsApiLoader, } from '@react-google-maps/api';
import SearchBar from '../../components/SearchBarInput';
import BuildingsModal from '../../components/BuildingModal';
import Layout from '../../components/Layout';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { Building } from '../../types/interfaces';
import 'leaflet/dist/leaflet.css';
import Floor from '../../components/Floors';

const containerStyle = {
    width: '100%',
    height: '100%',
};

const center = {
    lat: 51.505,
    lng: -0.09,
};
function Casino() {
    const [buildings, setBuildings] = useState<string[]>(['Tribune East Tower']);
    const [showAddressInput, setShowAddressInput] = useState(false);
    const BuildingData = useSelector((state: RootState) => state.building?.buildingData);
    const buildingIdData = useSelector((state: RootState) => state.building?.buildingDataById);
    const [filteredBuildings, setFilteredBuildings] = useState<Building[]>(BuildingData || [])
    const [selectedLocation, setSelectedLocation] = useState<{ lat: number, lng: number } | null>(null);
    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: 'YOUR_GOOGLE_MAPS_API_KEY',
    });
    const handleSearch = (query: string) => {
        const lowercasedQuery = query.toLowerCase();
        const filtered = BuildingData?.filter((building: Building) =>
            building.name.toLowerCase().includes(lowercasedQuery)
        ) || [];
        setFilteredBuildings(filtered);
    };


    const handleAddBuilding = () => {
        setBuildings([...buildings, 'New Building']);
    };

    const handleDeleteBuilding = (index: number) => {
        const updatedBuildings = buildings.filter((_, i) => i !== index);
        setBuildings(updatedBuildings);
    };

    const onMapClick = (e: google.maps.MapMouseEvent) => {
        console.log("Map clicked at", e.latLng?.lat(), e.latLng?.lng());
        if (e.latLng) {
            setSelectedLocation({ lat: e.latLng.lat(), lng: e.latLng.lng() });
            // setPickAddressPlace(true);
        }
    };
    if (!isLoaded) {
        return <div>Loading...</div>;
    }

    const floors = buildingIdData?.get_floors ?? []
    return (
        <Layout showHeader={true}>
            <div className="flex-1 relative flex">
                <GoogleMap
                    mapContainerStyle={containerStyle}
                    center={selectedLocation || center}
                    zoom={13}
                    onClick={onMapClick}
                    options={{
                        mapTypeId: 'hybrid',
                        disableDefaultUI: true,
                    }}
                >
                </GoogleMap>
                <div className={`absolute top-20 left-12 z-[1000] p-2 flex flex-row w-full ${buildingIdData ? 'md:w-[90%]' : "md:w-[63%]"}`}>
                    {floors.length > 0 ? null :
                        <div className={`w-full md:w-[50%] ${floors.length === 0 ? "lg:w-[51%]" : "lg:w-[65%]"} flex flex-row`}>
                            <div className="w-full md:w-[50%] lg:w-[58%] gap-8 flex flex-col">
                                <SearchBar onSearch={handleSearch} />
                                <BuildingsModal
                                    buildings={filteredBuildings}
                                    onAddBuilding={handleAddBuilding}
                                    onDeleteBuilding={handleDeleteBuilding}
                                    showAddressInput={showAddressInput}
                                    setShowAddressInput={setShowAddressInput}
                                />
                            </div>
                        </div>
                    }
                    {buildingIdData && floors?.length !== 0 ?
                        <div className="flex flex-col lg:flex-row gap-8 lg:gap-20 justify-between items-center w-full h-[80vh]">
                            <Floor floors={floors} />
                        </div>
                        : null}

                </div>
            </div>
        </Layout>
    )
}

export default Casino