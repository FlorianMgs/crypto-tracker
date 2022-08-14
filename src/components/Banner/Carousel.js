import axios from 'axios'
import React from 'react'
import { Link } from 'react-router-dom'
import { TrendingCoins } from '../../config/api'
import { useContext } from 'react'
import CryptoContext from '../../CryptoContext'
import AliceCarousel from 'react-alice-carousel'


export function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}


const carouselItemStyle = {
    fontFamily: 'Montserrat',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    cursor: 'pointer',
    textTransform: 'uppercase',
    color: 'white'
}


const Carousel = () => {
    const [trendingCoins, setTrendingCoins] = React.useState([]);
    const {currentCurrency, symbol} = useContext(CryptoContext);

    const fetchTrendingCoins = async () => {
        const { data } = await axios.get(
            TrendingCoins(currentCurrency)
        )
        setTrendingCoins(data);
    }

    React.useEffect(() => {
        fetchTrendingCoins();
    }, [currentCurrency])


    const items = trendingCoins.map((coin) => {
        let profit = coin.price_change_percentage_24h >= 0;

        return (
            <Link to={`/coins/${coin.id}`} style={carouselItemStyle}>
                <img src={coin.image} alt={coin.name} height="80" style={{marginBottom: 10}} className="carousel-img" />
                <span>
                    {coin.symbol}
                    &nbsp;
                    <span
                        style={{
                            color: profit ? 'green' : 'red',
                            fontWeight: 500
                        }}
                    >
                        {profit && '+'}{coin.price_change_percentage_24h.toFixed(2)}%
                    </span>
                </span>
                <span style={{fontSize: 22, fontWeight: 500}}>
                    {symbol} {numberWithCommas(coin.current_price.toFixed(2))}
                </span>
            </Link>
        )
    })

    const responsive = {
        0: { items: 2 },
        512: { items: 4 },
    }


    return (
        <div className="carousel">
            <AliceCarousel 
                mouseTracking
                infinite
                autoPlayInterval={1000}
                animationDuration={1500}
                disableDotsControls
                disableButtonsControls
                responsive={responsive}
                autoPlay
                items={items}
            />
        </div>
    )
}

export default Carousel