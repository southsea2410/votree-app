import { Button, Avatar, Divider, Input } from "@mui/material";
import {
  SearchBar,
  NavBar,
  SumProfile,
  ProductCard,
  ReactionBar,
  InputArticle,
  Footer,
} from "../components";
// import Avatar_test from "../assets/images/index.js";
// import { makeStyles } from "@mui/styles";
import { LogoVoTree_primary } from "../assets/images";
import { colors } from "../styles";
import * as React from "react";
import {
  Basket,
  Noti,
  BasketClicked,
  NotiClicked,
  BackIcon,
  CloseIcon,
} from "../assets/icons";
import './../index.css';

const containerStyle = {
  display: 'flex',
  flexDirection: 'column',
  minHeight: '100vh', // Set the container to fill the viewport height
};

const contentStyle = {
  flex: 1, // Allow the content to expand and fill the remaining space
};

const footerStyle = {
  marginTop: 'auto', // Push the footer to the bottom of the container
};

export default function Login() {

  return (
    <div className="containerStyle">
      <div className="contentStyle" style={{ display: 'flex', padding: '100px 100px', justifyContent: 'space-between' }}>
        <div>
          <img src={LogoVoTree_primary} alt="" width="602" height="222" />
        </div>
        <div style={{ background: colors.green1, height: 487, width: 422 }}>
          <div>
            <div>Log in</div>
            <div>Register</div>
          </div>
          <div>
            <div>Email</div>
            <div>Password</div>
            <div>Forgot Password?</div>
            <div>Don't have an account?</div>
            <Button>
              Login
            </Button>
          </div>
          <Divider />
          <div>
            <div>
              <div></div>
              <Button>Google</Button>
            </div>
            <div>
              <div></div>
              <Button>Facebook</Button>
            </div>
          </div>
        </div>
      </div>
      <div>
        <Footer className="footerStyle"/>
      </div>
    </div>
  );
}
