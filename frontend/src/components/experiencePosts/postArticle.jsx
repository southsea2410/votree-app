import * as React from 'react';
import { colors } from '../../styles';
import { Avatar, Button } from '@mui/material';
import './../../index.css';
import { LeafIcon } from '../../assets/icons';

export default function PostArticle({ onClick }) {
    return (
        <div
            style={{
                display: 'flex',
                border: '1px solid',
                borderColor: colors.green5,
                background: colors.primary,
                height: 70,
                width: 750,
                borderRadius: 100,
                justifyContent: 'center',
                alignItems: 'center'
            }}
        >
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    gap: 15,
                    alignItems: 'center'
                }}
            >
                <Avatar variant='small'>N</Avatar>
                <Button
                    variant="post"
                    style={{ gap: 15, padding: '0px 15px', height: 40 }}
                    onClick={onClick}
                >
                    <div style={{ display: 'flex' }}>
                        <LeafIcon
                            color={colors.green6}
                            style={{ fontSize: 25 }}
                        />
                    </div>
                    <div
                        className="content-semi-bold-16"
                        style={{ color: colors.green6 }}
                    >
                        How is your plan today, Prince Vegeta?
                    </div>
                </Button>
            </div>
        </div>
    );
}
