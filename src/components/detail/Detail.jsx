import React from 'react';
import { API_URL, API_KEY } from '../../config';
import { timeConverter } from '../../helpers';
import Loading from '../common/Loading';
import './Detail.css';
class Detail extends React.Component {
    constructor() {
        super();
        this.state = {
            loading: false,
            forecastResults:[],
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
            
                fetch(`${API_URL}forecast?lat=${Latitude}&lon=${Longitude}&appid=${API_KEY}&units=metric`)
                .then((resp) => {
                    return resp.json()
                 })
                .then((data) => {
                    this.setState({
                        forecastResults: data.list,
                        loading: false,
                })
              }).catch((err) => {
                this.setState({
                    error: 'rejected',
                    loading: false
                })
              });
        }
    
        getLocation();
        
   }
      render() {
        const currencyId = this.props.match.params.id;
        const { forecastResults, loading, error } = this.state;
        if(loading) {
            return <div className="loading-container">
                        <Loading width="30px" height="30px" />
                    </div>
        }
        if(error) {
            return <div></div>
        }
          return (
            <div className="detail-container">
                {
                    forecastResults.map((item)=>  {
                       let hour = new Date(item.dt * 1000).getUTCHours();
                       if(timeConverter(item.dt) ===  currencyId) {
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