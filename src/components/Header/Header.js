import './Header.css';

import React from 'react'
import { Link } from "react-router-dom";
import { AppBar, Container, createTheme, MenuItem, Select, ThemeProvider, Toolbar, Typography } from '@mui/material'
import CryptoContext from '../../CryptoContext';
import { useContext } from 'react';


const Header = () => {

    const darkTheme = createTheme({
        palette: {
          mode: 'dark',
        },
    });

    const { currentCurrency, setCurrentCurrency } = useContext(CryptoContext);

    return (
        <ThemeProvider theme={darkTheme}>
            <AppBar color='transparent' position='static'>
                <Container>
                    <Toolbar>
                        <Typography 
                            className="title"
                            variant='h5'
                            style={{
                                width: 100,
                                height: 40,
                                marginRight: 15
                            }}
                        >
                            <Link to='/'>Crypto Tracker</Link>
                        </Typography>
                        <Select 
                            variant='outlined'
                            style={{
                                width: 100,
                                height: 40,
                                marginLeft: 15,
                            }}
                            value={currentCurrency}
                            onChange={(e) => setCurrentCurrency(e.target.value)}
                        >
                            <MenuItem value={'USD'}>USD</MenuItem>
                            <MenuItem value={'EUR'}>EUR</MenuItem>
                        </Select>
                    </Toolbar>
                </Container>
            </AppBar>
        </ThemeProvider>
    )
}

export default Header