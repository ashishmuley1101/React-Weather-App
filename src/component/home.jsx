import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css"
import { useState } from "react";
import './home.scss';
import bgPic from '../assets/weather8.jpg';
import { Box, Button, Card, CardActionArea, CardContent, CardMedia, FormControl, Stack, Divider } from "@mui/material";
import logo from '../assets/weather-icon.png';

function Home() {

    const apiKey = "f56f24967aaf51182d1d4df628297c6d"
    const apiKey1 = "3c37811c8958bac762ef6dac03e7a2ac"
    const [inputCity, setInputCity] = useState("")
    const [data, setData] = useState([])
    const [newData, setNewData] = useState([])
    const [daily, setDaily] = useState([])

    const getWetherDetails = (cityName) => {
        if (!cityName) return
        const apiURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + apiKey1 + "&units=metric"
        axios.get(apiURL).then((res) => {
            console.log("data : ", res.data)
            console.log("logituded", res.data.coord.lon)
            console.log("latitude", res.data.coord.lat)
            setData(res.data)
            console.log("data", data)
            const newLat = res.data.coord.lat
            const newLon = res.data.coord.lon
            console.log("New lat", newLat)
            console.log("New lon", newLon)
            getWetherDetailsComplete(newLat, newLon)
        }).catch((err) => {
            console.log("err", err)
        })
    }

    const handleChangeInput = (e) => {
        console.log("value", e.target.value)
        setInputCity(e.target.value)
    }

    const handleSearch = () => {
        getWetherDetails(inputCity)
    }

    const getWetherDetailsComplete = (newLat, newLon) => {
        const newApiURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" + newLat + "&lon=" + newLon + "&appid=" + apiKey + "&units=metric&lang=en"
        fetch(newApiURL).then((res) => res.json()).then((json) => {
            console.log("newDate : ", json)
            console.log("newDate : ", json.daily)

            setNewData(json)
            setDaily(json.daily)
            console.log("New", daily)
        }).catch((err1) => {
            console.log("Error", err1)
        })
    }

    const handleDate = (e) => {
        let day = new Date((e) * 1000)
        console.log(day.toDateString())

        return (day.toDateString())
    }

    const readySRC = (e) => {
        let temp = "http://openweathermap.org/img/wn/".concat(e);
        return temp.concat("@2x.png");
    }

    return (

        <div >

            <img src={bgPic} height="800px" width="1000px" alt="No" />

            <div className="text-on-image">
                <h1>Welcome to Weather App</h1>&nbsp;&nbsp;&nbsp;&nbsp;
                <input type='text'
                    placeholder="Enter city name..."
                    name='city'
                    value={inputCity}
                    onChange={handleChangeInput}
                    style={{
                        width: '35%', height: '40%',
                        fontSize: '18px',
                        position: "absolute", bottom: -40, left: "33%", color: "black", paddingRight: "40px"
                    }}
                />
                <Button type="sumit" name="city" color="info" variant="contained" size="large"
                    style={{
                        textAlign: 'center',
                        fontSize: '16px',
                        position: "absolute", bottom: -115, left: "41%", color: "white", paddingRight: "25px"
                    }} onClick={handleSearch}
                >Search
                </Button>

            </div>

            <div className="wetherResultBox">

                <img src={logo}
                    height="50px" width="110px" alt="Nou"
                    style={{
                        position: "absolute", bottom: '138%', left: "3%", color: "white", paddingRight: "35px"
                    }}
                />

                <h1 value="delhi" style={{
                    fontSize: "30px", position: "absolute", bottom: '122%',
                    left: "0%", color: "white", paddingRight: "35px"
                }}>{data?.name}
                </h1>

                <h2 style={{
                    fontSize: "27px", position: "absolute", bottom: '107%',
                    left: "0%", color: "white", paddingRight: "35px"
                }}>{(data.length === 0 ? <h1> </h1> : <h2 style={{ fontSize: "27px" }}>{(data?.main?.temp)} °C </h2>)}
                </h2>
            </div>

            <div>
                <div className="wetherResultBox">

                    {Object.entries(daily).map((weather, index) => {

                        if (index >= 4) {
                            return;
                        }
                        return (

                            <Box sx={{

                                display: "inline-block",
                                flexWrap: "wrap",
                                alignContent: "stretch",
                                marginLeft: "-73%",
                                marginTop: "0px",
                                flexDirection: 'row',
                                justifyContent: 'center'

                            }}>

                                <Stack direction='row-reverse'>
                                    <Card sx={{
                                        height: "30%",
                                        flexDirection: 'block',
                                        flexWrap: "wrap",
                                        border: "2px solid",
                                        borderColor: "white",
                                        padding: "10px",
                                        background: "transparent",
                                        boxShadow: "10px 10px 10px rgba(0, 0, 0, 0.5)",
                                    }}
                                    >

                                        <FormControl>
                                            <CardActionArea>
                                                <CardMedia
                                                    component="img"
                                                    alt="green iguana"
                                                    paddingTop="10px"
                                                    height="100px"
                                                    weight="20px"
                                                    src={readySRC(newData?.daily[index]?.weather[0]?.icon)}

                                                />

                                                <CardContent className="text-al">
                                                    <h6 style={{ fontSize: "20px" }}> {handleDate(newData?.daily[index]?.dt)}</h6>
                                                    <h6>Min Temp. : {(newData?.daily[index]?.temp?.min)} °C</h6>
                                                    <h6>Max Temp. : {(newData?.daily[index]?.temp?.max)} °C</h6>
                                                    <h6>Humidity : {(newData?.daily[index]?.humidity)}%</h6>
                                                    <h6>Pressure : {(newData?.daily[index]?.pressure)}  hPa</h6>
                                                    <h6>Wind : {(newData?.daily[index]?.wind_speed)} m/s</h6>

                                                </CardContent>
                                            </CardActionArea>
                                        </FormControl>
                                    </Card></Stack>
                            </Box>
                        );
                    })}
                </div>
            </div>
        </div >
    );
}

export default Home