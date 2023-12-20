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
import { fetchUserInfo, fetchProductInfo } from '../../utils/apiUtils';
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
}

const dialogContentTextStyle = {
    color: colors.green5,
    display: 'flex',
    alignItems: 'center',
    columnGap: '15px',
    paddingTop: '35px'
};

export default function EditProductInfoDialog({ variant = 'filled', ...props }) {
    const dispatch = useDispatch();
    const profileInfoFromRedux = useSelector(selectProfileInfo);
    const storeInfoFromRedux = useSelector(selectStoreInfo);
    const [open, setOpen] = React.useState(false);

    const infos = [
        'name',
        'price',
        'discountPrice',
        'quantity',
        'description',
        'type',
        'suitEnvironment',
        'suitClimate',
    ];

    const infosTitle = [
        'name *',
        'price *',
        'discount Price',
        'quantity *',
        'description',
        'type',
        'suit Environment',
        'suit Climate',
    ];

    const [latestValues, setLatestValues] = React.useState([
        props.name,
        props.price,
        props.discountPrice,
        props.quantity,
        props.description,
        props.active,
        props.type,
        props.suitEnvironment,
        props.suitClimate
    ]);

    useEffect(() => {
        setLatestValues([
            props.name,
            props.price,
            props.discountPrice,
            props.quantity,
            props.description,
            props.active,
            props.type,
            props.suitEnvironment,
            props.suitClimate
        ]);
    }, []);

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
        const name = form.name.value;
        const price = form.price.value;
        const discountPrice = form.discountPrice.value;
        const quantity = form.quantity.value;
        const description = form.description.value;
        const active = (quantity == '0') ? 'false' : 'true';
        const type = form.type.value;
        const suitEnvironment = form.suitEnvironment.value;
        const suitClimate = form.suitClimate.value;

        if (!name || name === '' || !price || price === '' || !quantity || quantity == '' ) {
            alert('You must fill in all necessary field!');
            return;
        }
        
        const jsonData = JSON.stringify({ 
            name,
            price,
            discountPrice,
            quantity,
            description,
            active,
            type,
            suitEnvironment,
            suitClimate
        });

        console.log(jsonData);

        try {
            const response = await fetch('/api/v1/marketplace/products/' + props.productid, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: jsonData
            });

            if (response.ok) {
                setLatestValues([
                    name,
                    price,
                    discountPrice,
                    quantity,
                    description,
                    active,
                    type,
                    suitEnvironment,
                    suitClimate
                ])

                alert('Update successful!');

                window.location.reload();
            } else {
                alert('Update failed. Please try again!');
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
                    <p className="subtitle-semi-bold-28">Product Update Form</p>
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
                        {infos.map((key, index) => {
                            return (<div key={index}>
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
                                    variant="standard" />
                            </div>)
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