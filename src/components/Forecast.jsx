import React from 'react';
import { timeConverter } from '../helpers';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import './Forecast.css';

const Forecast = (props) =>  {
    const { forecastResults, city } = props;
    let date = null;
    let count = 0;
    return (
        <> {/*<-----There is a new, shorter syntax you can use for declaring fragments. It looks like empty tags: */}
            { city && forecastResults &&
                forecastResults.map(item => {
                    let newDate = new Date(item.dt * 1000).getUTCDate();
                    if(date !== newDate && count < 5) {
                        date = newDate;
                        count +=1
                        return (
                            <NavLink 
                                key={item.dt} 
                                className="five-day-weather"
                                activeClassName='selectide'
                                to={`/${city}/${timeConverter(item.dt)}`}
                          
                            >
                                <header className="forecast-header"> 
                                     {timeConverter(item.dt)}
                                 </header>  

                                <div className="forecast-content">

                                    <span className="forecast-icon">
                                        <img
                                            src={`http://openweathermap.org/img/w/${item.weather[0].icon}.png`} 
                                            alt={item.weather[0].description}
                                        />
                                    </span>

                                    <h2 className="degree">
                                        {Math.round(item.main.temp)} C
                                    </h2>


                                    <span className="humidity">
                                         <i className="fa fa-tint" aria-hidden="true"></i>  {item.main.humidity}%
                                    </span>


                                    <span className="description">
                                        {item.weather[0].description}
                                    </span>

                                </div>
                            </NavLink>    
                        )
                    }
                    return '' //
                })
            }
        </>
    )
}
Forecast.propTypes = {
    forecastResults: PropTypes.array.isRequired
}
export default Forecast;