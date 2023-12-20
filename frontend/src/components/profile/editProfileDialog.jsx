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
import { fetchUserInfo } from '../../utils/apiUtils';
import { useEffect } from 'react';

// Redux
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { updateProfileInfo } from '../../redux/features/profile/profileInfoSlice';
import { updateIsLoggedIn } from '../../redux/features/account/isLoggedInSlice';
import { updateStoreInfo } from '../../redux/features/profile/storeInfoSlice';
import { updateIsSeller } from '../../redux/features/account/isSellerSlice';
import { selectProfileInfo } from '../../redux/features/profile/profileInfoSlice';
import { selectStoreInfo } from '../../redux/features/profile/storeInfoSlice';

const buttonStylePosition = {
    display: 'flex',
    justifyContent: 'center',
    paddingBottom: 17
};

const dialogContentTextStyle = {
    color: colors.green5,
    display: 'flex',
    alignItems: 'center',
    columnGap: '15px',
    paddingTop: '35px'
};

export default function EditProfileDialog({ variant = 'filled', ...props }) {
    const dispatch = useDispatch();
    const profileInfoFromRedux = useSelector(selectProfileInfo);
    const storeInfoFromRedux = useSelector(selectStoreInfo);
    const [open, setOpen] = React.useState(false);

    const infos =
        profileInfoFromRedux.role === 'seller'
            ? [
                  'fullName',
                  'dateOfBirth',
                  'gender',
                  'phoneNumber',
                  'email',
                  'address',
                  'interest',
                  'storeName',
                  'storeLocation',
                  'storeEmail',
                  'storePhoneNumber'
              ]
            : ['fullName', 'dateOfBirth', 'gender', 'phoneNumber', 'email', 'address', 'interest'];

    const infosTitle =
        profileInfoFromRedux.role === 'seller'
            ? [
                  'full Name',
                  'date Of Birth',
                  'gender',
                  'phone Number',
                  'email',
                  'address',
                  'interest',
                  'store Name',
                  'store Location',
                  'store Email',
                  'store Phone Number'
              ]
            : ['full Name', 'date Of Birth', 'gender', 'phone Number', 'email', 'address', 'interest'];

    const [latestValues, setLatestValues] = React.useState(
        profileInfoFromRedux.role === 'seller'
            ? [
                  profileInfoFromRedux.fullName,
                  profileInfoFromRedux.dateOfBirth,
                  profileInfoFromRedux.gender,
                  profileInfoFromRedux.phoneNumber,
                  profileInfoFromRedux.email,
                  profileInfoFromRedux.address,
                  profileInfoFromRedux.interest,
                  storeInfoFromRedux.storeName,
                  storeInfoFromRedux.storeLocation,
                  storeInfoFromRedux.storeEmail,
                  storeInfoFromRedux.storePhoneNumber
              ]
            : [
                  profileInfoFromRedux.fullName,
                  profileInfoFromRedux.dateOfBirth,
                  profileInfoFromRedux.gender,
                  profileInfoFromRedux.phoneNumber,
                  profileInfoFromRedux.email,
                  profileInfoFromRedux.address,
                  profileInfoFromRedux.interest
              ]
    );

    useEffect(() => {
        setLatestValues([
            profileInfoFromRedux.fullName,
            profileInfoFromRedux.dateOfBirth,
            profileInfoFromRedux.gender,
            profileInfoFromRedux.phoneNumber,
            profileInfoFromRedux.email,
            profileInfoFromRedux.address,
            profileInfoFromRedux.interest,
            storeInfoFromRedux.storeName,
            storeInfoFromRedux.storeLocation,
            storeInfoFromRedux.storeEmail,
            storeInfoFromRedux.storePhoneNumber
        ]);
    }, [profileInfoFromRedux]);

    const [values, setValues] = React.useState(latestValues);

    const handleClickOpen = () => {
        setValues(latestValues);
        setOpen(true);
    };

    const handleClose = () => {
        setValues(latestValues);
        setOpen(false);
    };

    const handleInputChange = (event, index) => {
        const updatedValues = [...values];
        updatedValues[index] = event.target.value;
        setValues(updatedValues);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const form = event.target;
        const fullName = form.fullName.value;
        const dateOfBirth = form.dateOfBirth.value;

        const tmp = values[2];
        const gender = tmp.charAt(0).toUpperCase() + tmp.slice(1).toLowerCase();

        const phoneNumber = form.phoneNumber.value;
        const email = form.email.value;
        const address = form.address.value;
        const interest = form.interest.value;
        const storeName = form.storeName?.value;
        const storeLocation = form.storeLocation?.value;
        const storeEmail = form.storeEmail?.value;
        const storePhoneNumber = form.storePhoneNumber?.value;

        if (!fullName || fullName === '') {
            alert('Full name must not be empty!');
            return;
        }

        if (gender !== '' && gender !== 'Male' && gender !== 'Female' && gender !== 'Different') {
            alert(`Gender must be 'Male', 'Female' or 'Different'!`);
            return;
        }

        const jsonData = JSON.stringify({
            fullName,
            dateOfBirth,
            gender,
            phoneNumber,
            email,
            address,
            interest,
            storeName,
            storeLocation,
            storeEmail,
            storePhoneNumber
        });

        console.log(jsonData);

        try {
            const response = await fetch('/api/v1/userInfo', {
                method: 'PATCH',
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

                setLatestValues(
                    profile.role === 'seller'
                        ? [
                              profile.fullName,
                              profile.dateOfBirth,
                              profile.gender,
                              profile.phoneNumber,
                              profile.email,
                              profile.address,
                              profile.interest,
                              store.storeName,
                              store.storeLocation,
                              store.storeEmail,
                              store.storePhoneNumber
                          ]
                        : [
                              profile.fullName,
                              profile.dateOfBirth,
                              profile.gender,
                              profile.phoneNumber,
                              profile.email,
                              profile.address,
                              profile.interest
                          ]
                );

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
                        color: colors.green5,
                        paddingBottom: 0
                    }}>
                    <p className="subtitle-semi-bold-28">Profile Update Form</p>
                    <IconButton aria-label="close" onClick={handleClose} className="extra-medium">
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>
                <form
                    onSubmit={handleSubmit}
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 15,
                        padding: '0px 30px'
                    }}>
                    <DialogContent>
                        {infos.map((key, index) => {
                            return (
                                <div key={index}>
                                    <DialogContentText className="extra-medium" sx={dialogContentTextStyle}>
                                        {`${infosTitle[index]}`}
                                    </DialogContentText>
                                    <TextField
                                        name={key}
                                        value={values[index]}
                                        onChange={(event) => handleInputChange(event, index)}
                                        autoFocus
                                        margin="dense"
                                        id={key}
                                        type="text"
                                        fullWidth
                                        variant="standard"
                                    />
                                </div>
                            );
                        })}
                    </DialogContent>
                    <div style={buttonStylePosition}>
                        <Button type="submit">Submit</Button>
                    </div>
                </form>
            </Dialog>
        </React.Fragment>
    );
}
