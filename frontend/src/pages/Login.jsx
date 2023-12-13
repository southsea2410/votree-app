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
  minHeight: '100vh',
};

const contentStyle = {
  flex: 1,
};

const footerStyle = {
  marginTop: 'auto',
};

const styles = {
  input: {
    textAlign: 'center',
  },
};

const textBoxStyle = {
  background: colors.primary,
  borderRadius: 8, 
  border: '1px solid', 
  boderColor: colors.green6, 
  width: 363
}

const textBoxClusterStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: 12
}

const socialMediaButtonStyle = {
  width: 172,
  gap: 30
}

const fieldStyle = {
  cursor: 'pointer',
}

export default function Login() {
  const [signUp, setSignUp] = React.useState(1);

  const handleChangeToSignUp = () => {
    setSignUp(!signUp);
  }

  return (
    <div className="containerStyle">
      <div className="contentStyle" style={{ display: 'flex', padding: '100px 100px', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <img src={LogoVoTree_primary} alt="" width="602" height="222" />
        </div>
        <div style={{ background: colors.green1, height: signUp ? 587 : 487, width: 422, borderRadius: 7 }}>
          <div style={{ display: 'flex', gap: 21, paddingLeft: 30, paddingBottom: 30, paddingTop: 35}}>
            <div className="subtitle-semi-bold-20" style={{ ...fieldStyle, opacity: signUp ? '15%' : '100%' }} onClick={handleChangeToSignUp}>Log in</div>
            <div className="subtitle-semi-bold-20" style={{ ...fieldStyle, opacity: signUp ? '100%' : '15%' }} onClick={handleChangeToSignUp}>Register</div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 15, padding: '0px 30px' }}>
            {signUp ? <div style={ textBoxClusterStyle }>
              <TextField
                size='small'
                fullWidth
                placeholder="Name"
                id="fullWidth"
                InputLabelProps={{ className: "content-semi-bold-16" }}
                multiline
                rows={1}
                InputProps={{
                  textAlign: 'center',
                }}
                style={ textBoxStyle }
              />
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
                style={ textBoxStyle }
              />
              <TextField
                size='small'
                fullWidth
                placeholder="Username"
                id="fullWidth"
                InputLabelProps={{ className: "content-semi-bold-16" }}
                multiline
                rows={1}
                InputProps={{
                  textAlign: 'center',
                }}
                style={ textBoxStyle }
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
                style={ textBoxStyle }
              />
              <TextField
                size='small'
                fullWidth
                placeholder="Re-type password"
                id="fullWidth"
                InputLabelProps={{ className: "content-semi-bold-16" }}
                multiline
                rows={1}
                InputProps={{
                  textAlign: 'center',
                }}
                style={ textBoxStyle }
              />
            </div> : <div style={ textBoxClusterStyle }>
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
                style={ textBoxStyle }
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
                style={ textBoxStyle }
              />
            </div>}
            {signUp ? 
              <div className="extra-medium">Already have an account?</div>
            :
              <div>
                <div className="extra-medium">Forgot Password?</div>
                <div className="extra-medium">Don't have an account?</div>
              </div>
            }
            {signUp ? 
              <Button>
                Register
              </Button>
            :
              <Button>
                Login
              </Button>
            }
          </div>
          <div style={{ padding: '31px' }}>
            <Divider />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0px 30px' }}>
            <div>
              <Button variant="filled" color="primary" style={ socialMediaButtonStyle}>
                <GoogleIcon />
                Google
              </Button>
            </div>
            <div>
              <Button variant="filled" color="facebook" style={ socialMediaButtonStyle }>
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
