import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import { StarIcon } from '../../assets/icons';
import './../../index.css';
import { colors } from '../../styles';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
// const NUM_OF_STARS = 5;

const linkSellerStyle = {
    color: '#3366CC',
    textDecoration: 'underline',
    textDecorationColor: '#99CCFF'
};

export default function ProductCard({ variant = 'product', ...props }) {
    const stars = [...Array(5).keys()];

    const [sellerName, setSellerName] = useState('Unknown');

    async function fetchSellerName() {
        // Fetch seller
        const res = await fetch('/api/v1/userInfo/' + props.sellerId, {
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include'
        });
        const data = await res.json();

        const seller = data.data?.seller;
        setSellerName(seller?.fullName || 'Unknown');
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
            <Link style={{ display: 'contents', textDecoration: 'none' }} to={'/marketplace/product/' + props._id}>
                <CardMedia
                    sx={{ maxWidth: '100%' }}
                    variant="product"
                    image={props.image?.replace('../../public', 'http://localhost:3000/')}
                    title="plant"
                />
            </Link>
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '10px 20px 7px'
                }}>
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '3px'
                    }}>
                    <Link style={{ textDecoration: 'none' }} to={'/marketplace/product/' + props._id}>
                        <div className="content-medium-14-22" style={{ color: colors.green6 }}>
                            {props.price && '$ ' + props.price}
                        </div>
                        <div className="subtitle-semi-bold-20" style={{ color: colors.green4 }}>
                            {props.name}
                        </div>
                        <div>
                            {stars.map((index) => (
                                <StarIcon
                                    key={index}
                                    color={props.ratingsAverage > index + 1 ? colors.pending : colors.primary}
                                />
                            ))}
                        </div>
                    </Link>
                    <div style={{ display: 'flex', columnGap: '8px' }}>
                        <p className="content-regular-12" style={{ height: 10 }}>
                            Sold By:
                        </p>
                        <Link to={'/profile/' + props.sellerId}>
                            <p className="content-semi-bold-16" style={linkSellerStyle}>
                                {' ' + sellerName}
                            </p>
                        </Link>
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
