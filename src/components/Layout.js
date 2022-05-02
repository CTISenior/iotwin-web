import * as React from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { styled } from '@mui/material/styles';
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
import DashboardDevices from './DashboardDevices';
import Dashboard from './Dashboard'
import Navigation from '../helpers/Navigation';
import PrivateRoute from '../helpers/PrivateRoute';
import Devices from './Devices';
import Assets from './Assets';
import NotificationList from './NotificationList';
import Monitor from './Monitor';
import Settings from './Settings';

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
    const { keycloak } = useKeycloak();
    const isObserver = keycloak.hasRealmRole("observer");
    const isAdmin = keycloak.hasRealmRole("admin");
    const isCreator = keycloak.hasRealmRole("creator");
    const tenantID = keycloak.realm;
    const [alertCount, setAlertCount] = React.useState(null);
    console.log(keycloak.realm);
    console.log(isObserver);

    let DrawerContent = [];
    if (isAdmin) {
        DrawerContent = [
            { text: "Dashboard", Icon: <TimelineSharpIcon fontSize='large' />, path: "/dashboard" },
            { text: "Assets", Icon: <ApartmentSharpIcon fontSize='large' />, path: "/assets" },
            { text: "Devices", Icon: <SensorsSharpIcon fontSize='large' />, path: "/devices" },
            { text: "Settings", Icon: <ManageAccountsSharpIcon fontSize='large' />, path: "/settings" },
        ];
    }
    else if (isCreator) {
        DrawerContent = [
            { text: "Assets", Icon: <ApartmentSharpIcon fontSize='large' />, path: "/assets" },
            { text: "Devices", Icon: <SensorsSharpIcon fontSize='large' />, path: "/devices" },
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
    const [anchorElNotification, setAnchorElNotification] = React.useState(null);

    const isMenuOpen = Boolean(anchorEl);
    const openNotification = Boolean(anchorElNotification);

    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClickNotificationOpen = (event) => {
        setAnchorElNotification(event.currentTarget);
    }

    const handleClickNotificationClose = () => {
        setAnchorElNotification(null);
    }

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
            sx={{ mt: '30px', marginLeft: "auto" }}

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
                        variant='layout'
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

                    <Box sx={{ marginLeft: "auto" }} >

                        {(isAdmin || isObserver) && (
                            <IconButton
                                size="large"
                                aria-label="show 17 new notifications"
                                variant="layout"
                                onClick={handleClickNotificationOpen}
                            >
                                <Badge badgeContent={alertCount} color="error"
                                    anchorOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                >
                                    <NotificationsIcon />
                                </Badge>
                            </IconButton>
                        )}
                        <NotificationList anchorEl={anchorElNotification} open={openNotification} handleClose={handleClickNotificationClose} tenantID={tenantID} setAlertCount={setAlertCount} />
                        <IconButton
                            size="large"
                            edge="end"
                            aria-label="account of current user"
                            aria-controls={menuId}
                            aria-haspopup="true"
                            onClick={handleProfileMenuOpen}
                            variant='layout'
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
                    <IconButton variant='layout' onClick={handleDrawerClose}>
                        <ArrowCircleLeftSharpIcon fontSize='large' />
                    </IconButton>
                </DrawerHeader>
                <Divider />
                <List >
                    {DrawerContent.map((content, index) => (
                        <ListItem button key={content.text} variant='side' component={Link} href={content.path} >
                            <ListItemIcon variant='side'  >
                                {content.Icon}
                            </ListItemIcon>
                            <ListItemText variant="side" primary={content.text} />
                        </ListItem>
                    ))}
                    <ListItem variant='side' onClick={() => keycloak.logout()} button key={"logout"}>
                        <ListItemIcon variant='side'    >
                            <ExitToAppSharpIcon fontSize='large' />
                        </ListItemIcon>
                        <ListItemText variant="side" primary={"Logout"} />
                    </ListItem>

                </List>
            </Drawer>
            {isAdmin && (

                <Main sx={{ mt: "60px" }} open={open}>

                    <BrowserRouter>
                        <Routes>
                            <Route path="/" element={<>
                                <Navigation />

                            </>
                            } />
                            <Route path="/dashboard" element={<>
                                <PrivateRoute>
                                    <Dashboard tenantID={tenantID} />
                                </PrivateRoute>
                            </>
                            } />
                            <Route path="/dashboard/devices" element={<>
                                <PrivateRoute>
                                    <DashboardDevices tenantID={tenantID} />
                                </PrivateRoute>
                            </>
                            } />
                            <Route path="/dashboard/monitor/:sn/:id/:name/:building_id/:types" element={<>
                                <PrivateRoute>
                                    <Monitor />
                                </PrivateRoute>
                            </>
                            } />
                            <Route path="/assets" element={<>
                                <PrivateRoute>
                                    <Assets tenantID={tenantID} />
                                </PrivateRoute>
                            </>
                            } />
                            <Route path="/devices" element={<>
                                <PrivateRoute>
                                    <Devices tenantID={tenantID} />
                                </PrivateRoute>
                            </>
                            } />
                            <Route path="/settings" element={<>
                                <PrivateRoute>
                                    <Settings tenantID={tenantID} />
                                </PrivateRoute>
                            </>
                            } />
                        </Routes>
                    </BrowserRouter>

                </Main>
            )}

        </Box >
    );
}
