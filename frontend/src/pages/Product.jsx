import { Fragment, useState } from 'react';
import { NavBar } from '../components';
import { Link, Navigate, useParams } from 'react-router-dom';
import { Box, Button, Container, Divider, GlobalStyles } from '@mui/material';
import { useEffect } from 'react';
import { BackIcon, StarIcon } from '../assets/icons';

import { colors } from '../styles';
// 657d32d4590fea96403ee87b

export default function Product() {
    const { productId } = useParams();
    const [productInfos, setProductInfos] = useState({});

    let stars = [];
    for (let i = 1; i <= 5; i++) {
        stars.push(<StarIcon key={i} color={productInfos?.ratingsAverage > i ? colors.pending : colors.primary} />);
    }

    async function fetchProductInfos() {
        const res = await fetch('/api/v1/marketplace/products/' + productId, {
            headers: { 'Content-Type': 'application/json' }
        });

        const data = await res.json();
        const product = data.data.product;

        setProductInfos(product);
    }

    const fieldNames = {
        type: 'Type',
        suitEnvironment: 'Environment',
        suitClimate: 'Climate'
    };

    useEffect(() => {
        fetchProductInfos();
    }, []);
    if (productInfos == null) return null;
    return (
        <Fragment>
            <GlobalStyles styles={{ body: { backgroundColor: colors.primary } }} />
            <NavBar className="navbar" />
            <Container
                disableGutters
                sx={{
                    marginTop: '120px',
                    flexDirection: { xs: 'column', md: 'row' },
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                <Link to="/marketplace">
                    <BackIcon fontSize="60px" className="back-icon" />
                </Link>
                <Container maxWidth="xs">
                    <img
                        src={productInfos.image?.replace('../', 'http://localhost:3000/')}
                        style={{ maxWidth: '100%', borderRadius: '10px' }}
                    />
                </Container>

                <Container maxWidth="md" sx={{ display: 'flex', flexDirection: 'column', rowGap: '30px' }}>
                    <p className="subtitle-extra-bold">{productInfos.name}</p>
                    <Box sx={{ display: 'flex', alignItems: 'center', columnGap: '10px' }}>
                        <p className="subtitle-semi-bold-28">$ {productInfos.price}</p>
                        <Divider orientation="vertical" flexItem />
                        <Box sx={{ display: 'flex', flexDirection: 'row' }}>{stars}</Box>
                    </Box>
                    <Box sx={{ display: 'flex', flexDirection: 'column', rowGap: '15px' }}>
                        <p className="subtitle-semi-bold-20" style={{ color: colors.green5 }}>
                            Description
                        </p>
                        <p className="content-regular-20">{productInfos.description}</p>
                    </Box>
                    <Box sx={{ display: 'flex', flexDirection: 'column', rowGap: '15px' }}>
                        <p className="subtitle-semi-bold-20" style={{ color: colors.green5 }}>
                            Specification
                        </p>
                        <Box sx={{ display: 'grid', gridTemplateColumns: '130px 100%', rowGap: '15px' }}>
                            {Object.keys(fieldNames).map((key) => {
                                return (
                                    <Fragment key={key}>
                                        <p className="content-medium-16">{fieldNames[key]}</p>
                                        <p className="content-regular-16">{productInfos[key]}</p>
                                    </Fragment>
                                );
                            })}
                        </Box>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start', gap: '50px' }}>
                        <p className="extra-medium">Quantity Left: {productInfos.quantity}</p>
                        <Link>
                            <Button variant="contained">Add to Cart</Button>
                        </Link>
                    </Box>
                </Container>
            </Container>
        </Fragment>
    );
}
