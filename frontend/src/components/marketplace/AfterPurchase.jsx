import { Fragment } from "react";
import NavBar from "../common/navBar";
import Footer from "../common/footer";
import { Box, Button, Container, Divider } from "@mui/material";

export default function AfterPurchase({variant}){
    if (variant === 'success'){
        return(
            <Fragment>
                <NavBar />
                <Container sx={{display: 'flex', flexDirection: 'column', padding: '120px 0' , alignItems: 'center', justifyContent: 'flex-start'}}>
                    <h1>Thank you for your purchase!</h1>
                    <h2>Your order will be shipped soon.</h2>
                    <Box sx={{width: '100%', display: 'flex', justifyContent: 'space-evenly', paddingTop:'40px'}}>
                        <Button variant="outline-green1" href='/marketplace'>Continue Shopping</Button>
                        <Button variant="outline-green1" href='/'>Back to Home</Button>
                    </Box>
                </Container>
                <Box sx={{position: 'absolute', bottom:'0px', width:'100%'}}>
                    <Footer />
                </Box>
            </Fragment>
        )
    }

    else
        return(
            <Fragment>
                <NavBar />
                <Container sx={{display: 'flex', flexDirection: 'column', padding: '120px 0' , alignItems: 'center', justifyContent: 'flex-start'}}>
                    <h1>Sorry, your purchase failed!</h1>
                    <h2>Please try again.</h2>
                    <Box sx={{width: '100%', display: 'flex', justifyContent: 'space-evenly', paddingTop:'40px'}}>
                        <Button variant="outline-pending" href='/orderproducts'>Your Order</Button>
                        <Button variant="outline-green1" href='/'>Back to Home</Button>
                    </Box>
                </Container>
                <Box sx={{position: 'absolute', bottom:'0px', width:'100%'}}>
                    <Footer />
                </Box>
            </Fragment>
            )
}