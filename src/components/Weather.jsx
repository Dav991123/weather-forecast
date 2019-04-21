import React from 'react';
import Loading from './common/Loading';
import { API_URL, API_KEY } from '../config';
import { getWeekday } from '../helpers'
import { Link } from 'react-router-dom';
import Forecast from './Forecast';
import './Weather.css';
import Search from './common/Search';

class Weather extends React.Component {
    constructor() {
        super();
        this.state = {
            city: '',
            country: '',
            temp: '',
            weather: [],
            dt: 0,
            humidity: '',
            loading: false,
            forecastResults:[],
            coord: {},
            error: '',
        }
        this.handleChange = this.handleChange.bind(this);
        this.fetchWeatherForecast = this.fetchWeatherForecast.bind(this);
    }


 componentDidMount() {
     // Set loading to true, while we are fetching data from server
    this.setState({ loading: true});

    if(navigator.geolocation) {  //if geolocation turned on get position
        navigator.geolocation.getCurrentPosition((position)=> {
            //get user geolocation [Latitude, Longitude]
            const Latitude = position.coords.latitude; 
            const Longitude = position.coords.longitude;
            const forecast = `${API_URL}forecast?lat=${Latitude}&lon=${Longitude}&appid=${API_KEY}&units=metric`;
            const weather = `${API_URL}weather?lat=${Latitude}&lon=${Longitude}&appid=${API_KEY}&units=metric`;
            this.fetchWeatherForecast(forecast, weather) //get forecast end weather data
        })
    }else {
        this.setState({
            error: 'Geolocation is not supported by this browser.' 
        })
    }
}



handleChange(event) {
    event.preventDefault();
    const city = event.target.elements.city.value;
     // If search city isn't present, don't send request to server
    if(!city) {
        this.setState({ error: 'Please enter the city name' })
        return false
    }
    
    const forecast = `${API_URL}forecast?q=${city}&appid=${API_KEY}&units=metric`;
    const weather = `${API_URL}weather?q=${city}&appid=${API_KEY}&units=metric`;
    this.fetchWeatherForecast(forecast, weather) //get city date
}


fetchWeatherForecast(url1, url2) {
    Promise.all([
        fetch(url1).then(resp => resp.json()),
        fetch(url2).then(resp => resp.json())
    ])
    .then(data => {
        const forecast = data[0];
        const weather = data[1];
        console.log(weather)
        this.setState({
            city: weather.name,
            country: weather.sys.country,
            temp: weather.main.temp,
            weather: weather.weather[0],
            dt: weather.dt,
            humidity: weather.main.humidity,
            forecastResults: forecast.list,
            loading: false,
            coord: weather.coord,
            error: ''
        })
        document.title  = `${this.state.city}, ${this.state.country}`;
    })
    .catch((err) => {
        // Show error message, if request fails and set loading to false
        this.setState({
            error: 'The requested URL/error was not found this server',            
            loading: false
        })
        console.log(err)
    })
}




    render() {
     const { city, country, temp, weather, humidity, loading, error, forecastResults, coord } = this.state;
     if(loading) {
        return <div className="loading-container"><Loading /></div>
     }

    
   return (
       <div>
           {/*  geolocation [lat, lon] end weather flag */}
           <span className="geo-gords">
                Geo coords
                <span>
                    [ { coord.lon }, { coord.lat } ]
                </span>
           </span>

            {/* search city name  /form compnent/ */}
           <Search 
                handleChange={this.handleChange}
                error={error}
           />
           
           {/* error tag error The letter is posted here */}
           <p className="error-message">{error}</p>

        {/* present and 5 day / 3 hour forecast information */}
        <section className="weather">
        { city &&


            // present weather 
            <Link  className="present-weather" to="/">

                <header className="forecast-header present"> 
                    {getWeekday()}  {/* date info  day of week end month*/}
                </header>  

                <div className="weather-content">
                    <h3 className="location">{city}, {country}</h3> {/*state and city name*/}
                    <div className="degree">
                        <h2 className="num">{Math.round(temp)} C</h2> {/*city temperature*/}
                    </div>    
                </div>


                <div className="procedure">
                    <span> <i className="fa fa-tint" aria-hidden="true"></i>  {humidity}% </span> {/*air humidity*/}
                    <span className="weather-description">{weather.description}</span> {/*temp description*/}
                </div>

            </Link>
            }

            {/* 5 day / 3 hour forecast list */}
            <Forecast 
                forecastResults={forecastResults}
                city={city}
                country={country}
            />

        </section>  
        </div>
        )
    }
}
export default Weather
