import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import { StarIcon } from '../../assets/icons';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import './../../index.css';
import { colors } from '../../styles';
import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import EditProductInfoDialog from './editProductInfoDialog';

// Redux
import { useSelector } from 'react-redux';
import { selectNavBarState } from '../../redux/features/common/navBarStateSlice';

export default function ProductCard({ variant = 'product', ...props }) {
    const navBarState = useSelector(selectNavBarState);
    const { id } = useParams();
    const [temp, setTemp] = useState(false);
    const stars = [...Array(5).keys()];

    useEffect(()=> setTemp(true), [props.price]);

    return (
        <Card
            variant={variant}
            style={{
                display: 'flex',
                flexDirection: 'column',
                position: 'relative',
                boxShadow:
                    '0px 1px 3px 0px rgba(0, 0, 0, 0.12), 0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 2px 1px -1px rgba(0, 0, 0, 0.20)'
            }}>
            <Link style={{ display: 'contents', textDecoration: 'none' }} to={'/marketplace/products/' + props._id}>
                <CardMedia
                    component="div"
                    sx={{ maxWidth: '100%' }}
                    variant="product"
                    image={props.image}
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
                    <Link style={{ textDecoration: 'none' }} to={'/marketplace/products/' + props._id}>
                        <div className="content-medium-14-22" style={{ color: colors.green6 }}>
                            {props.price && '$ ' + props.price}
                        </div>
                        <div className="subtitle-semi-bold-20" style={{ color: colors.green4, paddingTop: '5px' }}>
                            {props.name}
                        </div>
                        <div style={{ paddingTop: '10px' }}>
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
                            <p className="content-semi-bold-16 linkText">
                                {' ' + props?.sellerInfo[0]?.userInfo[0]?.fullName}
                            </p>
                        </Link>
                    </div>
                </div>
                <div
                    style={{
                        position: 'absolute',
                        bottom: 10,
                        right: 12
                    }}>
                    {
                        navBarState === 2 && (!id || id === '') ?
                        <EditProductInfoDialog variant="cart" className={'product-card-edit'} productId={props._id}>
                            <BorderColorIcon style={{ color: colors.green4 }} />
                        </EditProductInfoDialog>
                        :
                        <Button
                            productid={props._id}
                            sellerid={props.sellerId}
                            className={variant === 'edit' ? 'product-card-edit' : 'product-card-add'}
                            variant="cart"
                            color={variant === 'product' ? 'secondary' : 'primary'}>
                            {variant === 'edit' ? <BorderColorIcon style={{ color: colors.green4 }} /> : '+'}
                        </Button>
                    }
                </div>
            </div>
        </Card>
    );
}