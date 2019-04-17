import React from 'react';
import './NotFound.css';
const errorType = {
  rejected: 'Oops! Something went Wrong. Try Again',
  page: 'Oops! Page not found'

}
const NotFound = (props) => {
  const { error } = props
  return (
    <div>
      {
        error === 'rejected' &&    <h1 className="NotFound-title">{errorType.rejected}</h1>
      }
      {
        error === 'page' && <h1 className="NotFound-title">{errorType.page}</h1>
      }
    </div>
  );
}

export default NotFound;
