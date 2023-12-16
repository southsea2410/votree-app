import { Fragment, useState } from "react";
import { NavBar } from "../components";
import { useParams } from "react-router-dom";
import { Box, Container, Divider } from "@mui/material";
import { useEffect } from "react";
import { StarIcon } from "../assets/icons";

import { Product_test } from "../assets/images";
import { colors } from "../styles";
import { useNavBarHeight } from "../hooks/useNavBarHeight";
// 657d32d4590fea96403ee87b

export default function Product() {
    const { productId } = useParams();
    const [productInfos, setProductInfos] = useState({});

    let stars = [];
    for (let i = 1; i <= 5; i++) {
        stars.push(
            <StarIcon key={i} color={productInfos.ratingsAverage > i ? colors.ratings : colors.primary}/>);
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
        'type': 'Type',
        'suitEnvironment': 'Environment',
        'suitClimate': 'Climate'
    }

    useEffect(() => {
        fetchProductInfos();
    }, []);

    return (
        <Fragment>
            <NavBar className='navbar'/>
            <Container maxWidth='lg' sx={{marginTop: '120px',display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                <Container maxWidth='md'>
                    <img src={productInfos.image} style={{maxWidth: '100%', borderRadius:'10px'}}/>
                </Container>

                <Container sx={{display: 'flex', flexDirection: 'column', rowGap:'30px'}}>
                    <p className="subtitle-extra-bold">{productInfos.name}</p>
                    <Box sx={{display: 'flex', flexDirection: 'row', columnGap:'10px'}}>
                        <p className="content-regular-28">$ {productInfos.price}</p>
                        <Divider orientation="vertical" flexItem/>
                        <Box sx={{display: 'flex', flexDirection: 'row'}}>
                            {stars}
                        </Box>
                    </Box>
                    <Box sx={{display: 'flex', flexDirection:'column', rowGap:'15px'}}>
                        <p className="subtitle-semi-bold-20" style={{color: colors.green5}}>Description</p>
                        <p className="content-regular-20">{productInfos.description}</p>
                    </Box>
                    <Box sx={{display: 'flex', flexDirection:'column', rowGap:'15px'}}>
                        <p className="subtitle-semi-bold-20" style={{color: colors.green5}}>Specification</p>
                        <p className="content-regular-20">{productInfos.description}</p>
                    </Box>
                    <p className="extra-medium">Quantity Left: {productInfos.quantity}</p>
                </Container>

            </Container>
        </Fragment>
    );
}