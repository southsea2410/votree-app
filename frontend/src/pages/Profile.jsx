import * as React from 'react';
import { Fragment } from 'react';
import { NavBar, SumProfile, UserPost } from '../components';
import { Box, Button, Card, CardContent, Container, Divider } from '@mui/material';
import { useEffect } from 'react';
import { colors } from '../styles';
import { content, contentLong } from '../assets/contents/content';
import UpSellerDialog from '../components/profile/UpSellerDialog';
import { useNavigate, useParams } from 'react-router-dom';
import { useNavBarHeight } from '../hooks/useNavBarHeight';

// Redux
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { selectProfileInfo, updateProfileInfo } from '../redux/features/profile/profileInfoSlice';
import { selectStoreInfo, updateStoreInfo } from '../redux/features/profile/storeInfoSlice';
import { selectIsLoggedIn, updateIsLoggedIn } from '../redux/features/account/isLoggedInSlice';
import { updateNavBarState } from '../redux/features/common/navBarStateSlice';

// Constants
import { fieldNames, storeFieldNames } from '../constants';

// Utils
import { fetchUserInfo } from '../utils/apiUtils';
import { updateIsSeller } from '../redux/features/account/isSellerSlice';

const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    rowGap: '15px',
    backgroundColor: colors.secondary
};

// 6577d9852aeaa934ac6173f4
// 6577d9852aeaa934ac6173f5

export default function UserProfile() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    dispatch(updateNavBarState(2)); // state 2 is profile

    const profileInfoFromRedux = useSelector(selectProfileInfo);
    const storeInfoFromRedux = useSelector(selectStoreInfo);
    const [isLoggedIn, setIsLoggedIn] = React.useState(useSelector(selectIsLoggedIn));

    const [fullName, setFullName] = React.useState('Your full name');
    const [role, setRole] = React.useState('Your role');

    const [profileInfo, setProfileInfo] = React.useState(profileInfoFromRedux);
    const [storeInfo, setStoreInfo] = React.useState(storeInfoFromRedux);

    const { id } = useParams();

    useEffect(() => {
        async function fetchProfileInfo() {
            if (id === undefined || id === '') {
                if (!isLoggedIn) {
                    const { profile, store } = await fetchUserInfo();
                    if (profile) {
                        dispatch(updateProfileInfo(profile));
                        dispatch(updateIsLoggedIn(true));
                        setIsLoggedIn(true);
                        setFullName(profile.fullName);
                        setRole(profile.role.toLowerCase());
                        setProfileInfo(profile);
                        if (store) {
                            setStoreInfo(store);
                            dispatch(updateStoreInfo(store));
                            dispatch(updateIsSeller(true));
                        }
                    } else {
                        dispatch(updateNavBarState(0));
                        navigate('/');
                    }
                } else {
                    setFullName(profileInfo.fullName);
                    setRole(profileInfo.role);
                }
            } else {
                const data = await fetch('/api/v1/sellers/' + id, {
                    headers: { 'Content-Type': 'application/json' }
                });

                const arr = await data.json();
                const info = arr.data.seller;
                if (arr.data.seller) {
                    const profile = {
                        role: info.role || '',
                        avatar: info.avatar || '',
                        fullName: info.fullName || '',
                        dateOfBirth: info.dateOfBirth || '',
                        gender: info.gender || '',
                        phoneNumber: info.phoneNumber || '',
                        email: info.email || '',
                        address: info.address || '',
                        interest: info.interest || ''
                    };
                    setIsLoggedIn(true);
                    setProfileInfo(profile);
                    setFullName(profile.fullName);
                    setRole(profile.role.toLowerCase());
                    if (profile.role.toLowerCase() === 'seller') {
                        const store = {
                            storeEmail: info.sellerDetails.storeEmail || '',
                            storeLocation: info.sellerDetails.storeLocation || '',
                            storeName: info.sellerDetails.storeName || '',
                            storePhoneNumber: info.sellerDetails.storePhoneNumber || ''
                        };
                        setStoreInfo(store);
                    }
                } else {
                    navigate('/profile');
                }
            }
        }
        fetchProfileInfo();
    }, [id, isLoggedIn]);

    return (
        <div style={{ paddingTop: useNavBarHeight() }}>
            <Box className="navbar">
                <NavBar />
            </Box>
            <Container maxWidth="lg" sx={containerStyle}>
                <Container maxWidth="false" disableGutters>
                    <Card variant="outlined">
                        <CardContent
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                rowGap: '20px'
                            }}>
                            <Box
                                sx={{
                                    display: 'flex',
                                    flexWrap: 'wrap',
                                    justifyContent: 'space-between'
                                }}>
                                <div>{SumProfile({ fullName: fullName, role: role })}</div>
                                {role === 'seller' ? (
                                    <></>
                                ) : (
                                    <UpSellerDialog variant="filled">Up Seller</UpSellerDialog>
                                )}
                            </Box>
                            <Divider variant="slighter"></Divider>
                            <Box
                                sx={{
                                    display: 'flex',
                                    flexWrap: 'wrap',
                                    justifyContent: 'space-between',
                                    alignItems: 'flex-start'
                                }}>
                                <Box
                                    sx={{
                                        display: 'grid',
                                        gridTemplateColumns: '200px 400px',
                                        gridAutoRows: 'minmax(50px, auto)',
                                        rowGap: '10px',
                                        columnGap: '15px',
                                        alignItems: 'center'
                                    }}>
                                    {Object.keys(profileInfo).map((key) => {
                                        if (
                                            profileInfo[key] === undefined ||
                                            profileInfo[key] === null ||
                                            key == '_id' ||
                                            key == 'id' ||
                                            key == 'role' ||
                                            key == 'password' ||
                                            key == 'products' ||
                                            key == '__v' ||
                                            key == 'userName' ||
                                            key == 'isLoggedIn' ||
                                            key == 'avatar'
                                        )
                                            return null;

                                        return (
                                            <Fragment key={key}>
                                                <p className="subtitle-semi-bold-20" style={{ color: colors.green4 }}>
                                                    {fieldNames[key]}
                                                </p>
                                                <p className="content-medium-20-25">{profileInfo[key]}</p>
                                            </Fragment>
                                        );
                                    })}
                                </Box>
                                <Button variant="filled">Edit Profile</Button>
                            </Box>
                            <Divider variant="slighter"></Divider>
                            <Box>
                                {role === 'seller' ? (
                                    <Box
                                        sx={{
                                            display: 'grid',
                                            gridTemplateColumns: '200px 400px',
                                            gridAutoRows: 'minmax(50px, auto)',
                                            rowGap: '10px',
                                            columnGap: '15px',
                                            alignItems: 'center'
                                        }}>
                                        {Object.keys(storeInfo).map((key) => {
                                            if (
                                                storeInfo[key] === undefined ||
                                                storeInfo[key] === null ||
                                                key == '_id' ||
                                                key == 'id'
                                            )
                                                return null;

                                            return (
                                                <Fragment key={key}>
                                                    <p
                                                        className="subtitle-semi-bold-20"
                                                        style={{ color: colors.green4 }}>
                                                        {storeFieldNames[key]}
                                                    </p>
                                                    <p className="content-medium-20-25">{storeInfo[key]}</p>
                                                </Fragment>
                                            );
                                        })}
                                    </Box>
                                ) : (
                                    <Box></Box>
                                )}
                            </Box>
                            {role === 'seller' ? <Divider variant="slighter"></Divider> : <></>}
                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'space-between'
                                }}>
                                <p className="subtitle-extra-bold">Posts</p>
                                <Button variant="filled">Activity History</Button>
                            </Box>
                        </CardContent>
                    </Card>
                </Container>
                <UserPost content={content} />
                <UserPost content={contentLong} />
                <UserPost />
                <UserPost />
                <UserPost />
            </Container>
        </div>
    );
}
