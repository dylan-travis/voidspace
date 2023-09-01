import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import EditCalendarIcon from '@mui/icons-material/EditCalendar';
import CallIcon from '@mui/icons-material/Call';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LogoutIcon from '@mui/icons-material/Logout';
import LoginIcon from '@mui/icons-material/Login';
import { signOut, signIn, useSession } from "next-auth/react"


type Anchor = 'top' | 'left' | 'bottom' | 'right';

export default function TemporaryDrawer() {
    const { data: session, status } = useSession()
    const [state, setState] = React.useState({
        top: false,
        left: false,
        bottom: false,
        right: false,
    });

    const toggleDrawer =
        (anchor: Anchor, open: boolean) =>
            (event: React.KeyboardEvent | React.MouseEvent) => {
                if (
                    event.type === 'keydown' &&
                    ((event as React.KeyboardEvent).key === 'Tab' ||
                        (event as React.KeyboardEvent).key === 'Shift')
                ) {
                    return;
                }

                setState({ ...state, [anchor]: open });
            };

    const iconMapping = {
        'Home': <HomeIcon />,
        'Booking': <EditCalendarIcon />,
        'Contact': <CallIcon />,
        'Profile': <AccountCircleIcon />,
        'Cart': <ShoppingCartIcon />,
        'Logout': <LogoutIcon />,
        'Login': <LoginIcon />
        };

        const linkMapping = {
            'Home': '/',
            'Booking': '/booking',
            'Contact': '/contact',
            'Profile': '/profile',
            'Cart': '/cart',
            'Login': '/login',
            'Logout': '/logout'
            };

              

    const list = (anchor: Anchor) => (
        <Box
            sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
            role="presentation"
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}
        >
            <List>
                {['Home', 'Booking', 'Contact', ].map((text) => (
                    <ListItem key={text} disablePadding>
                        <ListItemButton href={linkMapping[text]}>
                            <ListItemIcon>
                                {iconMapping[text]}
                            </ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
            <Divider />
            {status === 'authenticated' && (
            <List>
                {['Profile', 'Cart', 'Logout'].map((text) => (
                    <ListItem key={text} disablePadding>
                        <ListItemButton href={linkMapping[text]}>
                            <ListItemIcon>
                                {iconMapping[text]}
                            </ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
            )}
            {status === 'unauthenticated' && (
            <List>
                {['Login'].map((text) => (
                    <ListItem key={text} disablePadding>
                        <ListItemButton href={linkMapping[text]}>
                            <ListItemIcon>
                                {iconMapping[text]}
                            </ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
            )}
        </Box>
    );

    return (
        <div>
            {(['left'] as const).map((anchor) => (
                <React.Fragment key={anchor}>
                    <Button onClick={toggleDrawer(anchor, true)}>
                            <MenuIcon color="secondary">
                            {anchor}
                            </MenuIcon>
                        </Button>
                    <Drawer
                        anchor={anchor}
                        open={state[anchor]}
                        onClose={toggleDrawer(anchor, false)}
                    >
                        {list(anchor)}
                    </Drawer>
                </React.Fragment>
            ))}
        </div>
    );
}