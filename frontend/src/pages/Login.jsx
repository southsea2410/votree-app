import { Button, Avatar, Divider, Input } from '@mui/material';
import {
    SearchBar,
    NavBar,
    SumProfile,
    ProductCard,
    ReactionBar,
    InputArticle,
    Footer
} from '../components';
// import Avatar_test from "../assets/images/index.js";
// import { makeStyles } from "@mui/styles";
import { LogoVoTree_primary } from '../assets/images';
import { colors } from '../styles';
import * as React from 'react';
import {
    Basket,
    Noti,
    BasketClicked,
    NotiClicked,
    BackIcon,
    CloseIcon
} from '../assets/icons';

export default function Login() {
    // const classes = useStyles();
    return (
        <div className="container">
            <Footer />
            <NavBar />
            <InputArticle />
            <Button variant="post">
                How is your plan today, Prince Vegeta?
            </Button>
            <ReactionBar />
            <SumProfile />
            <ProductCard />
            {/* <Link style={{ fontColor: colors.green6 }}>Hi</Link> */}
            <h1>Welcome to Login Page</h1>
            <img src={LogoVoTree_primary} alt="logo" />
            <Button variant="outline-green6">Button</Button>
            <SearchBar></SearchBar>
            <Avatar variant="desktop-no-avt">N</Avatar>
            <Basket />
            <Noti />
            <BasketClicked />
            <NotiClicked />
            <BackIcon />
            <Divider variant="slighter" />
            <CloseIcon />
        </div>
    );
}
