import { Box } from '@mui/material';
import { NavBar, InputArticle, UserPost } from '../components';
import { fetchUserInfo, fetchUserProducts } from '../utils/apiUtils';
import React from 'react';
import { useEffect } from 'react';

// Dummy data
import { Post_test, Product_test } from '../assets/images';
import { content, contentLong } from '../assets/contents/content';
import { useNavBarHeight } from '../hooks/useNavBarHeight';
import { useNavigate } from 'react-router-dom';

// Redux
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { selectIsLoggedIn } from '../redux/features/account/isLoggedInSlice';
import { selectProfileInfo } from '../redux/features/profile/profileInfoSlice';
import { updateProfileInfo } from '../redux/features/profile/profileInfoSlice';
import { updateIsLoggedIn } from '../redux/features/account/isLoggedInSlice';
import { updateStoreInfo } from '../redux/features/profile/storeInfoSlice';
import { updateIsSeller } from '../redux/features/account/isSellerSlice';
import { updateNavBarState } from '../redux/features/common/navBarStateSlice';
import { addProduct } from '../redux/features/product/productsSlice';

const homePageStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
    rowGap: '19px',
    paddingTop: '112px'
};

const postsStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    rowGap: '20px',
    paddingBottom: '50px'
};

export default function HomePage() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const profileInfoFromRedux = useSelector(selectProfileInfo);
    const [isLoggedIn, setIsLoggedIn] = React.useState(useSelector(selectIsLoggedIn));
    const [fullName, setFullName] = React.useState(profileInfoFromRedux.fullName);
    const [role, setRole] = React.useState(profileInfoFromRedux.role);

    useEffect(() => {
        async function fetchData() {
            // Fetch data
            if (!isLoggedIn) {
                const { profile, store } = await fetchUserInfo();
                if (profile) {
                    const { productsData } = await fetchUserProducts();
                    for (let i = 0; i < productsData.length; ++i) {
                        dispatch(addProduct({ id: productsData[i]._id, product: productsData[i] }));
                    }
                    dispatch(updateProfileInfo(profile));
                    dispatch(updateIsLoggedIn(true));
                    setIsLoggedIn(true);
                    setFullName(profile.fullName);
                    setRole(profile.role);
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
        fetchData();
    }, [isLoggedIn]);

    return (
        <Box
            id="homepage"
            sx={homePageStyle}
            style={{
                paddingTop: useNavBarHeight()
            }}>
            <Box className="navbar">
                <NavBar />
            </Box>
            <Box sx={{ alignSelf: 'center' }}>
                <InputArticle fullName={fullName} role={role} />
            </Box>
            <Box sx={postsStyle}>
                <UserPost content={content} image={Post_test} />
                <UserPost content={content} image={Product_test} />
                <UserPost content={content} />
                <UserPost content={contentLong} />
                <UserPost content={content} />
            </Box>
        </Box>
    );
}
