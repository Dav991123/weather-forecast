/**
 * API_URL
 */
export const API_URL = 'https://api.openweathermap.org/data/2.5/';

/**
 * API_KEY
 */
export const API_KEY = 'fd48bdf8a8b87b3c140f17625f4e2d57'; 


/**
 * Icon_Weather
 */
export const Icon_Weather = 'http://openweathermap.org/img/w/'

/**
 *  Flag_Country
 */
export const Flag_Country = 'https://www.countryflags.io/'










// getWeather(e) {
//     e.preventDefault()
//     //get input value
//     const searchQuery = e.target.elements.city.value;

//     // Set loading to true, while we are fetching data from server
//     this.setState({ loading: true })
//      if(searchQuery) {
//         // we accept city information 
//         fetch(`${API_URL}forecast?q=${searchQuery}&appid=${API_KEY}&units=metric`)
//         .then(response => response.json())
//         .then(data => {
//             const { country, name, population } = data.city
//             this.setState({
//                 loading: false,
//                 country: country,
//                 city: name,
//                 population: population,
//                 searchResultsList: data.list,
//             })
//         })
//         .catch(error => {
//             // Show error message, if request fails and set loading to false
//             this.setState({
//                 loading: false
//             })
//         })
//      }else {
//          this.setState({
//              loading: false
//          })
//      }  
// }





// let x = new Date(item.dt).getDay();
// if(timeConverter(item.dt, true).slice(-2) === '13') {
//    return (
//        <div 
//             key={item.dt}
//             onClick={()=> {
//                 searchResultsList.filter((elem) => {
//                     console.log(timeConverter(item.dt) == )
//                 }) 
//             }}
//         >
//            {timeConverter(item.dt,false)}
//         </div>   
//    )
// }      






// console.log(item)
// let newDate = new Date(item.dt * 1000).getUTCDate();

// if(date !== newDate){
//     date = newDate;
//     return(
//         <div 
//             key={item.dt}
//             onClick={()=> this.props.history.push(`/${timeConverter(item.dt)}`)}
//         >
//         {item.dt_txt}
//         </div>
//     )
// }else{
//     return ''
// }










