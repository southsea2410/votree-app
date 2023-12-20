import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { IconButton, TextareaAutosize } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { colors } from '../../styles';

// Redux

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

export default function AddProductDialog({ variant = 'filled', ...props }) {
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
        console.log(props.sellerId)
        const jsonData = JSON.stringify({
            "id": String(Math.floor(Math.random() * 10000)),
            "name": form.productName.value,
            "suitClimate": form.productClimate.value,
            "suitEnvironment": form.productEnvironment.value,
            "type": form.productType.value,
            "quantity": form.productQuantity.value,
            "description": form.productDescription.value,
            "image": form.productImage.value,
            "price": form.productPrice.value,
            "sellerId":  props.sellerId});

        try {
            const response = await fetch('/api/v1/marketplace/products', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: jsonData
            });
            console.log('Submitted')
            if (response.ok) {
                alert('Add product successful!');
                window.location.reload();
            } else {
                const errorData = await response.json();
                if (errorData && errorData.error) {
                    alert(`Add product failed: ${errorData.error}`);
                } else {
                    alert('Add product failed. Please try again!');
                }
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred during ADD product. Please try again later!');
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
                    <p className="subtitle-semi-bold-28">Add a new Product</p>
                    <IconButton aria-label="close" onClick={handleClose} className="extra-medium">
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>
                <form
                    id="addProductForm"
                    onSubmit={handleSubmit}
                    style={{display:'content'}}>
                    <DialogContent>
                        <DialogContentText className="extra-medium" sx={dialogContentTextStyle}>
                            Product Name
                        </DialogContentText>
                        <TextField
                            name="productName"
                            autoFocus
                            margin="dense"
                            id="productName"
                            type="text"
                            fullWidth
                            variant="standard"
                        />
                        <DialogContentText className="extra-medium" sx={dialogContentTextStyle}>
                            Product Type
                        </DialogContentText>
                        <TextField
                            name="productType"
                            autoFocus
                            margin="dense"
                            id="productType"
                            type="text"
                            fullWidth
                            variant="standard"
                        />
                        <DialogContentText className="extra-medium" sx={dialogContentTextStyle}>
                            Suit Environment
                        </DialogContentText>
                        <TextField
                            name="environment"
                            autoFocus
                            margin="dense"
                            id="productEnvironment"
                            type="text"
                            fullWidth
                            variant="standard"
                        />
                        <DialogContentText className="extra-medium" sx={dialogContentTextStyle}>
                            Suit Climate
                        </DialogContentText>
                        <TextField
                            name="productClimate"
                            autoFocus
                            margin="dense"
                            id="productClimate"
                            type="text"
                            fullWidth
                            variant="standard"
                        />
                        <DialogContentText className="extra-medium" sx={dialogContentTextStyle}>
                            Quantity
                        </DialogContentText>
                        <TextField
                            name="productQuantity"
                            autoFocus
                            margin="dense"
                            id="productQuantity"
                            type="number"
                            fullWidth
                            variant="standard"
                        />
                        <DialogContentText className="extra-medium" sx={dialogContentTextStyle}>
                            Price
                        </DialogContentText>
                        <TextField
                            name="productPrice"
                            autoFocus
                            margin="dense"
                            id="productPrice"
                            type="number"
                            fullWidth
                            variant="standard"
                        />
                        <DialogContentText className="extra-medium" sx={dialogContentTextStyle}>
                            Image
                        </DialogContentText>
                        <TextField
                            name="productImage"
                            autoFocus
                            margin="dense"
                            id="productImage"
                            type="text"
                            fullWidth
                            variant="standard"
                        />
                        <DialogContentText className="extra-medium" sx={dialogContentTextStyle}>
                            Description
                        </DialogContentText>
                        <TextareaAutosize
                            name="productDescription"
                            id="productDescription"
                            style={{width: '100%'}}
                            className='content-regular-16'
                            minRows={3}
                        />
                        <Button type="submit">
                            Submit
                        </Button>
                    </DialogContent>
                </form>
            </Dialog>
        </React.Fragment>
    );
}
