import { Fragment, useEffect, useState, useCallback } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { Button, Divider, useMediaQuery } from '@mui/material';
import { useTheme } from '@emotion/react';
import { colors } from '../../styles';
import './../../index.css';
import { Cart, CloseIcon } from '../../assets/icons';
import { IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import DeleteForever from '@mui/icons-material/DeleteForever';

import './cartList.css';

const style = {
    display: 'flex',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    background: colors.primary,
    border: '0px',
    boxShadow: 24,
    p: 4,
    flexDirection: 'column',
    rowGap: '20px',
    borderRadius: '7px'
};

const cartStyle = {
    position: 'fixed',
    bottom: 50,
    right: 50,
    cursor: 'pointer'
};

function CartListBody({ cart }) {
    // Use this to check the format of cart object
    console.log(cart);
    if (cart == '') return <p>Fetching Cart from backend...</p>;

    return (
        <Fragment>
            {cart.products.map((product, index) => {
                return (
                    <Fragment key={index}>
                        <p className="subtitle-extra-bold" style={{ color: colors.green4 }}>
                            {product.product.name}{' '}
                            <span style={{ color: colors.green2 }} className="subtitle-semi-bold-28">
                                {' x' + product.count}
                            </span>
                        </p>
                        <p className="subtitle-extra-bold" style={{ color: colors.green4, justifySelf: 'end' }}>
                            ${product.product.price * product.count}
                        </p>
                    </Fragment>
                );
            })}
            <Box></Box> {/* Empty Box to count on grid cell */}
            <Divider variant="slighter" />
            <p className="subtitle-extra-bold">Total</p>
            <p className="subtitle-extra-bold" style={{ justifySelf: 'end' }}>
                ${cart.totalPrice}
            </p>
        </Fragment>
    );
}

export default function CartList() {
    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const Navigate = useNavigate();

    const purchaseNavigate = () => {
        Navigate('/orderproducts');
    };

    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm')); // Check for small screen

    const modalWidth = isSmallScreen ? '70%' : 729;
    const modalHeight = isSmallScreen ? '50%' : 538;

    // Get User Id from Redux
    const userId = useSelector((state) => state.profileInfo._id);

    // A state to store cart
    const [cart, setCart] = useState('');

    async function createCart(event) {
        const res = await fetch(`/api/v1/marketplace/carts`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify({
                products: [
                    {
                        product: event.target.getAttribute('productid'),
                        count: 1
                    }
                ],
                seller: event.target.getAttribute('sellerid'),
                user: userId
            })
        });
        if (res.ok) {
            getCart();
        }
    }

    // Fetch cart from backend
    async function getCart(event) {
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
            if (cartNum == 0) throw 'Not Found cart With this user';

            cartArr = cartArr.data.carts;
            console.log(cartArr);
            // Loop through cartArr to find cart with userId
            for (let i = 0; i <= cartNum; i++) {
                if (i == cartNum) {
                    throw 'Not Found cart With this user';
                }
                if (cartArr[i].user == userId) {
                    setCart(cartArr[i]);
                    console.log('Found cart with this user', cartArr[i]);
                    return;
                }
            }
        } catch (err) {
            switch (err) {
                default:
                    console.log(err);
                    break;
                case 'Not Found cart With this user':
                    // now create new cart
                    console.log('Creating new cart');
                    await createCart(event);
                    break;
            }
        }
    }

    // Remove entire cart
    async function handleRemovePlantFromCart() {
        const res = await fetch(`/api/v1/marketplace/carts/${cart._id}`, {
            method: 'DELETE'
        });
        if (res.ok) {
            setCart('');
            setOpen(false);
        }
    }

    // MAIN LOGIC
    const handleAddPlantToCart = useCallback((event) => {
        // handle click event on product card
        const cartIcon = document.getElementById('cart');

        // Add animation
        cartIcon.classList.add('jello');
        setTimeout(() => {
            cartIcon.classList.remove('jello');
        }, 1000);

        if (cart == '') getCart(event);

        async function addProductToCart() {
            console.log('Add product to ', cart);
            const productId = event.target.getAttribute('productId');
            const res = await fetch(`/api/v1/marketplace/carts/${cart._id}`, {
                method: 'PATCH',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    productId: productId,
                    count: 1
                })
            });

            if (res.ok) {
                window.alert('Added to cart successfully!');
            }
        }

        addProductToCart();
    }, []);

    // Adding MAIN LOGIC to all product cards
    var elements = document.getElementsByClassName('product-card-add');
    // Loop through the elements and bind the handler function
    for (var i = 0; i < elements.length; i++) elements[i].addEventListener('click', handleAddPlantToCart, true);

    useEffect(() => {
        getCart();
    }, [JSON.stringify(cart)]);

    return (
        <div>
            <div id="cart" style={cartStyle} onClick={handleOpen}>
                {cart == '' ? '' : <Cart />}
            </div>
            <Modal open={open} onClose={handleClose}>
                <Box
                    sx={style}
                    style={{
                        minHeight: modalHeight,
                        width: modalWidth
                    }}>
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'baseline'
                        }}>
                        <Box className="subtitle-semi-bold-28">Cart List</Box>
                        <IconButton onClick={handleClose}>
                            <CloseIcon />
                        </IconButton>
                    </Box>
                    <Box
                        sx={{
                            display: 'grid',
                            gridTemplateColumns: '0.8fr 0.2fr'
                        }}>
                        <CartListBody cart={cart} />
                    </Box>
                    {cart && (
                        <DeleteForever
                            sx={{ alignSelf: 'center', justifySelf: 'center' }}
                            onClick={handleRemovePlantFromCart}
                        />
                    )}
                    <Button style={{ alignSelf: 'center', width: 155, height: 45 }} onClick={purchaseNavigate}>
                        Buy
                    </Button>
                </Box>
            </Modal>
        </div>
    );
}
