import { useEffect, useState, Fragment } from 'react';
import { DropDownSelect, NavBar } from '../components';
import { Box, Button, Card, CardContent, Container, Divider } from '@mui/material';
import { colors } from '../styles';
import { useNavBarHeight } from '../hooks/useNavBarHeight';
import './../index.css';
import { useNavigate } from 'react-router-dom';
import { fetchUserInfo } from '../utils/apiUtils';

// Redux
import { useSelector, useDispatch } from 'react-redux';
import { updateProfileInfo } from '../redux/features/profile/profileInfoSlice';
import { updateIsLoggedIn } from '../redux/features/account/isLoggedInSlice';

function OrderCard({ field = 'Method', list = ['Cash', 'Banking', 'Momo', 'VNPay'] }) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [cart, setCart] = useState('');
    // Get User Id from Redux
    const userId = useSelector((state) => state.profileInfo._id);
    const userName = useSelector((state) => state.profileInfo.fullName);

    // Fetch cart from backend
    async function getCart() {
        // Fetch data
        const { profile } = await fetchUserInfo();
        if (profile) {
            dispatch(updateProfileInfo(profile));
            dispatch(updateIsLoggedIn(true));
        } else {
            navigate('/');
        }

        try {
            const res = await fetch(`/api/v1/marketplace/carts`, {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                }
            });
            let cartArr = await res.json();

            let cartNum = cartArr.results;

            cartArr = cartArr.data.carts;

            // Loop through cartArr to find cart with userId
            for (let i = 0; i <= cartNum; i++) {
                if (i === cartNum) {
                    setCart('');
                    throw 'Not Found cart With this user';
                }
                if (cartArr[i].user == userId) {
                    setCart(cartArr[i]);
                    console.log('Found cart with this user', cartArr[i]);
                    return;
                }
            }
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        getCart();
    }, [JSON.stringify(cart)]);

    if (cart == '') return '';

    async function handlePurchase() {
        const res = await fetch(`/api/v1/marketplace/orders/checkout-session/` + cart._id, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            }
        });
        let data = await res.json();
        const url = data.session.url;
        console.log(url);
        window.open(url, '_blank', 'rel: "noopener noreferrer"');
    }

    return (
        <Box>
            <Card variant="outlined">
                <CardContent
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        rowGap: '20px'
                    }}>
                    <div></div>
                    <div
                        className="subtitle-bold-28"
                        color={colors.green6}
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                        Invoice Details
                    </div>
                    <Box
                        className="subtitle-semi-bold-20"
                        sx={{
                            display: 'grid',
                            gridTemplateColumns: '200px 400px',
                            gridTemplateRows: 'repeat(2, 50px)',
                            alignItems: 'center'
                        }}>
                        <p className="subtitle-semi-bold-20" style={{ color: colors.green4 }}>
                            Seller
                        </p>
                        <p className="content-medium-20-25">{''}</p>
                        <p className="subtitle-semi-bold-20" style={{ color: colors.green4 }}>
                            Customer
                        </p>
                        <p className="content-medium-20-25">{userName}</p>
                    </Box>
                    <Divider variant="slighter"></Divider>
                    <Box
                        sx={{
                            display: 'grid',
                            gridTemplateColumns: '0.6fr 0.2fr 0.2fr',
                            rowGap: '10px',
                            alignItems: 'center'
                        }}>
                        <Box className="subtitle-bold-28" color={colors.green2}>
                            Products
                        </Box>
                        <Box className="subtitle-bold-28" sx={{ justifySelf: 'center' }} color={colors.green2}>
                            Quantity
                        </Box>
                        <Box className="subtitle-bold-28" sx={{ justifySelf: 'center' }} color={colors.green2}>
                            Money
                        </Box>
                        {cart.products.map((product, index) => (
                            <Fragment key={index}>
                                <p className="subtitle-semi-bold-20" style={{ color: colors.green4 }}>
                                    {product.product.name}
                                </p>
                                <p className="content-medium-20-25" style={{ justifySelf: 'center' }}>
                                    {product.count}
                                </p>
                                <p className="content-medium-20-25" style={{ justifySelf: 'center' }}>
                                    ${product.product.price}
                                </p>
                            </Fragment>
                        ))}
                    </Box>
                    <Divider variant="slighter"></Divider>
                    <Box className="subtitle-bold-28" color={colors.green2}>
                        Payment
                    </Box>
                    <div>{DropDownSelect({ field, list })}</div>
                    <Divider variant="slighter"></Divider>
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center'
                        }}>
                        <p className="subtitle-semi-bold-20">Total: $ {cart.totalPrice}</p>
                        <Button variant="active" onClick={handlePurchase}>
                            Purchase
                        </Button>
                    </Box>
                </CardContent>
            </Card>
        </Box>
    );
}

export default function OrderProducts() {
    return (
        <Box style={{ paddingTop: useNavBarHeight(), paddingBottom: '50px' }}>
            <Box className="navbar">
                <NavBar />
            </Box>
            <Container maxWidth="lg">
                <div>
                    {OrderCard({
                        field: 'Method',
                        list: ['Cash', 'Banking', 'Momo', 'VNPay']
                    })}
                </div>
            </Container>
        </Box>
    );
}
