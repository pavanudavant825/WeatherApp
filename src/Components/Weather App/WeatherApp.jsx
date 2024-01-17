import React, { useEffect, useState } from 'react'
import './WeatherApp.css'
import search_icon from "../Assets/search.png"
import clear_icon from "../Assets/clear.png"
import cloud_icon from "../Assets/cloud.png"
import drizzle_icon from "../Assets/drizzle.png"
import rain_icon from "../Assets/rain.png"
import snow_icon from "../Assets/snow.png"
import wind_icon from "../Assets/wind.png"
import humidity_icon from "../Assets/humidity.png"


export const WeatherApp = () => {

    let api_key ="88bd79b9871ec15a3fc59c855644a845";

    const[wicon,setWicon]=useState(cloud_icon);

    const[datarray, setdatarray]=useState({});

    const[city,setcity]=useState('Pune')

    
    const search = async () =>{
        
        if(city !== ""){
            let url=`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=Metric&appid=${api_key}`;
            let response= await fetch(url);
            let data =await response.json();
            setdatarray(data); //refer w3school fetch api for this

            if(data.weather[0].icon==="01d"|| data.weather[0].icon==="01n")
            {
                setWicon(clear_icon);
            }
            else if(data.weather[0].icon==="02d"|| data.weather[0].icon==="02n")
            {
                setWicon(cloud_icon);
            }
            else if(data.weather[0].icon==="03d"|| data.weather[0].icon==="03n")
            {
                setWicon(drizzle_icon);
            }
            else if(data.weather[0].icon==="04d"|| data.weather[0].icon==="04n")
            {
                setWicon(drizzle_icon);
            }
            else if(data.weather[0].icon==="09d"|| data.weather[0].icon==="09n")
            {
                setWicon(rain_icon);
            }
            else if(data.weather[0].icon==="10d"|| data.weather[0].icon==="10n")
            {
                setWicon(rain_icon);
            }
            else if(data.weather[0].icon==="13d"|| data.weather[0].icon==="13n")
            {
                setWicon(snow_icon);
            }
            else
            {
                setWicon(clear_icon);
            }
        }      
    }
    useEffect(() => {
        search();
    }, [])

  return (
    <>
    <section className="main-card--container">
        <div className='container' key={datarray.id}>
        <div className='top-bar'>
            <input type="text" className="cityInput" placeholder="Enter City" onChange={event=>setcity(event.target.value)}/>
            <div className="search-icon" onClick={search}>
                <img src={search_icon} alt="" />
            </div>
        </div>
        <div className='weather-image'>
            <img src={wicon} alt=""/>
        </div>
        <div className="weather-temp">{datarray.main? <span>{Math.round(datarray.main.temp)} °C</span>:null}</div>
        <div className="weather-location">{datarray.name}</div>
        <div className="data-container">
            <div className="element">
                <img src={humidity_icon} alt="" className='icon'/>
                <div className="data">
                    <div className="humidity-percent">{datarray.main? <span>{Math.round(datarray.main.humidity)} %</span>:null}</div>
                    <div className="text">Humidity</div>
                </div>
            </div>
            <div className="element">
                <img src={wind_icon} alt="" className='icon'/>
                <div className="data">
                    <div className="wind-rate">{datarray.main? <span>{datarray.wind.speed} km/hr</span>:null}</div>
                    <div className="text">Wind Speed</div>
                </div>
            </div>
        </div>
    </div>
    </section>
 </>          
    )
    }

    export default WeatherApp


// const humidity =document.getElementsByClassName("humidity-percent");
        // const wind =document.getElementsByClassName("wind-rate");
        // const temperature=document.getElementsByClassName("weather-temp");
        // const location=document.getElementsByClassName("weather-location");

        // humidity[0].innerHTML = data.main.humidity+" %";
        // wind[0].innerHTML = Math.floor(data.wind.speed)+" km/h";
        // temperature[0].innerHTML = Math.floor(data.main.temp)+"°C";
        // location[0].innerHTML = data.name;