import React from 'react'
import parse from 'html-react-parser';
import { useParams } from 'react-router-dom'
import { styled } from '@mui/material/styles';
import CryptoContext from '../CryptoContext';
import { SingleCoin } from '../config/api';
import CoinInfo from '../components/CoinInfo/CoinInfo';
import axios from 'axios';
import { LinearProgress, Typography } from '@mui/material';
import { numberWithCommas } from '../components/Banner/Carousel';


const InfoContainer = styled('div')(({theme}) => ({
  display: "flex",
  [theme.breakpoints.down("md")]: {
    flexDirection: "column",
    alignItems: "center"
  }
}))


const SidebarContainer = styled('div')(({theme}) => ({
  width: "30%",
  [theme.breakpoints.down("md")]: {
    width: "100%",
  },
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  marginTop: 25,
  borderRight: "2px solid grey"
}))


const MarketData = styled('div')(({theme}) => ({
  alignSelf: "start",
  padding: 25,
  paddingTop: 10,
  width: "100%",
  [theme.breakpoints.down("md")]: {
    display: "flex",
    justifyConte: "space-around"
  },
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
    alignItems: "center"
  },
  [theme.breakpoints.down("xs")]: {
    alignItems: "start"
  }
}))


const CoinPage = () => {
  const {id} = useParams();
  const [coin, setCoin] = React.useState();

  const { currentCurrency, symbol } = React.useContext(CryptoContext);

  const fetchSingleCoin = async () => {
    const { data } = await axios.get(SingleCoin(id));
    setCoin(data);
  }

  React.useEffect(() => {
    fetchSingleCoin();
  }, [])

  if (!coin) return <LinearProgress style={{ backgroundColor: "rgb(23, 255, 197)"}} />

  return (
    <InfoContainer>
      <SidebarContainer>
        <img
          src={coin?.image.large}
          alt={coin?.name}
          height="200"
          style={{marginBottom: 20}} 
        />
        <Typography
          variant="h3"
          style={{
            fontWeight: "bold",
            marginBottom: 20,
            fontFamily: "Montserrat"
          }}
        >
          {coin?.name}
        </Typography>
        <Typography
          variant="subtitle1"
          style={{
            width: "100%",
            fontFamily: "Montserrat",
            padding: 25,
            paddingBottom: 15,
            paddingTop: 0,
            textAlign: "justify"
          }}
        >
          {parse(coin?.description.en.split(". ")[0])}.
        </Typography>
        <MarketData>
          <span
            style={{
              display: "flex"
            }}
          >
            <Typography
              variant="h5"
              style={{
                fontWeight: "bold",
                marginBottom: 20,
                fontFamily: "Montserrat"
              }}
            >
              Rank:
            </Typography>
            &nbsp; &nbsp;
            <Typography
              variant="h5"
              style={{
                fontFamily: "Montserrat"
              }}
            >
              {coin?.market_cap_rank}
            </Typography>
          </span>

          <span
            style={{
              display: "flex"
            }}
          >
            <Typography
              variant="h5"
              style={{
                fontWeight: "bold",
                marginBottom: 20,
                fontFamily: "Montserrat"
              }}
            >
              Current Price:
            </Typography>
            &nbsp; &nbsp;
            <Typography
              variant="h5"
              style={{
                fontFamily: "Montserrat"
              }}
            >
              {symbol}{" "}
              {numberWithCommas(
                coin?.market_data.current_price[currentCurrency.toLowerCase()]
              )}
            </Typography>
          </span>

          <span
            style={{
              display: "flex"
            }}
          >
            <Typography
              variant="h5"
              style={{
                fontWeight: "bold",
                marginBottom: 20,
                fontFamily: "Montserrat"
              }}
            >
              Market Cap:
            </Typography>
            &nbsp; &nbsp;
            <Typography
              variant="h5"
              style={{
                fontFamily: "Montserrat"
              }}
            >
              {symbol}{" "}
              {numberWithCommas(
                coin?.market_data.market_cap[currentCurrency.toLowerCase()]
                  .toString()
                  .slice(0, -6)
              )}
              {" M"}
            </Typography>
          </span>

        </MarketData>
      </SidebarContainer>
        {/* Chart */}
        <CoinInfo coin={coin} />
    </InfoContainer>
  )
}

export default CoinPage