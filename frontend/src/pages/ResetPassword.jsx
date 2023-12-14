import { Button, TextField } from '@mui/material';
import { Footer, OtpInput } from '../components';
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

const textBoxClusterStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: 12
};

export default function ResetPassword() {
    const [sentOTP, setSentOTP] = React.useState(0);
    const [otp, setOtp] = React.useState('');
    const otpLength = 6;

    const handleSendOTP = () => {
        setSentOTP(!sentOTP);
    };

    const onChange = (value) => setOtp(value);

    return (
        <div className="containerStyle">
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
                        <div
                            className="subtitle-extra-bold"
                            style={{ color: colors.green6 }}>
                            Reset Password
                        </div>
                        {sentOTP ? (
                            <div style={clusterStyle}>
                                <h5 style={{ padding: 0, margin: 0 }}>
                                    Enter the verification code sent in your
                                    email.
                                </h5>
                                <form
                                    style={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        width: '100%',
                                        gap: 15
                                    }}>
                                    <OtpInput
                                        value={otp}
                                        valueLength={otpLength}
                                        onChange={onChange}
                                    />
                                    <div style={textBoxClusterStyle}>
                                        <TextField
                                            size="small"
                                            fullWidth
                                            placeholder="Email"
                                            id="fullWidth"
                                            InputLabelProps={{
                                                className:
                                                    'content-semi-bold-16'
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
                                                className:
                                                    'content-semi-bold-16'
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
                                                className:
                                                    'content-semi-bold-16'
                                            }}
                                            multiline
                                            rows={1}
                                            InputProps={{
                                                textAlign: 'center'
                                            }}
                                            style={textBoxStyle}
                                        />
                                    </div>
                                    <Button style={{ width: '100%' }}>
                                        Verify
                                    </Button>
                                </form>
                                <div className="content-semi-bold-14-22">
                                    If you didn&apos;t receive a code! Resend
                                </div>
                            </div>
                        ) : (
                            <div style={clusterStyle}>
                                <h5 style={{ margin: 0, color: colors.green6 }}>
                                    Enter the email address associated with your
                                    account.
                                </h5>
                                <h5 style={{ color: colors.green5, margin: 0 }}>
                                    We will email you an OTP to reset your
                                    password.
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
                                    InputProps={{
                                        textAlign: 'center'
                                    }}
                                    style={textBoxStyle}
                                />
                                <Button
                                    style={{ width: '100%' }}
                                    onClick={handleSendOTP}>
                                    Send OTP
                                </Button>
                                <div className="content-semi-bold-14-22">
                                    Log in with password
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <div>
                <Footer className="footerStyle" />
            </div>
        </div>
    );
}
