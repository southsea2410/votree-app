import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import BasketIcon from './basketIcon';
import { colors } from '../../styles';

export default function BasketClicked() {
    return (
        <Avatar variant="icon-clicked">
            <BasketIcon color={colors.green5} style={{ fontSize: 32 }} />
        </Avatar>
    );
}
