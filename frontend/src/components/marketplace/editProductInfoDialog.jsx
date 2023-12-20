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
    paddingBottom: 17,
    gap: 15
}

const dialogContentTextStyle = {
    color: colors.green5,
    display: 'flex',
    alignItems: 'center',
    columnGap: '15px',
    paddingTop: '35px'
};

const deleteStyle = {
    width: 155,
    height: 54
}

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

    const [latestValues, setLatestValues] = React.useState([]);

    // useEffect(() => {
    //     setLatestValues([
    //         props.name,
    //         props.price,
    //         props.discountPrice,
    //         props.quantity,
    //         props.description,
    //         props.active,
    //         props.type,
    //         props.suitEnvironment,
    //         props.suitClimate
    //     ]);
    // }, []);

    const [values, setValues] = React.useState(latestValues);
    const [id, setId] = React.useState({});

    // async function fetchProductInfo(__id) {
    //     try {
    //         let res = await fetch('/api/v1/marketplace/products/' + __id, {
    //             headers: { 'Content-Type': 'application/json' }
    //         });
    //         let data_tmp = await res.json();

    //         // Remove unnecessary data
    //         data_tmp = data_tmp.data?.product;

    //         setLatestValues([
    //             data_tmp.name,
    //             data_tmp.price,
    //             data_tmp.discountPrice,
    //             data_tmp.quantity,
    //             data_tmp.description,
    //             data_tmp.active,
    //             data_tmp.type,
    //             data_tmp.suitEnvironment,
    //             data_tmp.suitClimate
    //         ]);
    //     } catch (error) {
    //         console.error('Fetch error:', error);
    //     }
    // }

    const handleClickOpen = (event) => {
        const product = event.currentTarget.getAttribute('productid');
        const seller = event.currentTarget.getAttribute('sellerid');
        setId(
            {product, seller}
        );

        // for (let i = 0; i < props.ids.length; ++i) {
        //     if (props.ids[i] === product) {
                // fetchProductInfo(product);
        //         break;
        //     }
        // }


        for (let i = 0; i < props.data.length; ++i) {
            if (props.data[i]._id === product) {
                setLatestValues(
                    [
                        props.data[i].name,
                        props.data[i].price,
                        props.data[i].discountPrice,
                        props.data[i].quantity,
                        props.data[i].description,
                        props.data[i].active,
                        props.data[i].type,
                        props.data[i].suitEnvironment,
                        props.data[i].suitClimate
                    ]
                );
                break;
            }
        }
        setValues(latestValues);
        // setOpen(true);
    };

    // useEffect(() => {
    //     setValues(latestValues);
    // }, [latestValues]);

    useEffect(() => {
        if (values.length !== 0) {
            setOpen(true);
        }
    }, [values]);

    const handleClose = () => {
        setValues(latestValues);
        setOpen(false);
    };

    const handleInputChange = (event, index) => {
        const updatedValues = [...values];
        updatedValues[index] = event.target.value;
        setValues(updatedValues);
    };

    const handleDelete = async () => {
        try {
            const response = await fetch('api/v1/sellers/' + id.seller + '/products/' + id.product, {
                method: 'DELETE'
            });

            if (response.ok) {
                alert('Delete successful!');
            } else {
                alert(`Delete failed: ${response.statusText}`);
            }
        } catch (error) {
            alert(`${error}`);
        }
    }

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
            const response = await fetch('/api/v1/marketplace/products/' + id, {
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



        let El = []
        setTimeout(() => {
            El = document.getElementsByClassName('product-card-edit');
            for (let i = 0; i < El.length; ++i) {
                El[i].addEventListener("click", handleClickOpen);
            }
        }, 2000);

    return (
        <React.Fragment>
            {/* <Button variant={variant} onClick={handleClickOpen}>
                {props.children}
            </Button> */}
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
                        <Button onClick={handleDelete} variant="outline-pending" style={deleteStyle}>Delete</Button>
                        <Button type="submit" >Submit</Button>
                    </div>
                </form>
            </Dialog>
        </React.Fragment>
    );
}

