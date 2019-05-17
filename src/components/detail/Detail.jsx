import React from 'react';
import { API_URL, API_KEY } from '../../config';
import './Detail.css';
class Detail extends React.Component {
    constructor() {
        super();
        this.state = {
            forecastResults:[],
        }
        this.fetchForecast = this.fetchForecast.bind(this);
    }

    componentDidMount() {
        const city = this.props.match.url.match(/\/[A-Za-z]{1,}\//)[0].replace(/\//g, '');
        this.fetchForecast(city)
    }  

    componentWillReceiveProps(nextProps) {
        if(this.props.location.pathname !== nextProps.location.pathname) {
            const city = nextProps.match.url.match(/\/[A-Za-z]{1,}\//)[0].replace(/\//g, '');
            this.fetchForecast(city);
        }
    }

    fetchForecast(cityName) {
        // Set loading to true, while we are fetching data from server
        this.setState({ loading: true});
        fetch(`${API_URL}forecast?q=${cityName}&appid=${API_KEY}&units=metric`)
        .then((resp) => {
            return resp.json()
        })
        .then((data) => {
            this.setState({
                forecastResults: data.list,
                loading: false,
             })
        })
        .catch((err) => {
            this.setState({
                error: err,
                loading: false
            })
        });
    }

      render() {
        const { forecastResults } = this.state;
        const forecastId = this.props.match.params.id;

        return (
            <div className="detail-container">
                {
                    forecastResults.map((item)=>  {
                       let hour = new Date(item.dt * 1000).getUTCHours();
                       
                       if(forecastId.slice(-2) ===  item.dt_txt.split(' ')[0].slice(-2)) {
                            return (
                                <div key={item.dt}>
                                    <header>
                                        <span className="hours">
                                             {hour}
                                         </span>   
                                    </header> 

                                    <span className="weather-icon">
                                        <img
                                            src={`http://openweathermap.org/img/w/${item.weather[0].icon}.png`} 
                                            alt={item.weather[0].description}
                                        />  
                                    </span>  

                                    <span className="weather-temp">
                                        {Math.round(item.main.temp)}
                                    </span>

                                    <span className="weather-humidity">
                                        <i className="fa fa-tint" aria-hidden="true"></i>  
                                        {item.main.humidity}%
                                    </span>

                                    <footer>
                                        {item.weather[0].description}
                                    </footer>
                                </div>    
                            )
                       }
                       return ''
                    })
                }
            </div>   
          )
      }
}
export default Detail