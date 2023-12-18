import { Button, Divider, TextField } from '@mui/material';
import { Footer } from '../components';
import { LogoVoTree_primary } from '../assets/images';
import { colors } from '../styles';
import * as React from 'react';
import { GoogleIcon, FBIcon } from '../assets/icons';
import { useNavigate } from 'react-router-dom';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { updateProfileInfo } from '../redux/features/profile/profileInfoSlice';
import { selectIsLoggedIn, updateIsLoggedIn } from '../redux/features/account/isLoggedInSlice';
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

export default function Login({register = 0}) {
    const [signUp, setSignUp] = React.useState(register);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleChangeToSignUp = () => {
        setSignUp(!signUp);
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

                // navigate('/profile'); // Homepage

                const { profile, store } = await fetchUserInfo();

                if (profile) {
                    dispatch(updateProfileInfo(profile));
                    dispatch(updateIsLoggedIn(true));
                }

                if (store) {
                    dispatch(updateStoreInfo(store));
                    dispatch(updateIsSeller(true));
                }

                // const tmp = useSelector(selectIsLoggedIn);
                // console.log(tmp);

                navigate('/profile'); // Homepage
            } else {
                console.error('Login failed:', response.statusText);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

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
                            onClick={handleChangeToSignUp}>
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
                    <form
                        onSubmit={handleLogin}
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 15,
                            padding: '0px 30px'
                        }}>
                        {signUp ? (
                            <div style={textBoxClusterStyle}>
                                <TextField
                                    size="small"
                                    fullWidth
                                    placeholder="Name"
                                    id="fullWidth"
                                    InputLabelProps={{
                                        className: 'content-semi-bold-16'
                                    }}
                                    multiline
                                    rows={1}
                                    InputProps={{
                                        textAlign: 'center'
                                    }}
                                    style={textBoxStyle}
                                />
                                <TextField
                                    size="small"
                                    fullWidth
                                    placeholder="Email"
                                    id="fullWidth"
                                    InputLabelProps={{
                                        className: 'content-semi-bold-16'
                                    }}
                                    multiline
                                    rows={1}
                                    InputProps={{
                                        textAlign: 'center'
                                    }}
                                    style={textBoxStyle}
                                />
                                <TextField
                                    size="small"
                                    fullWidth
                                    placeholder="Username"
                                    id="fullWidth"
                                    InputLabelProps={{
                                        className: 'content-semi-bold-16'
                                    }}
                                    multiline
                                    rows={1}
                                    InputProps={{
                                        textAlign: 'center'
                                    }}
                                    style={textBoxStyle}
                                />
                                <TextField
                                    size="small"
                                    fullWidth
                                    placeholder="Password"
                                    id="fullWidth"
                                    InputLabelProps={{
                                        className: 'content-semi-bold-16'
                                    }}
                                    multiline
                                    rows={1}
                                    InputProps={{
                                        textAlign: 'center'
                                    }}
                                    style={textBoxStyle}
                                />
                                <TextField
                                    size="small"
                                    fullWidth
                                    placeholder="Re-type password"
                                    id="fullWidth"
                                    InputLabelProps={{
                                        className: 'content-semi-bold-16'
                                    }}
                                    multiline
                                    rows={1}
                                    InputProps={{
                                        textAlign: 'center'
                                    }}
                                    style={textBoxStyle}
                                />
                            </div>
                        ) : (
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
                                    InputProps={{
                                        textAlign: 'center'
                                    }}
                                    style={textBoxStyle}
                                />
                                <TextField
                                    size="small"
                                    fullWidth
                                    placeholder="Password"
                                    id="fullWidth"
                                    name="password"
                                    InputLabelProps={{
                                        className: 'content-semi-bold-16'
                                    }}
                                    multiline
                                    rows={1}
                                    InputProps={{
                                        textAlign: 'center'
                                    }}
                                    style={textBoxStyle}
                                />
                            </div>
                        )}
                        {signUp ? (
                            <div className="extra-medium" onClick={handleChangeToSignUp} style={fieldStyle}>
                                Already have an account?
                            </div>
                        ) : (
                            <div>
                                <div className="extra-medium">Forgot Password?</div>
                                <div className="extra-medium" onClick={handleChangeToSignUp} style={fieldStyle}>
                                    Don&apos;t have an account?
                                </div>
                            </div>
                        )}
                        {signUp ? <Button>Register</Button> : <Button type="submit">Login</Button>}
                    </form>
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
