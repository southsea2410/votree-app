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
import { colors } from '../styles';
import { content, contentLong } from '../assets/contents/content';
import UpSellerDialog from '../components/profile/UpSellerDialog';

function UserCard({
    age = 17,
    gender = 'Male',
    phone = '0123456789',
    email = 'vegetable@gmail.com',
    address = '123, Nguyen Van Linh, District 7, Ho Chi Minh City',
    interests = 'Vegetable, Fruit, Meat'
}) {
    return (
        <Container maxWidth="false" disableGutters="true">
            <Card variant="outlined">
                <CardContent
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        rowGap: '20px'
                    }}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            justifyContent: 'space-between'
                        }}
                    >
                        <SumProfile />
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
                        }}
                    >
                        <Box
                            sx={{
                                display: 'grid',
                                gridTemplateColumns: '200px 400px',
                                gridTemplateRows: 'repeat(6, 50px)',
                                alignItems: 'center'
                            }}
                        >
                            <p
                                className="subtitle-semi-bold-20"
                                style={{ color: colors.green4 }}
                            >
                                Age
                            </p>
                            <p className="content-medium-20-25">{age}</p>
                            <p
                                className="subtitle-semi-bold-20"
                                style={{ color: colors.green4 }}
                            >
                                Gender
                            </p>
                            <p className="content-medium-20-25">{gender}</p>
                            <p
                                className="subtitle-semi-bold-20"
                                style={{ color: colors.green4 }}
                            >
                                Phone Number
                            </p>
                            <p className="content-medium-20-25">{phone}</p>
                            <p
                                className="subtitle-semi-bold-20"
                                style={{ color: colors.green4 }}
                            >
                                Email
                            </p>
                            <p className="content-medium-20-25">{email}</p>
                            <p
                                className="subtitle-semi-bold-20"
                                style={{ color: colors.green4 }}
                            >
                                Address
                            </p>
                            <p className="content-medium-20-25">{address}</p>
                            <p
                                className="subtitle-semi-bold-20"
                                style={{ color: colors.green4 }}
                            >
                                Interest
                            </p>
                            <p className="content-medium-20-25">{interests}</p>
                        </Box>
                        <Button variant="filled">Edit Profile</Button>
                    </Box>
                    <Divider variant="slighter"></Divider>
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'space-between'
                        }}
                    >
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
    paddingTop: '120px',
    rowGap: '20px',
    backgroundColor: colors.secondary
};

export default function UserProfile() {
    return (
        <Fragment>
            <NavBar className="navbar" />
            <Container maxWidth="lg" sx={containerStyle}>
                <UserCard />
                <UserPost content={content} />
                <UserPost content={contentLong} />
                <UserPost />
                <UserPost />
                <UserPost />
            </Container>
        </Fragment>
    );
}
