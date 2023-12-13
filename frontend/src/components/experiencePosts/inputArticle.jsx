import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { Divider, IconButton } from '@mui/material';
import PostArticle from './postArticle';
import SumProfile from '../common/summaryProfile';
import { useMediaQuery } from '@mui/material';
import { useTheme } from '@emotion/react';
import { colors } from '../../styles';
import './../../index.css';
import TextField from '@mui/material/TextField';
import { ImageIcon, VideoIcon } from '../../assets/icons';

const style = {
    display: 'flex',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    background: colors.green1,
    border: '0px',
    boxShadow: 24,
    p: 4,
    flexDirection: 'column',
    borderRadius: '7px'
};

export default function InputArticle() {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm')); // Check for small screen

    const modalWidth = isSmallScreen ? '90%' : 900;
    const modalHeight = isSmallScreen ? '60%' : 600;

    return (
        <div>
            <PostArticle onClick={handleOpen} />
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description">
                <Box
                    sx={style}
                    style={{
                        height: modalHeight,
                        width: modalWidth,
                        display: 'flex'
                    }}>
                    <div
                        className="subtitle-extra-bold upper-case"
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            textAlign: 'center',
                            height: 58,
                            marginBottom: 9
                        }}>
                        Create Article
                    </div>
                    <Divider variant="slighter" />
                    <div
                        style={{
                            height: '100vh',
                            background: colors.primary,
                            borderRadius: 7,
                            marginTop: 31,
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-between'
                        }}>
                        <div style={{ marginTop: '25px', marginLeft: 64 }}>
                            <SumProfile />
                        </div>
                        <Box
                            sx={{
                                maxWidth: '100%',
                                border: 'none',
                                margin: '17px 50px'
                            }}>
                            <TextField
                                fullWidth
                                placeholder="My plant is..."
                                id="fullWidth"
                                InputLabelProps={{
                                    className: 'content-medium-22'
                                }}
                                multiline
                                rows={10}
                            />
                        </Box>
                        <div
                            style={{
                                display: 'flex',
                                justifyContent: 'center'
                            }}>
                            <IconButton>
                                <ImageIcon
                                    color={colors.green4}
                                    style={{ fontSize: 40 }}
                                />
                            </IconButton>
                            <IconButton>
                                <VideoIcon
                                    color={colors.green4}
                                    style={{ fontSize: 40 }}
                                />
                            </IconButton>
                        </div>
                        <div
                            style={{
                                paddingBottom: '25px',
                                paddingLeft: '38px',
                                paddingRight: '38px'
                            }}>
                            <Button
                                variant="filled"
                                color="green4"
                                style={{ width: '100%' }}>
                                Post
                            </Button>
                        </div>
                    </div>
                </Box>
            </Modal>
        </div>
    );
}
