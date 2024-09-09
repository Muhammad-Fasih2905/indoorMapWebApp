import { createContext, useState, useContext, ReactNode } from 'react';
import { BuildingContextType, FloorData } from '../types/interfaces';

const BuildingContext = createContext<BuildingContextType | undefined>(undefined);

export const BuildingProvider = ({ children }: { children: ReactNode }) => {
    const [buildingName, setBuildingName] = useState<string>('');
    const [floorData, setFloorData] = useState<FloorData>({
        name: '',
        order: 0,
        image: null,
        imagePreview: null,
    });

    return (
        <BuildingContext.Provider value={{ buildingName, setBuildingName, floorData, setFloorData }}>
            {children}
        </BuildingContext.Provider>
    );
};

export const useBuilding = () => {
    const context = useContext(BuildingContext);
    if (!context) {
        throw new Error('useBuilding must be used within a BuildingProvider');
    }
    return context;
};