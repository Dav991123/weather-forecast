import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Weather from './components/Weather';
// import NotFound from './components/notFound/NotFound.jsx'; 
import Detail from './components/detail/Detail.jsx';
const App = () => {
      return (
        <div className="weather-container">
            <BrowserRouter>
                <React.Fragment>
                    <Weather/>
                    <Switch>
                         <Route exact path="/forecast/:id" component={Detail} /> 
                    </Switch>  
                </React.Fragment>
            </BrowserRouter>
        </div>
      );
    }
export default App