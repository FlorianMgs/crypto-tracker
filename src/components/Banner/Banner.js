import "./Banner.css"
import React from 'react'
import Carousel from "./Carousel"
import { Container } from '@mui/system'
import { Typography } from "@mui/material"


const bannerContainerStyle = {
    height: 400,
    display: 'flex',
    flexDirection: 'column',
    paddingTop: 25,
    justifyContent: 'space-around'
}

const taglineStyle = {
    display: 'flex',
    height: '40%',
    flexDirection: 'column',
    justifyContent: 'center',
    textAlign: 'center'
}


const carouselStyle = {
    height: '50%',
    display: 'flex',
    alignItems: 'center'
}


const Banner = () => {
  return (
    <div className="banner">
        <Container 
            className="banner__content"
            style={bannerContainerStyle}
        >
            <div className="tagline" style={taglineStyle}>
                <Typography
                    variant='h2'
                    style={{
                        fontWeight: "bold",
                        marginBottom: 15,
                        fontFamily: "Montserrat"
                    }}
                >
                    Crypto Tracker
                </Typography>
                <Typography
                    variant="subtitle2"
                    style={{
                        color: "darkgrey",
                        textTransform: "capitalize",
                        fontFamily: "Montserrat"
                    }}
                >
                    Get all the info regarding your favorite Cryptocurrencies
                </Typography>
            </div>
            <Carousel style={carouselStyle} />
        </Container>
    </div>
  )
}

export default Banner