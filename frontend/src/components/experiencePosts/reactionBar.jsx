import * as React from 'react';
import { Button } from '@mui/material';
import { DownvoteIcon, UpvoteIcon } from '../../assets/icons';

// Redux
import { useSelector } from 'react-redux';
import { selectIsLoggedIn } from '../../redux/features/account/isLoggedInSlice';

export default function ReactionBar() {
    const isLoggedIn = useSelector(selectIsLoggedIn);

    return (
        <div
            style={{ display: 'flex', justifyContent: 'center', gap: 15, pointerEvents: isLoggedIn ? 'auto' : 'none' }}>
            <Button variant="outline-green1">17K</Button>
            <Button variant="outline-success">
                <UpvoteIcon style={{ fontSize: 30 }} />
            </Button>
            <Button variant="outline-pending">
                <DownvoteIcon style={{ fontSize: 30 }} />
            </Button>
            <Button variant="outline-green6">Comment</Button>
        </div>
    );
}
