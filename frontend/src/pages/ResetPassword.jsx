import { Footer, OtpInput } from '../components';
import { colors } from '../styles';
import * as React from 'react';
import './../index.css';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { OutlinedInput, IconButton, InputAdornment, FormControl, Button, GlobalStyles, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';

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

const fieldStyle = {
    cursor: 'pointer'
};

export default function ResetPassword() {
    const navigate = useNavigate();
    const [otp, setOtp] = React.useState('');
    const [showPassword, setShowPassword] = React.useState(false);
    const [showRetypePassword, setShowRetypePassword] = React.useState(false);
    const otpLength = 6;

    const onChange = (value) => setOtp(value);

    const handleChangeToForgotPassword = () => navigate('/forgotpassword');
    const handleClickShowPassword = () => setShowPassword(!showPassword);
    const handleMouseDownPassword = () => setShowPassword(!showPassword);
    const handleClickShowRetypePassword = () => setShowRetypePassword(!showRetypePassword);
    const handleMouseDownRetypePassword = () => setShowRetypePassword(!showRetypePassword);

    const handleResetPassword = async (event) => {
        event.preventDefault();

        const form = event.target;
        let otpStr = '';
        const otpLength = form.otp.length;

        for (let i = 0; i < otpLength; ++i) {
            otpStr = otpStr + `${form.otp[i].value}`;
        }
        const otp = otpStr;
        console.log(otp);
        const email = form.email.value;
        const newPassword = form.password.value;
        const confirmPW = form.RePW.value;

        if (!email || !otp || otp === '' || !newPassword || !confirmPW) {
            alert("Please fill in all fields");
            return;
        }

        if (newPassword !== confirmPW) {
            alert("Passwords do not match");
            return;
        }

        const jsonData = JSON.stringify({ email, otp, newPassword });

        try {
            const response = await fetch("/api/v1/forgotpw/reset",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                  },
                body: jsonData,
            });

            if (response.ok) {
                alert("Password reset successful!");
                navigate('/login');
            } else {
                alert("Password reset failed. Please try again!");
            }
        } catch (error) {
            console.error("Error:", error);
        }
    }

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
                            Reset Password
                        </div>
                        <div style={clusterStyle}>
                            <h5 style={{ padding: 0, margin: 0 }}>Enter the verification code sent in your email.</h5>
                            <form
                                onSubmit={handleResetPassword}
                                style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    width: '100%',
                                    gap: 15
                                }}>
                                <OtpInput value={otp} valueLength={otpLength} onChange={onChange} name='otp' />
                                <div style={textBoxClusterStyle}>
                                    <TextField
                                        size="small"
                                        fullWidth
                                        placeholder="Email"
                                        id="fullWidth"
                                        name='email'
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
                                <Button style={{ width: '100%' }} type="submit">Verify</Button>
                            </form>
                            <div
                                className="content-semi-bold-14-22 linkText"
                                onClick={handleChangeToForgotPassword}
                                style={fieldStyle}>
                                If you didn&apos;t receive a code! Resend
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
