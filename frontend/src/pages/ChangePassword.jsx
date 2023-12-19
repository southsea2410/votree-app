import { Footer } from '../components';
import { colors } from '../styles';
import * as React from 'react';
import './../index.css';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { OutlinedInput, IconButton, InputAdornment, FormControl, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { fetchUserInfo } from '../utils/apiUtils';
import { useEffect } from 'react';

// Redux
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { selectIsLoggedIn } from '../redux/features/account/isLoggedInSlice';
import { updateIsLoggedIn } from '../redux/features/account/isLoggedInSlice';
import { updateIsSeller } from '../redux/features/account/isSellerSlice';
import { updateProfileInfo } from '../redux/features/profile/profileInfoSlice';
import { updateStoreInfo } from '../redux/features/profile/storeInfoSlice';
import { updateNavBarState } from '../redux/features/common/navBarStateSlice';

const textBoxStyle = {
    background: colors.primary,
    borderRadius: 8,
    border: '1px solid',
    boderColor: colors.green6,
    width: '100%'
};

const clusterStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '45px'
};

const textBoxClusterStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: 12
};

export default function ChangePassword() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [showCurrentPassword, setShowCurrentPassword] = React.useState(false);
    const [showNewPassword, setShowNewPassword] = React.useState(false);
    const [showRetypePassword, setShowRetypePassword] = React.useState(false);
    const [isLoggedIn, setIsLoggedIn] = React.useState(useSelector(selectIsLoggedIn));

    const handleClickShowCurrentPassword = () => setShowCurrentPassword(!showCurrentPassword);
    const handleMouseDownCurrentPassword = () => setShowCurrentPassword(!showCurrentPassword);
    const handleClickShowNewPassword = () => setShowNewPassword(!showNewPassword);
    const handleMouseDownNewPassword = () => setShowNewPassword(!showNewPassword);
    const handleClickShowRetypePassword = () => setShowRetypePassword(!showRetypePassword);
    const handleMouseDownRetypePassword = () => setShowRetypePassword(!showRetypePassword);

    const handleChangePassword = async (event) => {
        event.preventDefault();

        const form = event.target;
        const currentPassword = form.currentPassword.value;
        const newPassword = form.newPassword.value;
        const confirmPW = form.RePW.value;

        if (newPassword !== confirmPW) {
            alert('Passwords do not match!');
            return;
        }

        const jsonData = JSON.stringify({ currentPassword, newPassword });

        try {
            const response = await fetch('/api/v1/updatepw', {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: jsonData
            });

            if (response.ok) {
                alert('Password update successful!');
                navigate('/profile');
            } else {
                alert('Password update failed. Please try again.');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    useEffect(() => {
        async function fetchProfileInfo() {
            if (!isLoggedIn) {
                const { profile, store } = await fetchUserInfo();
                if (profile) {
                    setIsLoggedIn(true);
                    dispatch(updateProfileInfo(profile));
                    dispatch(updateIsLoggedIn(true));
                    if (store) {
                        dispatch(updateStoreInfo(store));
                        dispatch(updateIsSeller(true));
                    }
                } else {
                    dispatch(updateNavBarState(0));
                    navigate('/');
                }
            }
        }
        fetchProfileInfo();
    }, [isLoggedIn]);

    return (
        <div className="containerStyle">
            <div
                style={{
                    display: 'flex',
                    padding: '100px 100px',
                    justifyContent: 'space-around'
                }}>
                <div
                    style={{
                        width: 422,
                        height: 450,
                        border: '1px solid',
                        borderRadius: 7
                    }}>
                    <div style={{ ...clusterStyle, padding: '35px 35px' }}>
                        <div className="subtitle-extra-bold" style={{ color: colors.green6 }}>
                            Change Password
                        </div>
                        <form onSubmit={handleChangePassword} style={clusterStyle}>
                            <div
                                style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: 25,
                                    width: 364
                                }}>
                                <FormControl style={textBoxClusterStyle}>
                                    <OutlinedInput
                                        size="small"
                                        fullWidth
                                        placeholder="Current password"
                                        id="fullWidth"
                                        name="currentPassword"
                                        type={showCurrentPassword ? 'text' : 'password'}
                                        rows={1}
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={handleClickShowCurrentPassword}
                                                    onMouseDown={handleMouseDownCurrentPassword}
                                                    edge="end">
                                                    {showCurrentPassword ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                        label="Password"
                                        style={textBoxStyle}
                                    />
                                </FormControl>
                                <FormControl style={textBoxClusterStyle}>
                                    <OutlinedInput
                                        size="small"
                                        fullWidth
                                        placeholder="New password"
                                        id="fullWidth"
                                        name="newPassword"
                                        type={showNewPassword ? 'text' : 'password'}
                                        rows={1}
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={handleClickShowNewPassword}
                                                    onMouseDown={handleMouseDownNewPassword}
                                                    edge="end">
                                                    {showNewPassword ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                        label="Password"
                                        style={textBoxStyle}
                                    />
                                </FormControl>
                                <FormControl style={textBoxClusterStyle}>
                                    <OutlinedInput
                                        size="small"
                                        fullWidth
                                        placeholder="Re-type new password"
                                        id="fullWidth"
                                        name="RePW"
                                        type={showRetypePassword ? 'text' : 'password'}
                                        rows={1}
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={handleClickShowRetypePassword}
                                                    onMouseDown={handleMouseDownRetypePassword}
                                                    edge="end">
                                                    {showRetypePassword ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                        label="Password"
                                        style={textBoxStyle}
                                    />
                                </FormControl>
                            </div>
                            <Button style={{ width: '100%' }} type="submit">
                                Confirm
                            </Button>
                        </form>
                    </div>
                </div>
            </div>
            <div>
                <Footer className="footerStyle" />
            </div>
        </div>
    );
}
