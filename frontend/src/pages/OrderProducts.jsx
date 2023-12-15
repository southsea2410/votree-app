import React from 'react';
import { NavBar, dropDownSelect } from '../components';
import {
    Box,
    Button,
    Card,
    CardContent,
    Container,
    Divider
} from '@mui/material';
import { colors } from '../styles';
import { useNavBarHeight } from '../hooks/useNavBarHeight';
import './../index.css';

function OrderCard({
    field = 'Method',
    list = ['Cash', 'Banking', 'Momo', 'VNPay'],
    seller = 'King Vegeta',
    customer = 'Prince Vegeta',
}) {
    const profileData = [
        { name: 'Hoa hoc phi', quantity: 3 },
        { name: 'Hoa hoc phi', quantity: 1 },
        { name: 'Hoa hoc phi', quantity: 2 },
        { name: 'Hoa hoc phi', quantity: 5 },
    ]; // will update

    return (
        <Box>
            <Card variant="outlined">
                <CardContent
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        rowGap: '20px'
                    }}>
                    <div>

                    </div>
                    <div className="subtitle-bold-28" color={colors.green6} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        Invoice details
                    </div>
                    <Box
                        className="subtitle-semi-bold-20"
                        sx={{
                            display: 'grid',
                            gridTemplateColumns: '200px 400px',
                            gridTemplateRows: 'repeat(2, 50px)',
                            alignItems: 'center'
                        }}>
                        <p
                            className="subtitle-semi-bold-20"
                            style={{ color: colors.green4 }}>
                            Seller
                        </p>
                        <p className="content-medium-20-25">{seller}</p>
                        <p
                            className="subtitle-semi-bold-20"
                            style={{ color: colors.green4 }}>
                            Customer
                        </p>
                        <p className="content-medium-20-25">{customer}</p>
                    </Box>
                    <Divider variant="slighter"></Divider>
                    <Box className="subtitle-bold-28" color={colors.green2}>Products</Box>
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
                                gridTemplateRows: 'repeat(4, 50px)',
                                alignItems: 'center'
                            }}>
                            {profileData.map((data, index) => (
                                <React.Fragment key={index}>
                                <p className="subtitle-semi-bold-20" style={{ color: colors.green4 }}>
                                    {data.name}
                                </p>
                                <p className="content-medium-20-25">{data.quantity}</p>
                                </React.Fragment>
                            ))}
                        </Box>
                    </Box>
                    <Divider variant="slighter"></Divider>
                    <Box className="subtitle-bold-28" color={colors.green2}>Payment</Box>
                    <div>
                        {dropDownSelect({ field, list })}
                    </div>
                    <Divider variant="slighter"></Divider>
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center'
                        }}>
                        <p className="subtitle-semi-bold-20">
                            Total: 176.000.000 VND
                        </p>
                        <Button variant="active">Purchase</Button>
                    </Box>
                </CardContent>
            </Card>
        </Box>
    );
}

export default function OrderProducts() {
    return (
        <Box style={{ paddingTop: useNavBarHeight(), paddingBottom: '200px' }}>
            <Box className='navbar'>
                <NavBar />
            </Box>
            <Container maxWidth="lg">
                <div>
                    {OrderCard({ field: 'Method', list: ['Cash', 'Banking', 'Momo', 'VNPay'] })}
                </div>
            </Container>
        </Box>
    );
}
