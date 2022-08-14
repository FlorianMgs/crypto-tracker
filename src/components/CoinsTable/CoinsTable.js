import React from 'react'
import { CoinList } from '../../config/api'
import axios from 'axios'
import CryptoContext from '../../CryptoContext'
import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { createTheme, LinearProgress, TableContainer, Table, TextField, ThemeProvider, Typography, TableHead, TableRow, TableCell, TableBody, Pagination } from '@mui/material'
import { Container } from '@mui/system'
import { numberWithCommas } from '../Banner/Carousel'


const CoinsTable = () => {

    const darkTheme = createTheme({
        palette: {
          mode: 'dark',
        },
    });

    const [coins, setCoins] = React.useState([])
    const [loading, setLoading] = React.useState(false)
    const [search, setSearch] = React.useState('')
    const [page, setPage] = React.useState(1)

    const {currentCurrency, symbol} = useContext(CryptoContext)
    
    const fetchCoins = async () => {
        setLoading(true)
        const { data } = await axios.get(
            CoinList(currentCurrency)
        )
        setCoins(data)
        setLoading(false)
    }

    React.useEffect(() => {
        fetchCoins()
    }, [currentCurrency])


    const handleSearch = () => {
        return coins.filter((coin) => 
            coin.name.toLowerCase().includes(search.toLowerCase()) ||
            coin.symbol.toLowerCase().includes(search.toLowerCase())
        )
    }

    return (
        <ThemeProvider theme={darkTheme}>
            <Container style={{ textAlign: "center" }}>
                <Typography variant="h4" style={{ margin: 18, fontFamily: "Montserrat" }}>
                    Cryptocurrency Prices by Market Cap
                </Typography>
                <TextField 
                    label="Search for a Cryptocurrency..." 
                    variant='outlined'
                    style={{
                        marginBottom: 20,
                        width: "100%"
                    }}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <TableContainer>
                    {
                        loading ? (
                            <LinearProgress style={{ backgroundColor: "rgb(23, 255, 197)"}} />
                        ) : (
                            <Table>
                                <TableHead style={{ backgroundColor: "rgb(23, 255, 197)"}}>
                                    <TableRow>
                                        {["Coin", "Price", "24h Change", "Market Cap"].map((head) => (
                                            <TableCell 
                                                key={head} 
                                                style={{ 
                                                    color: "black", 
                                                    fontWeight: "bold",
                                                    fontFamily: "Montserrat"
                                                }}
                                                align={head === "Coin" ? "" : "right"}
                                            >
                                                {head}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {handleSearch().slice((page - 1) * 10, (page - 1 ) * 10 + 10).map(row => {
                                        const profit = row.price_change_percentage_24h > 0;
                                        return (
                                            <TableRow key={row.name}>
                                                <TableCell 
                                                    component='th' 
                                                    scope='row'
                                                >   
                                                    <Link to={`/coins/${row.id}`}>
                                                        <div 
                                                            style={{
                                                                display: 'flex',
                                                                gap: 15
                                                            }}
                                                        >
                                                            <img
                                                                src={row.image}
                                                                alt={row.name}
                                                                height="50"
                                                                style={{marginBottom: 10}}
                                                            />
                                                            <div style={{display: "flex", flexDirection: "column"}}>
                                                                <span
                                                                    style={{
                                                                        textTransform: "uppercase",
                                                                        fontSize: 22
                                                                    }}
                                                                >
                                                                    {row.symbol}
                                                                </span>
                                                                <span style={{color: "darkgrey"}}>
                                                                    {row.name}
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </Link>
                                                </TableCell>
                                                <TableCell
                                                    align="right"
                                                >
                                                    {symbol}{" "}
                                                    {numberWithCommas(row.current_price.toFixed(2))}
                                                </TableCell>
                                                <TableCell
                                                    align="right"
                                                    style={{
                                                        color: profit > 0 ? "green": "red",
                                                        fontWeight: "bold"
                                                    }}
                                                >
                                                    {profit && "+"}
                                                    {row.price_change_percentage_24h.toFixed(2)}%
                                                </TableCell>
                                                <TableCell
                                                    align="right"
                                                >
                                                    {symbol}{" "}
                                                    {numberWithCommas(row.market_cap.toString().slice(0, -6))}
                                                    {" "}M
                                                </TableCell>
                                            </TableRow>
                                        )
                                    })}
                                </TableBody>
                            </Table>
                        )
                    }
                </TableContainer>
                <Pagination 
                    style={{
                        padding: 20,
                        width: "100%",
                        display: "flex",
                        justifyContent: "center",
                    }}
                    count={(handleSearch()?.length / 10).toFixed(0)}
                    onChange={(_, value) => {
                        setPage(value);
                        window.scroll(0, 450);
                    }}
                />
            </Container>
        </ThemeProvider>
    )
}

export default CoinsTable