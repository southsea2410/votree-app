import { Box } from '@mui/material';
import { NavBar, InputArticle, UserPost } from '../components';
import { fetchUserInfo } from '../utils/apiUtils';
import React from 'react';
import { useEffect } from 'react';

// Dummy data
import { Post_test } from '../assets/images';
import { content, contentLong } from '../assets/contents/content';
import { useNavBarHeight } from '../hooks/useNavBarHeight';
import { useNavigate } from 'react-router-dom';

// Redux
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { selectIsLoggedIn } from '../redux/features/account/isLoggedInSlice';
import { updateProfileInfo } from '../redux/features/profile/profileInfoSlice';
import { updateIsLoggedIn } from '../redux/features/account/isLoggedInSlice';
import { updateStoreInfo } from '../redux/features/profile/storeInfoSlice';
import { updateIsSeller } from '../redux/features/account/isSellerSlice';
import { updateNavBarState } from '../redux/features/common/navBarStateSlice';

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
    rowGap: '20px'
};

export default function HomePage() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [isLoggedIn, setIsLoggedIn] = React.useState(useSelector(selectIsLoggedIn));

    useEffect(() => {
        async function fetchData() {
            // Fetch data
            if (!isLoggedIn) {
                const { profile, store } = await fetchUserInfo();
                if (profile) {
                    dispatch(updateProfileInfo(profile));
                    dispatch(updateIsLoggedIn(true));
                    setIsLoggedIn(true);
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
                <InputArticle />
            </Box>
            <Box sx={postsStyle}>
                <UserPost content={content} image={Post_test} />
                <UserPost content={content} />
                <UserPost content={content} />
                <UserPost content={contentLong} />
                <UserPost content={content} />
            </Box>
        </Box>
    );
}
