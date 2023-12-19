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

const errorStyle = {
    color: colors.decline
}

export default function ForgotPassword() {
    const navigate = useNavigate();
    const [errorMessages, setErrorMessages] = React.useState({});

    const handleSendOTP = async (event) => {
        event.preventDefault();

        const email = event.target.email.value;

        if (!validateEmail(email) || !email.trim()) {
            showError('email', 'Please fill out a valid email format');
            return;
        }

        try {
            const response = await fetch('/api/v1/forgotpw', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            });

            if (response.ok) {
                navigate('/resetpassword');
            } else {
                alert(`Error:' ${response.status}`);
                console.error('Error:', response.status);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const showError = (inputId, errorMessage = 'required') => {
        setErrorMessages((prevErrors) => ({
          ...prevErrors,
          [inputId]: errorMessage,
        }));
    };

    const validateEmail = (email) => {
        return String(email)
          .toLowerCase()
          .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
          );
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
                        height: 450,
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
                            <form
                                onSubmit={handleSendOTP}
                                style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: 15,
                                    width: '100%'
                                }}>
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
                                <Button style={{ width: '100%' }} type="submit">
                                    Send OTP
                                </Button>
                            </form>
                            <div
                                className="content-semi-bold-14-22 linkText"
                                onClick={handleChangeToLogin}
                                style={fieldStyle}>
                                    <span>Log in with password</span>
                            </div>
                            <span id="email-error" style={{...errorStyle}} className='content-semi-bold-16'>{errorMessages['email']}</span>
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
