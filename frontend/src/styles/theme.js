import { createTheme } from "@mui/material";
import colors from "./color";

const theme = createTheme({
    palette: {
        primary: {
            main: colors.primary,
        },
        secondary: {
            main: colors.secondary,
        },
        success: {
            main: colors.success,
        },
        pending: {
            main: colors.pending,
        },
        decline: {
            main: colors.decline,
        },
        ratings: {
            main: colors.ratings,
        },
    },
    typography: {
        fontFamily: '"Inter"',
    },
    components: {
        MuiButton: {
            variants: [
                {
                    props: { variant: 'filled', color: 'primary' },
                    style: {
                        background: colors.secondary,
                        color: colors.green6,
                        fontSize: '20.3px',
                        fontWeight: 600,
                        '&:hover': {
                            background: colors.green1,
                            color: colors.green6,
                        }
                    }
                },
                {
                    props: { variant: 'filled', color: 'secondary' },
                    style: {
                        background: colors.green1,
                        color: colors.green4,
                        fontSize: '20.3px',
                        fontWeight: 600,
                        '&:hover': {
                            background: colors.secondary,
                            color: colors.green4,
                        }
                    }
                },
                {
                    props: { variant: 'disable' },
                    style: {
                        background: colors.green1,
                        color: colors.primary,
                        '&:hover': {
                          background: colors.green1,
                          color: colors.primary
                        }
                      }
                },
            ],
            styleOverrides: {
                root: {
                    minWidth: "155px",
                    boxShadow: "0px 0px 1px 0px",
                    background: colors.green4,
                    textTransform: 'inherit',
                    fontSize: '20.3px',
                    fontWeight: 600,
                    color: colors.primary,
                    '&.Mui-disabled': {
                        background: colors.green1,
                    },
                    '&:hover': {
                        background: colors.green3,
                        boxShadow: "0px 0px 1px 0px",
                        fontWeight: 600,
                        fontSize: '20.3px',
                    },
                },
            },
        },
        MuiAvatar: {
            variants: [
                {
                    props: { variant: 'small' },
                    style: {
                        fontSize: 20.25,
                        fontWeight: '50px',
                        width: '50px',
                        height: '50px',
                    }
                },
                {
                    props: { variant: 'icon' },
                    style: {
                        width: '50px',
                        height: '50px',
                        background: colors.secondary,
                    }
                },
                {
                    props: { variant: 'icon-clicked' },
                    style: {
                        width: '50px',
                        height: '50px',
                        background: colors.green2,
                    }
                },
            ],
            styleOverrides: {
              root: {
                backgroundColor: colors.green4,
                color: colors.secondary,
                fontSize: 28.83,
                fontWeight: 500,
                fontWeight: '500px',
                width: '68px',
                height: '68px',
              },
            },
        },
        MuiBottomNavigation: {
            styleOverrides: {
                root: {
                  backgroundColor: colors.green1,
                  color: colors.green5,
                  width: '299px',
                  height: '71px',
                },
            },
        },
        MuiDivider: {
            variants: [
                {
                    props: { variant: 'slighter' },
                    style: {
                        backgroundColor: colors.green1,
                    }
                },
            ],
            styleOverrides: {
                root: {
                  backgroundColor: colors.green6,
                },
            },
        },
        MuiCard: {
            variants: [
                {
                    props: { variant: 'product' },
                    style: {
                        maxWidth: 388,
                        height: 353,
                    }
                },
            ],
            styleOverrides: {
                root: {
                  backgroundColor: colors.primary,
                  borderRadius: '2%',
                },
            },
        },
        MuiCardMedia: {
            variants: [
                {
                    props: { variant: 'product' },
                    style: {
                        maxWidth: 388,
                        height: 236,
                    }
                },
            ],
            styleOverrides: {
                root: {
                  backgroundColor: colors.primary,
                },
            },
        },
    },
});

export default theme;