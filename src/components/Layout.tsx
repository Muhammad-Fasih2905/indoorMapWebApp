import React from 'react';
import Sidebar from './SidebarItem';
import Header from './Header';
import { LayoutProps } from '../../src/types/interfaces';

const Layout: React.FC<LayoutProps> = ({ children, showHeaderText, showHeader = true, showPatrol = false }) => {
    return (
        <div className="flex flex-col md:flex-row h-screen">
            <Sidebar />
            <div className="flex-1 flex flex-col">
                {showHeader && <Header showHeaderText={showHeaderText} showPatrol={showPatrol} />}
                <div className="flex-1 relative flex">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default Layout;