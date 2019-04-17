import React from 'react';

const daysMap = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
const monthsMap = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec']

export const timeConverter = (UNIX_timestamp ) => {
        const date = new Date(UNIX_timestamp * 1000);
        const day = daysMap[date.getDay()]
        const month = monthsMap[date.getMonth()] + '-' + date.getDate();
        return `${day}-${month}`
}


export const getWeekday = () => {
        const date = new Date();
        return  ( 
        <div>
            <span>{daysMap[date.getDay()]}</span> 
            <b>{monthsMap[date.getMonth()]} {date.getDate()}</b>
        </div>
        )
}




// import React from 'react';
// import { API_URL } from '../../config';
// import { API_KEY } from '../../config';


// class Detail extends React.Component {
//     constructor() {
//         super();
//         this.state = {
//             loading: false,
//             forecastResults:[],
//         }
        
//     }
//     componentDidMount() {
//         const currencyId = this.props.match.params.id;
//         console.log(currencyId)
//         // Set loading to true, while we are fetching data from server
//        this.setState({ loading: true});
   
//        const  getLocation = () => {
//            if (navigator.geolocation) {
//              navigator.geolocation.getCurrentPosition(showPosition); //--get user geolocation
//            } else { 
//              this.setState({
//                  error: 'Geolocation is not supported by this browser.' // Oooops
//              })
//            }
//        }
//        const showPosition = (position) => {
//            const Latitude = position.coords.latitude;
//            const Longitude = position.coords.longitude;
//            //get country & city information
//            fetch(`${API_URL}forecast?lat=${Latitude}&lon=${Longitude}&appid=${API_KEY}&units=metric`)
//            .then((resp)=> {
//                 return resp.json()
//            })
//            .then(forecast => {
//                console.log(forecast)
//            })
   
//        }
   
//        getLocation();
//    }
//       render() {
          
//           return (
//             <div>
                
//             </div>   
//           )
//       }
// }
// export default Detail