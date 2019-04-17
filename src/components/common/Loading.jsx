import React from 'react';
import './Loading.css';

const Loading = () => {
  return (
    <div className="loader">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
    </div>
  );
};
export default Loading;























// import React from 'react';
// import PropTypes from 'prop-types';
// import './Loading.css';

// const Loading = (props) => {
//   const { width, height } = props;

//   return (
//     <div
//       className="Loading"
//       style={{ width, height }}
//     />
//   );
// };

// Loading.propTypes = {
//   width: PropTypes.string,
//   height: PropTypes.string,
// };

// Loading.defaultProps = {
//   width: '80px',
//   height: '80px',
// };

// export default Loading;
