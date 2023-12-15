import { Fragment } from 'react';
import { NavBar, SumProfile, UserPost } from '../components';
import {
    Box,
    Button,
    Card,
    CardContent,
    Container,
    Divider
} from '@mui/material';
import { useState, useEffect } from 'react';
import { colors } from '../styles';
import { content, contentLong } from '../assets/contents/content';
import UpSellerDialog from '../components/profile/UpSellerDialog';
import { useParams } from 'react-router-dom';
import { useNavBarHeight } from '../hooks/useNavBarHeight';

// const fields = {
//     avatar: '',
//     email: '',
//     fullName: '',
//     address: '',
//     password: '',
//     phoneNumber: '',
//     products: [],
//     role: '',
//     storeEmail: '',
//     storeLocation: '',
//     storeName: '',
//     storePhoneNumber: '',
// };

const fieldNames = {
    avatar: 'Avatar',
    email: 'Email',
    fullName: 'Full Name',
    userName: 'User Name',
    address: 'Address',
    phoneNumber: 'Phone Number',
    role: 'Role',
    storeEmail: 'Store Email',
    storeLocation: 'Store Location',
    storeName: 'Store Name',
    storePhoneNumber: 'Store Phone Number'
};

function InfoTable() {
    const [infos, setInfos] = useState({
        avatar: '',
        email: '',
        fullName: '',
        userName: '',
        address: '',
        phoneNumber: '',
        role: '',
        storeEmail: '',
        storeLocation: '',
        storeName: '',
        storePhoneNumber: ''
    });
    const { id } = useParams();

    useEffect(() => {
        async function fetchUserInfo() {
            const data = await fetch('/api/v1/sellers/' + id, {
                headers: { 'Content-Type': 'application/json' }
            });
            const arr = await data.json();
            console.log(arr);
            setInfos(arr.data.seller);
        }
        fetchUserInfo();
    }, [id]);

    if (infos === undefined) return <p>User not found!!</p>;
    else
        return (
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
                        key == '_id' ||
                        key == 'id' ||
                        key == 'role' ||
                        key == 'password' ||
                        key == 'products' ||
                        key == '__v'
                    ) {
                        return null;
                    }
                    return (
                        <Fragment key={key}>
                            <p
                                className="subtitle-semi-bold-20"
                                style={{ color: colors.green4 }}>
                                {fieldNames[key]}
                            </p>
                            <p className="content-medium-20-25">{infos[key]}</p>
                        </Fragment>
                    );
                })}
            </Box>
        );
}

function UserCard() {
    return (
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
                        <SumProfile userName={'test'} />
                        <UpSellerDialog variant="filled">
                            Up Seller
                        </UpSellerDialog>
                    </Box>
                    <Divider variant="slighter"></Divider>
                    <Box
                        sx={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            justifyContent: 'space-between',
                            alignItems: 'flex-start'
                        }}>
                        <InfoTable />
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
