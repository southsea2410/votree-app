import { Button, Avatar, Divider, Input, TextField } from "@mui/material";
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
  CloseIcon,
  GoogleIcon,
  FBIcon
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

const styles = {
  input: {
    textAlign: 'center', // Aligns placeholder to the center
  },
};

export default function Login() {

  return (
    <div className="containerStyle">
      <div className="contentStyle" style={{ display: 'flex', padding: '100px 100px', justifyContent: 'space-between' }}>
        <div>
          <img src={LogoVoTree_primary} alt="" width="602" height="222" />
        </div>
        <div style={{ background: colors.green1, height: 487, width: 422, borderRadius: 7 }}>
          <div style={{ display: 'flex', gap: 21, paddingLeft: 30, paddingBottom: 30, paddingTop: 35}}>
            <div className="subtitle-semi-bold-20">Log in</div>
            <div className="subtitle-semi-bold-20" style={{ opacity: '15%' }}>Register</div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 15, padding: '0px 30px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <TextField
                size='small'
                fullWidth
                placeholder="Email"
                id="fullWidth"
                InputLabelProps={{ className: "content-semi-bold-16" }}
                multiline
                rows={1}
                InputProps={{
                  textAlign: 'center',
                }}
                style={{ background: colors.primary, borderRadius: 8, border: '1px solid', boderColor: colors.green6, width: 363 }}
              />
              <TextField
                size='small'
                fullWidth
                placeholder="Password"
                id="fullWidth"
                InputLabelProps={{ className: "content-semi-bold-16" }}
                multiline
                rows={1}
                InputProps={{
                  textAlign: 'center',
                }}
                style={{ background: colors.primary, borderRadius: 8, border: '1px solid', boderColor: colors.green6, width: 363 }}
              />
            </div>
            <div className="extra-medium">Forgot Password?</div>
            <div className="extra-medium">Don't have an account?</div>
            <Button>
              Login
            </Button>
          </div>
          <div style={{ padding: '31px' }}>
            <Divider />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0px 30px' }}>
            <div>
              <Button variant="filled" color="primary" style={{ width: 172, gap: 30 }}>
                <GoogleIcon />
                Google
              </Button>
            </div>
            <div>
              <Button variant="filled" color="facebook" style={{ width: 172, gap: 30 }}>
                <FBIcon />
                Facebook
              </Button>
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
