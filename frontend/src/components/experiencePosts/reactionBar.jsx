import * as React from 'react';
import { Button } from '@mui/material';
import { DownvoteIcon, UpvoteIcon } from '../../assets/icons';

export default function ReactionBar() {
    return (
        <div style={{ display: 'flex', justifyContent: 'center', gap: 15 }}>
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
