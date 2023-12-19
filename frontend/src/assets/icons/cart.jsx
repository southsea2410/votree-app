import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import CartIcon from './cartIcon';
import { colors } from '../../styles';

export default function Cart({className}) {
    return (
        <Avatar className={className} variant="big" color="green6">
            <CartIcon color={colors.green3} style={{ fontSize: 32 }} />
        </Avatar>
    );
}
