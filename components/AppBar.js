import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Drawer from './Drawer';
import NavBar from './NavBar';

export default function ButtonAppBar() {
    return (
            <Box sx={{ flexGrow: 1 }} className="dark:bg-black">
                <AppBar position="static" className="dark:bg-black">
                    <Toolbar>
                        <Drawer />
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                            <NavBar />
                        </Typography>
                    </Toolbar>
                </AppBar>
            </Box>
    );
}