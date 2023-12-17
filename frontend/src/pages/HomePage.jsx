import { Box } from '@mui/material';
import { NavBar, InputArticle, UserPost } from '../components';

// Dummy data
import { Post_test } from '../assets/images';
import { content, contentLong } from '../assets/contents/content';
import { useNavBarHeight } from '../hooks/useNavBarHeight';

import { useSelector } from 'react-redux';
import { selectProfileInfo } from '../redux/features/profileInfoSlice';

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
    const profile = useSelector(selectProfileInfo);

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
