import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import BasketIcon from './basketIcon';
import { colors } from '../../styles';

export default function Basket() {
    return (
        <Avatar variant="icon">
            <BasketIcon color={colors.green2} style={{ fontSize: 32 }} />
        </Avatar>
    );
}
