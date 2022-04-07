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
                    background: "white",
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
            styleOverrides: {
                root: {
                    color: secondaryColor,

                },
            }
        },
        MuiListItemIcon: {
            styleOverrides: {
                root: {
                    color: secondaryColor,
                }
            }
        },
        MuiIconButton: {
            variants: [
                {
                    props: { variant: 'side' },
                    style: {
                        color: primaryColor,
                        '&:hover': {
                            backgroundColor: secondaryColor,
                            opacity: [0.1, 0.1, 0.1],
                        },
                    },
                },
                {
                    props: { variant: 'nav' },
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
                        color: primaryColor,
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
            ],
        },
    },

});

export default customTheme;