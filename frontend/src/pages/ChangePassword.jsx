import { Button, TextField } from '@mui/material';
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
    gap: '45px'
};

export default function ChangePassword() {
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
                        height: 450,
                        border: '1px solid',
                        borderRadius: 7
                    }}>
                    <div style={{ ...clusterStyle, padding: '35px 35px' }}>
                        <div
                            className="subtitle-extra-bold"
                            style={{ color: colors.green6 }}>
                            Change Password
                        </div>
                        <div style={clusterStyle}>
                            <div
                                style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: 25,
                                    width: 364
                                }}>
                                <TextField
                                    size="small"
                                    fullWidth
                                    placeholder="Old password"
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
                                    placeholder="New password"
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
                                    placeholder="Re-type new password"
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
                            <Button style={{ width: '100%' }}>Confirm</Button>
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
