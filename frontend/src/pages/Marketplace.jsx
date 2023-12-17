import NavBar from '../components/common/navBar';
import { Box, Container } from '@mui/material';
import { ProductCard, Footer, CartList } from '../components';
import { Divider } from '@mui/material';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import { colors } from '../styles';
import { useNavBarHeight } from '../hooks/useNavBarHeight';
import React, { useCallback } from 'react';
import { useState, useEffect } from 'react';

const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '0px 80px 100px'
};

const hotSalesContainer = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, 388px)',
    gap: '20px',
    justifyContent: 'center',
    width: '100%'
};

const salePostsContainer = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, 388px)',
    gap: '20px',
    justifyContent: 'center',
    width: '100%'
};

export default function Marketplace() {
    const [plantInCart, setPlantInCart] = React.useState(0);

    const handleAddPlantToCart = useCallback(() => {
        setPlantInCart((plantInCart) => plantInCart + 1);
    }, []);

    const [list, setList] = useState([]);

    useEffect(() => {
        async function fetchData() {
            // Fetch data
            let res = await fetch('/api/v1/marketplace/products', {
                headers: { 'Content-Type': 'application/json' }
            });
            let data = await res.json();

            // Check data
            console.log(data);

            // Remove unnecessary data
            data = data.data.products;

            // Create list of products
            const products = data.map((product) => {
                return (
                    <div key={product._id} onClick={handleAddPlantToCart}>
                        <ProductCard {...product} />
                    </div>
                );
            });

            setList(products);
        }
        fetchData();
    }, [handleAddPlantToCart]);
    return (
        <div
            style={{
                paddingTop: useNavBarHeight()
            }}>
            <Box className="navbar">
                <NavBar />
            </Box>
            <Container disableGutters maxWidth="xl" sx={containerStyle}>
                <div style={{ paddingBottom: '22px' }}>
                    <WhatshotIcon color="pending" fontSize="medium" />
                    <span className="subtitle-extra-bold" style={{ color: colors.green5, paddingLeft: 10 }}>
                        Hot picks
                    </span>
                </div>
                <Box sx={hotSalesContainer}>
                    <div onClick={handleAddPlantToCart}>
                        <ProductCard variant="hotpick" />
                    </div>
                    <div onClick={handleAddPlantToCart}>
                        <ProductCard variant="hotpick" />
                    </div>
                    <div onClick={handleAddPlantToCart}>
                        <ProductCard variant="hotpick" />
                    </div>
                </Box>

                <div style={{ padding: '31px' }}>
                    <Divider style={{ width: 658, height: 1 }} />
                </div>

                <Box sx={salePostsContainer}>{list}</Box>
            </Container>
            {plantInCart ? <CartList /> : <></>}
            <div>
                <Footer className="footerStyle" />
            </div>
        </div>
    );
}
