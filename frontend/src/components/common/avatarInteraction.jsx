import * as React from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { useNavigate } from 'react-router-dom';

// Redux
import { useDispatch } from 'react-redux';
import { updateIsLoggedIn } from '../../redux/features/account/isLoggedInSlice';
import { updateIsSeller } from '../../redux/features/account/isSellerSlice';

const settings = ['Profile', 'Change password', 'Log out'];

function AvatarInteraction({ variant }) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [anchorElUser, setAnchorElUser] = React.useState(null);

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleSettingClick = (setting) => {
        handleCloseUserMenu();

        const handleLogout = async () => {
            try {
                const response = await fetch('api/v1/auth/logout', {
                    method: 'DELETE'
                });

                if (response.ok) {
                    navigate('/');
                    dispatch(updateIsLoggedIn(false));
                    dispatch(updateIsSeller(false));
                } else {
                    console.error('Logout request failed:', response.statusText);
                }
            } catch (error) {
                // Handle network errors or exceptions that occur during the logout process
                console.error('Error during logout:', error);
            }
        };

        // Perform different actions based on the selected setting
        if (setting === 'Profile') {
            navigate('/profile');
        } else if (setting === 'Log out') {
            handleLogout();
        } else if (setting === 'Change password') {
            navigate('/changepassword');
        }
    };

    return (
        <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Options">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar variant={variant}>N</Avatar>
                </IconButton>
            </Tooltip>
            <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right'
                }}
                keepMounted
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right'
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}>
                {settings.map((setting) => (
                    <MenuItem key={setting} onClick={() => handleSettingClick(setting)}>
                        <Typography textAlign="center">{setting}</Typography>
                    </MenuItem>
                ))}
            </Menu>
        </Box>
    );
}

export default AvatarInteraction;
