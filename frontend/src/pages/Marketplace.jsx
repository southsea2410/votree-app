import NavBar from '../components/common/navBar';
import { Box, Container } from '@mui/material';
import { ProductCard } from '../components';
import { Divider } from '@mui/material';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import { colors } from '../styles';
import { useNavBarHeight } from '../hooks/useNavBarHeight';
import { useState, useEffect } from 'react';

const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '0px 80px'
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
    const [list, setList] = useState([]);

    useEffect(() => {
        async function fetchData() {

            // Fetch data
            let res = await fetch('/api/v1/marketplace/products', {headers: {'Content-Type': 'application/json'}})
            let data = await res.json();

            // Check data
            console.log(data);
            
            // Remove unnecessary data
            data = data.data.products;

            // Create list of products
            const products = data.map((product) => {
                return <ProductCard {...product}/>
            });

            setList(products);
        }
        fetchData();
    },[]);


    return (
    <div
        style={{
            paddingTop: useNavBarHeight()
        }}>
        <NavBar className="navbar" />
        <Container disableGutters maxWidth="xl" sx={containerStyle}>
            <div style={{ paddingBottom: '22px' }}>
                <WhatshotIcon color="pending" fontSize="medium" />
                <span
                    className="subtitle-extra-bold"
                    style={{ color: colors.green5, paddingLeft: 10 }}>
                    Hot picks
                </span>
            </div>
            <Box sx={hotSalesContainer}>
                {/* <ProductCard />
                <ProductCard />
                <ProductCard /> */}
            </Box>

            <div style={{ padding: '31px' }}>
                <Divider style={{ width: 658, height: 1 }} />
            </div>

            <Box sx={salePostsContainer}>
                {list}
            </Box>
        </Container>
    </div>
    );
}
