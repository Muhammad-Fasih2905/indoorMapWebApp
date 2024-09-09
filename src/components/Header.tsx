import React from 'react'
import { HeaderProps } from '../types/interfaces';
import { RootState } from '../store/store';
import { useSelector } from 'react-redux';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useNavigate } from 'react-router-dom';

const Header: React.FC<HeaderProps> = ({ showPatrol }) => {
    const BuildingName = useSelector((state: RootState) => state.building?.buildingDataById);
    const { userData } = useSelector((state: RootState) => state?.auth);
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const navigation = useNavigate()
    // const dispatch = useDispatch()
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        // dispatch(logout());
        localStorage.removeItem('authToken');
        handleClose();
        navigation('/')

    };
    const getInitials = (name: string) => {
        const names = name.split(' ');
        if (names.length > 1) {
            return names[0][0] + names[1][0];
        } else {
            return names[0][0];
        }
    };

    const userName = userData?.name || 'User';
    const userInitials = getInitials(userName);
    return (
        <header className="bg-white shadow-md">
            <div className="px-4 py-3 flex items-center justify-between w-full">
                <div className="flex items-start">
                    <h1 className="text-xl font-bold">{BuildingName?.name || ""}</h1>
                </div>
                <div className="flex items-center space-x-4">
                    {showPatrol &&
                        <button
                            className="bg-[#408CB5] hover:bg-[#408CB5] text-white font-bold py-1 px-4 h-[80%] w-[80px] rounded"
                        >
                            Create
                        </button>
                    }
                    <Avatar
                        alt={userName}
                        sx={{ cursor: 'pointer', bgcolor: '#47A96E', color: 'white' }}
                        onClick={handleClick}
                    >
                        {userInitials}
                    </Avatar>
                    <Menu
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        sx={{ mt: 2 }}
                    >
                        <MenuItem onClick={handleLogout}>Logout</MenuItem>
                    </Menu>
                </div>
            </div>
        </header>
    )
}

export default Header