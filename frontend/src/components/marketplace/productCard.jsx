import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import { Product_test } from '../../assets/images';
import { StarIcon } from '../../assets/icons';
import './../../index.css';
import { colors } from '../../styles';
import { useState, useEffect } from 'react';

// const NUM_OF_STARS = 5;


const linkStyle = {
    color: '#3366CC',
    textDecoration: 'underline',
    textDecorationColor: '#99CCFF'
};

export default function ProductCard({ variant = 'product', ...props }) {
    const value = 3; // will update
    const starsNum = parseInt(props.ratingsAverage) || 5;
    const stars = [...Array(starsNum).keys()];

    const [sellerName, setSellerName] = useState('Unknown');

    async function fetchSellerName() {
        // Fetch seller
        const res = await fetch('api/v1/sellers/' + props.sellerId, {
            headers: { 'Content-Type': 'application/json' }
        });
        const data = await res.json();

        const seller = data.data.seller;
        setSellerName(seller.fullName);
    }

    useEffect(() => {
        fetchSellerName();
    }, []);

    return (
        <Card
            variant={variant}
            style={{
                display: 'flex',
                flexDirection: 'column',
                boxShadow:
                    '0px 1px 3px 0px rgba(0, 0, 0, 0.12), 0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 2px 1px -1px rgba(0, 0, 0, 0.20)'
            }}>
            <CardMedia variant="product" image={Product_test} title="flowers" />
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    // width: 348,
                    // height: 93,
                    padding: '10px 20px 7px'
                }}>
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '3px',
                        justifyContent: 'space-between'
                    }}>
                    <div className="content-medium-14-22">{props.price && '$ ' + props.price}</div>
                    <div className="subtitle-semi-bold-20" style={{ color: colors.green4 }}>
                        {props.name}
                    </div>
                    <div>
                        {stars.map((index) => (
                            <StarIcon key={index} color={value > index ? colors.ratings : colors.primary} />
                        ))}
                    </div>
                    <div style={{ display: 'flex', columnGap: '8px' }}>
                        <p
                            className="content-regular-12"
                            style={{height: 10 }}>
                            Sold By: 
                        </p>
                        <p className='content-semi-bold-16' style={linkStyle}>{' ' + sellerName}</p>
                    </div>
                </div>
                <CardActions style={{ padding: 0 }}>
                    <Button variant="cart" color={variant === 'product' ? 'secondary' : 'primary'}>
                        +
                    </Button>
                </CardActions>
            </div>
        </Card>
    );
}
