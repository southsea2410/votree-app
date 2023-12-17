import { Fragment } from 'react';
import { NavBar, SumProfile, UserPost } from '../components';
import { Box, Button, Card, CardContent, Container, Divider } from '@mui/material';
import { useState, useEffect } from 'react';
import { colors } from '../styles';
import { content, contentLong } from '../assets/contents/content';
import UpSellerDialog from '../components/profile/UpSellerDialog';
import { useParams } from 'react-router-dom';
import { useNavBarHeight } from '../hooks/useNavBarHeight';

// Redux
import { useSelector } from 'react-redux';
import { selectProfileInfo } from '../redux/features/profileInfoSlice';

import { fieldNames, storeFieldNames } from '../constants';

function InfoTable() {
    const myProfileInfo = useSelector(selectProfileInfo);

    const [fullName, setFullName] = useState('fullName');
    const [role, setRole] = useState('Role');

    const [infos, setInfos] = useState({});
    const { id } = useParams();

    useEffect(() => {
        async function fetchUserInfo() {
            let data;
            if (id === undefined) {
                data = await fetch('/api/v1/updateInfo', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    credentials: 'include'
                });
            } else {
                data = await fetch('/api/v1/sellers/' + id, {
                    headers: { 'Content-Type': 'application/json' }
                });
            }
            const arr = await data.json();
            console.log(arr.userInfo);
            setFullName(arr.userInfo?.fullName || '');
            setRole(arr.userInfo?.role || '');
            setInfos(arr.userInfo);
        }
        fetchUserInfo();
    }, [id]);

    if (infos === undefined) return <p>User not found!!</p>;
    else
        return (
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
                    <UpSellerDialog variant="filled">Up Seller</UpSellerDialog>
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
                        {Object.keys(infos).map((key) => {
                            if (
                                infos[key] === undefined ||
                                infos[key] === null ||
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
                            if (key == 'sellerDetails')
                                return Object.keys(infos[key]).map((storeKey) => {
                                    if (infos[key][storeKey] === undefined || infos[key][storeKey] === null)
                                        return null;
                                    return (
                                        <Fragment key={storeKey}>
                                            <p className="subtitle-semi-bold-20" style={{ color: colors.green4 }}>
                                                {storeFieldNames[storeKey]}
                                            </p>
                                            <p className="content-medium-20-25">{infos[key][storeKey]}</p>
                                        </Fragment>
                                    );
                                });
                            return (
                                <Fragment key={key}>
                                    <p className="subtitle-semi-bold-20" style={{ color: colors.green4 }}>
                                        {fieldNames[key]}
                                    </p>
                                    <p className="content-medium-20-25">{infos[key]}</p>
                                </Fragment>
                            );
                        })}
                    </Box>
                    <Button variant="filled">Edit Profile</Button>
                </Box>
                <Divider variant="slighter"></Divider>
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between'
                    }}>
                    <p className="subtitle-extra-bold">Posts</p>
                    <Button variant="filled">Activity History</Button>
                </Box>
            </CardContent>
        );
}

function UserCard() {
    return (
        <Container maxWidth="false" disableGutters>
            <Card variant="outlined">
                <InfoTable />
            </Card>
        </Container>
    );
}

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
    return (
        <div style={{ paddingTop: useNavBarHeight() }}>
            <Box className="navbar">
                <NavBar />
            </Box>
            <Container maxWidth="lg" sx={containerStyle}>
                <UserCard />
                <UserPost content={content} />
                <UserPost content={contentLong} />
                <UserPost />
                <UserPost />
                <UserPost />
            </Container>
        </div>
    );
}
