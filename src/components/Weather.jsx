import React from 'react';
import Loading from './common/Loading';
import NotFound from './notFound/NotFound';
import { API_URL, API_KEY } from '../config';
import { getWeekday } from '../helpers'
import { Link } from 'react-router-dom';
import Forecast from './Forecast';

import './Weather.css';
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
            error: '',
        }
    }

 componentDidMount() {
     // Set loading to true, while we are fetching data from server
    this.setState({ loading: true});

    const  getLocation = () => {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(showPosition); //--get user geolocation
        } else { 
          this.setState({
              error: 'Geolocation is not supported by this browser.' // Oooops
          })
        }
    }
    const showPosition = (position) => {
        const Latitude = position.coords.latitude;
        const Longitude = position.coords.longitude;
        //get country & city information
        

        Promise.all([
            // Fetch forecast & weather  data from API https://api.openweathermap.org/data/2.5/
            fetch(`${API_URL}forecast?lat=${Latitude}&lon=${Longitude}&appid=${API_KEY}&units=metric`),
            fetch(`${API_URL}weather?lat=${Latitude}&lon=${Longitude}&appid=${API_KEY}&units=metric`)
          ]).then(async([forecast, weather]) => {
            //   console.log(aa)
            const respForecast = await forecast.json();
            const respWeather = await weather.json();
            return [respForecast, respWeather]
          })
          .then(data => {
            const forecast = data[0];
            const weather = data[1];

            this.setState({
                city: weather.name,
                country: weather.sys.country,
                temp: weather.main.temp,
                weather: weather.weather[0],
                dt: weather.dt,
                humidity: weather.main.humidity,
                forecastResults: forecast.list,
                loading: false,
            })
            document.title  = `${this.state.city}, ${this.state.country}`

          }).catch((err) => {
            // Show error message, if request fails and set loading to false
            this.setState({
                error: 'rejected',
                loading: false
            })
          });

    }
    getLocation();
}


    render() {
     const { city, country, temp, weather, humidity, loading, error, forecastResults } = this.state;
    // Render only loading component, if it's set to true 
     if(loading) {
        return <div className="loading-container"><Loading /></div>
     }
     if(error) {
        return <div className="error-container">
                    <NotFound error={error}/>  
               </div>
     }


   return (
        <section className="weather">
            <Link 
                className="present-weather"
                to="/"
            >

                <header className="forecast-header present"> 
                    {getWeekday()}
                </header>  

                <div className="weather-content">
                    <h3 className="location">{city}, {country}</h3>
                    <div className="degree">
                        <h2 className="num">{Math.round(temp)} C</h2>
                        <span>
                            <img 
                                src={`http://openweathermap.org/img/w/${weather.icon}.png`} 
                                alt={weather.main}
                                title={weather.description}
                            />
                        </span>
                    </div>    
                </div>

                <div className="procedure">
                    <span> <i className="fa fa-tint" aria-hidden="true"></i>  {humidity}% </span>
                    <span className="weather-description">{weather.description}</span>
                </div>
            </Link>
            <Forecast 
                forecastResults={forecastResults}
            />
        </section>    
        )
    }
}
export default Weather