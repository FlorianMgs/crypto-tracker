import React from 'react'
import CryptoContext from '../../CryptoContext'
import axios from 'axios'
import { HistoricalChart } from '../../config/api'
import { CircularProgress, createTheme, ThemeProvider } from '@mui/material'
import { styled } from '@mui/material/styles';
import { Line } from "react-chartjs-2";
import {Chart as ChartJS, LineElement, PointElement, LinearScale, Title, CategoryScale } from "chart.js";
import { chartDays } from '../../config/data'
import SelectButton from '../../components/SelectButton'


ChartJS.register(LineElement, PointElement, LinearScale, Title, CategoryScale);


const ChartContainer = styled('div')(({theme}) => ({
    width: "75%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: 25,
    padding: 40,
    [theme.breakpoints.down("md")]: {
        width: "100%",
        marginTop: 0,
        padding: 20,
        paddingTop: 0
    }
}))


function CoinInfo({coin}) {

    const darkTheme = createTheme({
        palette: {
          mode: 'dark',
        },
    });

    const [historicalData, setHistoricalData] = React.useState([])
    const [days, setDays] = React.useState(1)

    const {currentCurrency, symbol} = React.useContext(CryptoContext)

    const fetchHistoricalData = async () => {
        const { data } = await axios.get(
            HistoricalChart(coin.id, days, currentCurrency)
        )
        setHistoricalData(data.prices)
    }

    React.useEffect(() => {
        fetchHistoricalData()
    }, [currentCurrency, days])

    return (
        <ThemeProvider theme={darkTheme}>
            <ChartContainer>
                {
                    !historicalData ? (
                        <CircularProgress 
                            style={{color: "rgb(23, 255, 197)"}}
                            size={250}
                            thickness={1}
                        />
                    ) : (
                            <div style={{ height: "100%", width: "100%" }}>
                                <Line
                                    data={{
                                        labels: historicalData.map((coin) => {
                                        let date = new Date(coin[0]);
                                        let time =
                                            date.getHours() > 12
                                            ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                                            : `${date.getHours()}:${date.getMinutes()} AM`;
                                        return days === 1 ? time : date.toLocaleDateString();
                                        }),

                                        datasets: [
                                        {
                                            data: historicalData.map((coin) => coin[1]),
                                            label: `Price ( Past ${days} Days ) in ${currentCurrency}`,
                                            borderColor: "rgb(23, 255, 197)",
                                        },
                                        ],
                                    }}
                                    options={{
                                        elements: {
                                            point: {
                                                radius: 1,
                                            },
                                        },
                                    }}
                                />
                                <div
                                    style={{
                                        display: "flex",
                                        marginTop: 20,
                                        justifyContent: "space-around",
                                        width: "100%"
                                    }}
                                >
                                    {chartDays.map((day) => (
                                        <SelectButton 
                                            key={day.value}
                                            onClick={() => setDays(day.value)}
                                            selected={day.value === days}
                                        >
                                            {day.label}
                                        </SelectButton>
                                    ))} 
                                </div>
                            </div>
                    )
                }
            </ChartContainer>
        </ThemeProvider>
    )
}

export default CoinInfo