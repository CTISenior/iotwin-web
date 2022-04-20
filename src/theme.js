import { createTheme } from "@mui/material";

const primaryColor = '#2e323c';
const secondaryColor = '#ebeced';
const thirdColor = '#5b7d87';

const customTheme = createTheme({

    palette: {
        primary: {
            main: primaryColor,
        },
        secondary: {
            main: secondaryColor,
        },
        third: {
            main: thirdColor,
        },
        background: {
            default: secondaryColor,
        }
    },
    components: {
        MuiDrawer: {
            styleOverrides: {
                paper: {
                    background: primaryColor,
                }
            }
        },
        MuiListItem: {
            variants: [
                {
                    props: { variant: 'side' },
                    style: {
                        backgroundColor: primaryColor,
                        margin: '3% auto',
                        'box-shadow': '6',
                        borderRadius: 12,
                        padding: '7%',
                        width: "85%",
                        '&:hover': {
                            backgroundColor: thirdColor,
                            opacity: [0.9, 0.8, 0.7],
                        },
                    },
                },
            ],
        },
        MuiListItemText: {
            variants: [
                {
                    props: { variant: 'side' },
                    style: {
                        color: secondaryColor
                    },
                },
            ],
        },
        MuiListItemIcon: {
            variants: [
                {
                    props: { variant: 'side' },
                    style: {
                        color: secondaryColor
                    },
                },
            ],
        },
        MuiIconButton: {
            variants: [
                {
                    props: { variant: 'modal' },
                    style: {
                        color: primaryColor,
                        '&:hover': {
                            backgroundColor: thirdColor,
                            opacity: [0.1, 0.1, 0.1],
                        },
                    },
                },
                {
                    props: { variant: 'layout' },
                    style: {
                        color: secondaryColor,
                        '&:hover': {
                            backgroundColor: thirdColor,
                            opacity: [0.1, 0.1, 0.1],
                        },
                    },
                },
            ],
        },
        MuiTypography: {
            variants: [
                {
                    props: { variant: 'side' },
                    style: {
                        color: secondaryColor,
                        fontSize: '1.25rem'
                    },
                },
                {
                    props: { variant: 'nav' },
                    style: {
                        color: secondaryColor,
                        fontSize: '1.25rem'
                    },
                },
                {
                    props: { variant: 'modal' },
                    style: {
                        color: thirdColor,
                        fontSize: '1.5rem',
                        fontFamily: '"Rockwell"',
                    },
                },
            ],
        },
        MuiAlert: {
            styleOverrides: {
                root: {
                    marginBottom: '0.50rem',
                },
            }
        },
        MuiSnackbar: {
            variants: [
                {
                    props: { variant: 'over' },
                    style: {
                        marginBottom: '3.5rem'
                    },
                }
            ],
        }

    },

});

export default customTheme;