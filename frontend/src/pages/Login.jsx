import { Button, Divider, TextField, OutlinedInput, IconButton, InputAdornment, FormControl } from '@mui/material';
import { Footer } from '../components';
import { LogoVoTree_primary } from '../assets/images';
import { colors } from '../styles';
import * as React from 'react';
import { GoogleIcon, FBIcon } from '../assets/icons';
import { useNavigate } from 'react-router-dom';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

// Redux
import { useDispatch } from 'react-redux';
import { updateProfileInfo } from '../redux/features/profile/profileInfoSlice';
import { updateIsLoggedIn } from '../redux/features/account/isLoggedInSlice';
import { updateStoreInfo } from '../redux/features/profile/storeInfoSlice';
import { updateIsSeller } from '../redux/features/account/isSellerSlice';

// Utils
import { fetchUserInfo } from '../utils/apiUtils';

const textBoxStyle = {
    background: colors.primary,
    borderRadius: 8,
    border: '1px solid',
    boderColor: colors.green6,
    width: '100%'
};

const textBoxClusterStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: 12
};

const socialMediaButtonStyle = {
    width: 172,
    gap: 30
};

const fieldStyle = {
    cursor: 'pointer'
};

export default function Login() {
    const [signUp, setSignUp] = React.useState(0);
    const [showPassword, setShowPassword] = React.useState(false);
    const [showRetypePassword, setShowRetypePassword] = React.useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleChangeToSignUp = () => {
        setSignUp(true);
    };

    const handleChangeToSignIn = () => {
        setSignUp(false);
    };

    const handleChangeToForgotPassword = () => {
        navigate('/forgotpassword');
    };

    const handleLogin = async (event) => {
        event.preventDefault();

        const form = event.target;
        const account = form.account.value;
        const password = form.password.value;
        const jsonData = JSON.stringify({ account, password });

        try {
            const response = await fetch('/api/v1/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: jsonData,
                credentials: 'include'
            });

            if (response.ok) {
                console.log('Login successful');

                const { profile, store } = await fetchUserInfo();

                if (profile) {
                    dispatch(updateProfileInfo(profile));
                    dispatch(updateIsLoggedIn(true));
                }

                if (store) {
                    dispatch(updateStoreInfo(store));
                    dispatch(updateIsSeller(true));
                }

                navigate('/');
            } else {
                console.error('Login failed:', response.statusText);
                alert(`Login failed: ${response.statusText}`);
            }
        } catch (error) {
            console.error('Error:', error);
            alert(`'Error: ${error}`);
        }
    };

    const handleRegister = async (event) => {
        event.preventDefault();

        const form = event.target;
        const fullName = form.fullName.value;
        const email = form.email.value;
        const userName = form.userName.value;
        const password = form.password.value;
        const rePW = form.RePW.value;

        if (password !== rePW) {
            alert('Confirm password unsuccessful!');
            return;
        }

        const jsonData = JSON.stringify({ fullName, email, userName, password });

        try {
            const response = await fetch('/api/v1/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: jsonData
            });

            if (response.ok) {
                alert('Register successful!');
                navigate('/login');
                handleChangeToSignIn();
            } else {
                const errorData = await response.json();
                if (errorData && errorData.msg) {
                    alert(`Registration failed: ${errorData.msg}`);
                } else {
                    alert('Registration failed. Please try again!');
                }
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred during registration. Please try again later!');
        }
    };

    const handleClickShowPassword = () => setShowPassword(!showPassword);
    const handleMouseDownPassword = () => setShowPassword(!showPassword);
    const handleClickShowRetypePassword = () => setShowRetypePassword(!showRetypePassword);
    const handleMouseDownRetypePassword = () => setShowRetypePassword(!showRetypePassword);

    return (
        <div className="containerStyle">
            <div
                className="contentStyle"
                style={{
                    display: 'flex',
                    padding: '100px 100px',
                    justifyContent: 'space-around',
                    alignItems: 'center'
                }}>
                <div>
                    <img src={LogoVoTree_primary} alt="" width="602" height="222" />
                </div>
                <div
                    style={{
                        background: colors.green1,
                        height: signUp ? 587 : 487,
                        width: 422,
                        borderRadius: 7
                    }}>
                    <div
                        style={{
                            display: 'flex',
                            gap: 21,
                            paddingLeft: 30,
                            paddingBottom: 30,
                            paddingTop: 35
                        }}>
                        <div
                            className="subtitle-semi-bold-20"
                            style={{
                                ...fieldStyle,
                                opacity: signUp ? '15%' : '100%'
                            }}
                            onClick={handleChangeToSignIn}>
                            Log in
                        </div>
                        <div
                            className="subtitle-semi-bold-20"
                            style={{
                                ...fieldStyle,
                                opacity: signUp ? '100%' : '15%'
                            }}
                            onClick={handleChangeToSignUp}>
                            Register
                        </div>
                    </div>
                    {signUp ? (
                        <form
                            onSubmit={handleRegister}
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: 15,
                                padding: '0px 30px'
                            }}>
                            <div style={textBoxClusterStyle}>
                                <TextField
                                    size="small"
                                    fullWidth
                                    placeholder="User name"
                                    id="fullWidth"
                                    name="userName"
                                    InputLabelProps={{
                                        className: 'content-semi-bold-16'
                                    }}
                                    multiline
                                    rows={1}
                                    style={textBoxStyle}
                                />
                                <TextField
                                    size="small"
                                    fullWidth
                                    placeholder="Your name"
                                    id="fullWidth"
                                    name="fullName"
                                    InputLabelProps={{
                                        className: 'content-semi-bold-16'
                                    }}
                                    multiline
                                    rows={1}
                                    style={textBoxStyle}
                                />
                                <TextField
                                    size="small"
                                    fullWidth
                                    placeholder="Email"
                                    id="fullWidth"
                                    name="email"
                                    InputLabelProps={{
                                        className: 'content-semi-bold-16'
                                    }}
                                    multiline
                                    rows={1}
                                    style={textBoxStyle}
                                />
                                <FormControl style={textBoxClusterStyle}>
                                    <OutlinedInput
                                        size="small"
                                        fullWidth
                                        placeholder="Password"
                                        id="fullWidth"
                                        name="password"
                                        type={showPassword ? 'text' : 'password'}
                                        rows={1}
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={handleClickShowPassword}
                                                    onMouseDown={handleMouseDownPassword}
                                                    edge="end">
                                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                        label="Password"
                                        style={textBoxStyle}
                                    />
                                </FormControl>
                                <FormControl style={textBoxClusterStyle}>
                                    <OutlinedInput
                                        size="small"
                                        fullWidth
                                        placeholder="Re-type password"
                                        id="fullWidth"
                                        name="RePW"
                                        type={showRetypePassword ? 'text' : 'password'}
                                        rows={1}
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle Re-type password visibility"
                                                    onClick={handleClickShowRetypePassword}
                                                    onMouseDown={handleMouseDownRetypePassword}
                                                    edge="end">
                                                    {showRetypePassword ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                        label="Retype password"
                                        style={textBoxStyle}
                                    />
                                </FormControl>
                            </div>
                            <div className="extra-medium" onClick={handleChangeToSignIn} style={fieldStyle}>
                                Already have an account?
                            </div>
                            <Button type="submit">Register</Button>
                        </form>
                    ) : (
                        <form
                            onSubmit={handleLogin}
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: 15,
                                padding: '0px 30px'
                            }}>
                            <div style={textBoxClusterStyle}>
                                <TextField
                                    size="small"
                                    fullWidth
                                    placeholder="Account"
                                    id="fullWidth"
                                    name="account"
                                    InputLabelProps={{
                                        className: 'content-semi-bold-16'
                                    }}
                                    multiline
                                    rows={1}
                                    style={textBoxStyle}
                                />
                                <FormControl style={textBoxClusterStyle}>
                                    <OutlinedInput
                                        size="small"
                                        fullWidth
                                        placeholder="Password"
                                        id="fullWidth"
                                        name="password"
                                        type={showPassword ? 'text' : 'password'}
                                        rows={1}
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={handleClickShowPassword}
                                                    onMouseDown={handleMouseDownPassword}
                                                    edge="end">
                                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                        label="Password"
                                        style={textBoxStyle}
                                    />
                                </FormControl>
                            </div>
                            <div>
                                <div className="extra-medium" onClick={handleChangeToForgotPassword} style={fieldStyle}>
                                    Forgot Password?
                                </div>
                                <div className="extra-medium" onClick={handleChangeToSignUp} style={fieldStyle}>
                                    Don&apos;t have an account?
                                </div>
                            </div>
                            <Button type="submit">Log in</Button>
                        </form>
                    )}
                    <div style={{ padding: '31px' }}>
                        <Divider />
                    </div>
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            padding: '0px 30px'
                        }}>
                        <div>
                            <Button variant="filled" color="primary" style={socialMediaButtonStyle}>
                                <GoogleIcon />
                                Google
                            </Button>
                        </div>
                        <div>
                            <Button variant="filled" color="facebook" style={socialMediaButtonStyle}>
                                <FBIcon />
                                Facebook
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <Footer className="footerStyle" />
            </div>
        </div>
    );
}
