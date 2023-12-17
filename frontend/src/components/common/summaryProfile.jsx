import * as React from 'react';
import { Box } from '@mui/material';
import { Avatar } from '@mui/material';
import './../../index.css';

export default function SumProfile({
    fullName = 'Prince Vegeta',
    role = 'user',
    avatar = 'https://i.pinimg.com/originals/0a/0b/9a/0a0b9a5e1e2b6b6b6b6b6b6b6b6b6b6b.jpg',
    ...props
}) {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'row' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <Avatar sx={{ width: '50px', height: '50px' }} />
            </div>
            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    marginLeft: '15px'
                }}>
                <div>
                    <div
                        className="subtitle-semi-bold-20"
                        style={{
                            width: '281px',
                            height: '34px',
                            alignItems: 'center',
                            display: 'flex'
                        }}>
                        {fullName}
                    </div>
                    <div className="extra-medium">
                        <ul style={{ margin: '0', paddingLeft: '22px' }}>
                            <li>{role}</li>
                        </ul>
                    </div>
                </div>
            </div>
        </Box>
    );
}
