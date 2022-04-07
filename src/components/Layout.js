import * as React from 'react';
import { BrowserRouter, Route, Routes, Switch, Navigate, useHistory } from "react-router-dom";
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ArrowCircleRightSharpIcon from '@mui/icons-material/ArrowCircleRightSharp';
import ArrowCircleLeftSharpIcon from '@mui/icons-material/ArrowCircleLeftSharp';
import TimelineSharpIcon from '@mui/icons-material/TimelineSharp';
import SensorsSharpIcon from '@mui/icons-material/SensorsSharp';
import ApartmentSharpIcon from '@mui/icons-material/ApartmentSharp';
import ManageAccountsSharpIcon from '@mui/icons-material/ManageAccountsSharp';
import ExitToAppSharpIcon from '@mui/icons-material/ExitToAppSharp';
import { useKeycloak } from "@react-keycloak/web";
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Badge from '@mui/material/Badge';
import { Link } from '@mui/material';
import Dashboard from './Dashboard';
import Navigation from '../helpers/Navigation';
import PrivateRoute from '../helpers/PrivateRoute';
import Devices from './Devices';

const drawerWidth = 200;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: `-${drawerWidth}px`,
        ...(open && {
            transition: theme.transitions.create('margin', {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen,
            }),
            marginLeft: 0,
        }),
    }),
);
const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: `${drawerWidth}px`,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
}));




export default function PersistentDrawerLeft() {
    const theme = useTheme();
    const { keycloak, initialized } = useKeycloak();
    const isObserver = keycloak.hasRealmRole("observer");
    const isAdmin = keycloak.hasRealmRole("admin");
    const isCreator = keycloak.hasRealmRole("creator");
    let DrawerContent = [

    ];
    if (isAdmin) {
        DrawerContent = [
            { text: "Dashboard", Icon: <TimelineSharpIcon fontSize='large' />, path: "/dashboard" },
            { text: "Devices", Icon: <SensorsSharpIcon fontSize='large' />, path: "/devices" },
            { text: "Building", Icon: <ApartmentSharpIcon fontSize='large' />, path: "/buildings" },
            { text: "Settings", Icon: <ManageAccountsSharpIcon fontSize='large' />, path: "/settings" },
        ];
    }
    else if (isCreator) {
        DrawerContent = [
            { text: "Devices", Icon: <SensorsSharpIcon fontSize='large' />, path: "/devices" },
            { text: "Building", Icon: <ApartmentSharpIcon fontSize='large' />, path: "/buildings" },
            { text: "Settings", Icon: <ManageAccountsSharpIcon fontSize='large' />, path: "/settings" },
        ];
    }
    else if (isObserver) {
        DrawerContent = [
            { text: "Dashboard", Icon: <TimelineSharpIcon fontSize='large' />, path: "/dashboard" },
            { text: "Settings", Icon: <ManageAccountsSharpIcon fontSize='large' />, path: "/settings" },
        ];
    }



    const [open, setOpen] = React.useState(true);


    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };


    const [anchorEl, setAnchorEl] = React.useState(null);

    const isMenuOpen = Boolean(anchorEl);

    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };
    const handleLogout = () => {
        setAnchorEl(null);
        keycloak.logout();
    }
    const menuId = 'primary-search-account-menu';
    const renderMenu = (
        <Menu
            sx={{ mt: '30px' }}
            marginLeft={"auto"}
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id={menuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </Menu>
    );

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar position="fixed" open={open}>
                <Toolbar>
                    <IconButton
                        variant='nav'
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        sx={{ mr: 2, ...(open && { display: 'none' }) }}
                    >
                        <ArrowCircleRightSharpIcon fontSize='large' />
                    </IconButton>

                    {!open && <Typography variant="nav" noWrap component="div">
                        IoTwin
                    </Typography>}

                    <Box marginLeft={"auto"}>
                        <IconButton
                            size="large"
                            aria-label="show 17 new notifications"
                            variant="nav"
                        >
                            <Badge badgeContent={17} color="error">
                                <NotificationsIcon />
                            </Badge>
                        </IconButton>
                        <IconButton
                            size="large"
                            edge="end"
                            aria-label="account of current user"
                            aria-controls={menuId}
                            aria-haspopup="true"
                            onClick={handleProfileMenuOpen}
                            variant='nav'
                            sx={{
                                borderRadius: 2,
                                mx: 1,
                            }}
                        >
                            <AccountCircle />
                            <Typography sx={{ ml: "10px" }} variant="nav" noWrap component="div">
                                Admin
                            </Typography>
                        </IconButton>

                    </Box>
                </Toolbar>
            </AppBar>
            {renderMenu}
            <Drawer
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                    },
                }}
                variant="persistent"
                anchor="left"
                open={open}
            >
                <DrawerHeader>
                    <Typography marginRight={"auto"} variant="side" noWrap component="div">
                        IoTwin
                    </Typography>
                    <IconButton variant='side' onClick={handleDrawerClose}>
                        <ArrowCircleLeftSharpIcon fontSize='large' />
                    </IconButton>
                </DrawerHeader>
                <Divider />
                <List >
                    {DrawerContent.map((content, index) => (
                        <ListItem button key={content.text} variant='side' component={Link} href={content.path} >
                            <ListItemIcon  >
                                {content.Icon}
                            </ListItemIcon>
                            <ListItemText primary={content.text} />
                        </ListItem>
                    ))}
                    <ListItem variant='side' onClick={() => keycloak.logout()} button key={"logout"}>
                        <ListItemIcon   >
                            <ExitToAppSharpIcon fontSize='large' />
                        </ListItemIcon>
                        <ListItemText primary={"Logout"} />
                    </ListItem>

                </List>
            </Drawer>
            <Main sx={{ mt: "60px" }} open={open}>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<>
                            <Navigation />

                        </>
                        } />
                        <Route path="/devices" element={<>
                            <PrivateRoute>
                                <Devices />
                            </PrivateRoute>
                        </>
                        } />
                        <Route path="/dashboard" element={<>
                            <PrivateRoute>
                                <Dashboard />
                            </PrivateRoute>
                        </>
                        } />
                    </Routes>
                </BrowserRouter>
            </Main>
        </Box >
    );
}
