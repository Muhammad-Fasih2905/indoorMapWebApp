import React from 'react';
import { SidebarItemProps } from "../types/interfaces";
import { FaBuilding, } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { MdDashboard } from "react-icons/md";

const SidebarItem: React.FC<SidebarItemProps> = ({ icon, label, to, active = false }) => (
    <Link to={to || '#'} className={`flex flex-col items-center py-4 ${active ? 'bg-blue-600' : ''}`}>
        {icon}
        <span className="text-xs mt-1">{label}</span>
    </Link>
);
const Sidebar: React.FC = () => {
    return (
        <div className="w-20 bg-[#0D1B3E] text-white flex flex-col h-screen">
            <nav className="flex-1 flex flex-col py-10">
                {/* <SidebarItem icon={<FaClock />} label="Real time" /> */}
                {/* <SidebarItem icon={<FaChartBar />} label="Reports" /> */}

                {/* changed building name to casinos */}
                <SidebarItem to='/dashboard' icon={<MdDashboard />} label="Dashboard" />
                <SidebarItem to='/casino' icon={<FaBuilding />} label="Casinos" />
                {/* <SidebarItem icon={<FaUsers />} label="Users" /> */}
                {/* <SidebarItem to="/patrols" icon={<BsFillPeopleFill />} label="Patrols" /> */}
                {/* <SidebarItem to='/mapviewer' icon={<FaMap />} label="Map viewer" /> */}
            </nav>
        </div>
    );
};

export default Sidebar;
