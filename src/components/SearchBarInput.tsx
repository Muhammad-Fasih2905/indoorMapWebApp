import React from 'react';
import { SearchBarProps } from '../types/interfaces';

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
    return (
        <div className="w-full max-w-md">
            <div className="relative">
                <input
                    type="text"
                    className="w-full p-2 pl-10 pr-4 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
                    placeholder="Search casinos..."
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => onSearch(e.target.value)}
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                        <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                    </svg>
                </div>
            </div>
        </div>
    );
};

export default SearchBar;