import { Button, GlobalStyles, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Footer } from '../components';
import { colors } from '../styles';
import * as React from 'react';
import './../index.css';

const textBoxStyle = {
    background: colors.primary,
    borderRadius: 8,
    border: '1px solid',
    boderColor: colors.green6,
    width: '100%'
};

const clusterStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '31px'
};

const fieldStyle = {
    cursor: 'pointer'
};

export default function ForgotPassword() {
    const navigate = useNavigate();
    const [sentOTP, setSentOTP] = React.useState(0);

    const handleSendOTP = () => {
        setSentOTP(!sentOTP);
        navigate('/resetpassword');
    };

    const handleChangeToLogin = () => navigate('/login');

    return (
        <div className="containerStyle">
            <GlobalStyles styles={{ '#root': { backgroundColor: '#FFFFFF' } }} />
            <div
                style={{
                    display: 'flex',
                    padding: '100px 100px',
                    justifyContent: 'space-around'
                }}>
                <div
                    style={{
                        width: 422,
                        height: 487,
                        border: '1px solid',
                        borderRadius: 7
                    }}>
                    <div style={{ ...clusterStyle, padding: '35px 35px' }}>
                        <div className="subtitle-extra-bold" style={{ color: colors.green6 }}>
                            Forgot Password
                        </div>
                        <div style={clusterStyle}>
                            <h5 style={{ margin: 0, color: colors.green6 }}>
                                Enter the email address associated with your account.
                            </h5>
                            <h5 style={{ color: colors.green5, margin: 0 }}>
                                We will email you an OTP to reset your password.
                            </h5>
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
                                style={textBoxStyle}
                            />
                            <Button style={{ width: '100%' }} onClick={handleSendOTP}>
                                Send OTP
                            </Button>
                            <div
                                className="content-semi-bold-14-22 linkText"
                                onClick={handleChangeToLogin}
                                style={fieldStyle}>
                                Log in with password
                            </div>
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
