import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { colors } from '../../styles';

export default function UpSellerDialog({ variant = 'filled', ...props }) {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <React.Fragment>
            <Button variant={variant} onClick={handleClickOpen}>
                {props.children}
            </Button>
            <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
                <DialogTitle
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        color: colors.green5
                    }}
                >
                    <p className="subtitle-semi-bold-28">
                        Seller Registration Form
                    </p>
                    <IconButton
                        aria-label="close"
                        onClick={handleClose}
                        className="extra-medium"
                        sx={{ color: colors.green5 }}
                    >
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>
                <DialogContent>
                    <DialogContentText
                        className="extra-medium"
                        sx={{ color: colors.green5 }}
                    >
                        Store Name
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="storeName"
                        type="text"
                        fullWidth
                        variant="standard"
                    />
                </DialogContent>
                <DialogContent>
                    <DialogContentText
                        className="extra-medium"
                        sx={{ color: colors.green5 }}
                    >
                        Store Location
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="storeLocation"
                        type="text"
                        fullWidth
                        variant="standard"
                    />
                </DialogContent>
                <DialogContent>
                    <DialogContentText
                        className="extra-medium"
                        sx={{ color: colors.green5 }}
                    >
                        Store Email
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="storeEmail"
                        type="email"
                        fullWidth
                        variant="standard"
                    />
                </DialogContent>
                <DialogContent>
                    <DialogContentText
                        className="extra-medium"
                        sx={{ color: colors.green5 }}
                    >
                        Store Phone Number
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="storePhoneNumber"
                        type="text"
                        fullWidth
                        variant="standard"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleClose}>Submit</Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}
