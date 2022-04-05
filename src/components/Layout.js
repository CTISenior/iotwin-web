import React from "react";
import Header from "./Header";
import { ThemeProvider } from "@emotion/react";
import customTheme from '../theme';
const drawerWidth = 200;

function Layout() {
    return (
        <React.Fragment>
            <ThemeProvider theme={customTheme}>
                <Header></Header>
            </ThemeProvider>
        </React.Fragment>
    )
}

export default Layout;