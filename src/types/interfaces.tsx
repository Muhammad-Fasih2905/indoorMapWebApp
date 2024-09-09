import React from "react";
import { Suggestion } from 'react-places-autocomplete';

export interface ButtonProps {
    children: React.ReactNode;
    onClick?: () => void;
    className?: string;
    disabled?: boolean;
    type?: "button" | "submit" | "reset";
}
export interface TextInputProps {
    label?: string;
    placeholder: string;
    name: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    required?: boolean;
    className?: string;
    type?: string;
    conditionlabel?: boolean;
    endText?: string
}
export interface SidebarItemProps {
    icon?: React.ReactNode;
    label?: string;
    active?: boolean;
    to?: string;
}
export interface BuildingItemProps {
    name: string;
    onClick: (id: number) => void;
    id: number;
    onDelete: (id: number) => void;
}
export interface BuildingsModalProps {
    buildings: Building[];
    onAddBuilding: () => void;
    onDeleteBuilding: (index: number) => void;
    showAddressInput: boolean;
    setShowAddressInput: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface SearchBarProps {
    onSearch: (query: string) => void;
}

export interface MapComponentProps {
    setPickAddressPlace: React.Dispatch<React.SetStateAction<boolean>>;
    pickAddressPlace: boolean;
    address: string;
    setAddress: React.Dispatch<React.SetStateAction<string>>;
    handleChange: (newAddress: string) => void;
    handleSelect: (selectedAddress: string) => Promise<void>;
}

export interface RenderFuncProps {
    getInputProps: (options?: any) => any;
    suggestions: Suggestion[];
    getSuggestionItemProps: (suggestion: Suggestion, options?: any) => any;
    loading: boolean;
}
export interface NewFloorModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (floorData: { name: string; order: number; image: File | null }) => void;
    bookingId?: number;
    buildingId?: number;
    buildname?: string
}
export interface Floor {
    name: string;
    order: number;
    image: string;
}
export interface FloorDataProps {
    dataSend: string;
}

export interface FloorDeletionModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
}
export interface BuildingContextType {
    buildingName: string;
    setBuildingName: (name: string) => void;
    floorData: FloorData;
    setFloorData: React.Dispatch<React.SetStateAction<FloorData>>;
}
export interface EditFloorModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: { name: string; order: number; image: File | null }) => void;
    floorData?: FloorData | null;
}

export interface FloorData {
    name: string;
    order: number;
    image: File | null;
    imagePreview: string | null;
}
export interface FloorDataContextType {
    floorData: FloorData;
    setFloorData: React.Dispatch<React.SetStateAction<FloorData>>;
}

export interface LayoutProps {
    children: React.ReactNode;
    showHeader?: boolean;
    showHeaderText?: String;
    showPatrol?: boolean
}
export interface HeaderProps {
    showHeaderText?: String
    showPatrol?: boolean
}

export interface CasinoCardProps {
    item: any;
    hideContent?: boolean
}

export interface ApiCallProps {
    path: string;
    method: string;
    token?: string;
    body?: string;
    headers?: {
        'Content-Type': string;
        'X-CSRF-TOKEN': string;
    };
}
export interface LoginResponse {
    data: {
        token: string;
        user: any;
    };
}

export interface Building {
    name: string;
    id: number;
}