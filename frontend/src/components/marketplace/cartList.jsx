import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { Button, Divider, useMediaQuery } from '@mui/material';
import { useTheme } from '@emotion/react';
import { colors } from '../../styles';
import './../../index.css';
import { Cart, CloseIcon  } from '../../assets/icons';
import { IconButton } from '@mui/material';

const style = {
    display: 'flex',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    background: colors.primary,
    border: '0px',
    boxShadow: 24,
    p: 4,
    flexDirection: 'column',
    borderRadius: '7px'
};

const cartStyle = {
    position: 'fixed',
    bottom: 50,
    right: 50
}

export default function CartList() {
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm')); // Check for small screen

    const modalWidth = isSmallScreen ? '70%' : 729;
    const modalHeight = isSmallScreen ? '50%' : 538;

    return (
        <div>
            <div style={cartStyle} onClick={handleOpen}>
                {
                    open ? 
                    <></>
                    :
                    <Cart />
                }
            </div>
            <Modal
                open={open}
                onClose={handleClose}>
                <Box
                    sx={style}
                    style={{
                        height: modalHeight,
                        width: modalWidth,
                        display: 'flex'
                    }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Box className="subtitle-semi-bold-28">Cart List</Box>
                        <IconButton onClick={handleClose}>
                            <CloseIcon />
                        </IconButton>
                    </Box>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 30, alignItems: 'center', paddingTop: 50 }}>
                        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center', width: '669px' }}>
                            <Box style={{ display: 'flex' }}>
                                <Box className="subtitle-extra-bold" style={{ color: colors.green4, paddingRight: 474 }}>Hoa học phí</Box>
                                <Box className="subtitle-extra-bold" style={{ color: colors.success }}>1</Box>
                            </Box>
                            <div style={{ padding: '20px' }}>
                                <Divider style={{ width: 658, height: 1 }} />
                            </div>
                        </Box>
                        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center', width: '669px' }}>
                            <Box style={{ display: 'flex' }}>
                                <Box className="subtitle-extra-bold" style={{ color: colors.green4, paddingRight: 474 }}>Hoa học phí</Box>
                                <Box className="subtitle-extra-bold" style={{ color: colors.success }}>4</Box>
                            </Box>
                            <div style={{ padding: '20px' }}>
                                <Divider style={{ width: 658, height: 1 }} />
                            </div>
                        </Box>
                        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center', width: '669px' }}>
                            <Box style={{ display: 'flex' }}>
                                <Box className="subtitle-extra-bold" style={{ color: colors.green4, paddingRight: 474 }}>Hoa học phí</Box>
                                <Box className="subtitle-extra-bold" style={{ color: colors.success }}>3</Box>
                            </Box>
                            <div style={{ padding: '20px' }}>
                                <Divider style={{ width: 658, height: 1 }} />
                            </div>
                        </Box>
                        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center', width: '669px' }}>
                            <Box style={{ display: 'flex' }}>
                                <Box className="subtitle-extra-bold" style={{ color: colors.green4, paddingRight: 474 }}>Hoa học phí</Box>
                                <Box className="subtitle-extra-bold" style={{ color: colors.success }}>5</Box>
                            </Box>
                            <div style={{ padding: '20px' }}>
                                <Divider style={{ width: 658, height: 1 }} />
                            </div>
                        </Box>
                    </div>
                    <Button style={{ alignSelf: 'center', width: 155, height: 45 }} >
                        Buy
                    </Button>
                </Box>
            </Modal>
        </div>
    );
}