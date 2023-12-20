import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { colors } from '../../styles';
import { LocationIcon, MailIcon, MarketIcon, PhoneIcon } from '../../assets/icons';
import { useNavigate } from 'react-router-dom';
import { fetchUserInfo } from '../../utils/apiUtils';

// Redux
import { useDispatch } from 'react-redux';
import { updateProfileInfo } from '../../redux/features/profile/profileInfoSlice';
import { updateIsLoggedIn } from '../../redux/features/account/isLoggedInSlice';
import { updateStoreInfo } from '../../redux/features/profile/storeInfoSlice';
import { updateIsSeller } from '../../redux/features/account/isSellerSlice';

const buttonStylePosition = {
    display: 'flex',
    justifyContent: 'center',
    paddingBottom: 17
}

const dialogContentTextStyle = {
    color: colors.green5,
    display: 'flex',
    alignItems: 'center',
    columnGap: '15px',
    paddingTop: '35px'
};

export default function UpSellerDialog({ variant = 'filled', ...props }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const form = event.target;
        const storeName = form.storeName.value;
        const storeLocation = form.storeLocation.value;
        const storeEmail = form.storeEmail.value;
        const storePhoneNumber = form.storePhoneNumber.value;
        
        const jsonData = JSON.stringify({ storeName, storeLocation, storeEmail, storePhoneNumber });

        try {
            const response = await fetch('/api/v1/userInfo/updateToSeller', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: jsonData
            });

            if (response.ok) {

                const { profile, store } = await fetchUserInfo();

                if (profile) {
                    dispatch(updateProfileInfo(profile));
                    dispatch(updateIsLoggedIn(true));
                }

                if (store) {
                    dispatch(updateStoreInfo(store));
                    dispatch(updateIsSeller(true));
                }

                alert('Update successful!');
                
                window.location.reload();
            } else {
                const errorData = await response.json();
                if (errorData && errorData.error) {
                    alert(`Update failed: ${errorData.error}`);
                } else {
                    alert('Update failed. Please try again!');
                }
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred during update. Please try again later!');
        }

    }

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
                        color: colors.green5,
                        paddingBottom: 0
                    }}>
                    <p className="subtitle-semi-bold-28">Seller Registration Form</p>
                    <IconButton
                        aria-label="close"
                        onClick={handleClose}
                        className="extra-medium"
                        >
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>
                <form
                    onSubmit={handleSubmit}
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 15,
                        padding: '0px 30px',
                    }}>
                    <DialogContent>
                        <DialogContentText className="extra-medium" sx={dialogContentTextStyle}>
                            <MarketIcon />
                            Store Name
                        </DialogContentText>
                        <TextField name="storeName" autoFocus margin="dense" id="storeName" type="text" fullWidth variant="standard" />
                        <DialogContentText className="extra-medium" sx={dialogContentTextStyle}>
                            <LocationIcon />
                            Store Location
                        </DialogContentText>
                        <TextField name="storeLocation" autoFocus margin="dense" id="storeLocation" type="text" fullWidth variant="standard" />
                        <DialogContentText className="extra-medium" sx={dialogContentTextStyle}>
                            <MailIcon />
                            Store Email
                        </DialogContentText>
                        <TextField name="storeEmail" autoFocus margin="dense" id="storeEmail" type="text" fullWidth variant="standard" />
                        <DialogContentText className="extra-medium" sx={dialogContentTextStyle}>
                            <PhoneIcon />
                            Store Phone Number
                        </DialogContentText>
                        <TextField
                            name="storePhoneNumber"
                            autoFocus
                            margin="dense"
                            id="storePhoneNumber"
                            type="text"
                            fullWidth
                            variant="standard"
                        />
                    </DialogContent>
                    <div style={buttonStylePosition}>
                        <Button onClick={handleClose} type="submit">Submit</Button>
                    </div>
                </form>
            </Dialog>
        </React.Fragment>
    );
}
