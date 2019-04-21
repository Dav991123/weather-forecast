import React from 'react';
import './Search.css';
const Search = (props) => {
    const { handleChange } = props;

    // Write the name of the city
    return (
        <form onSubmit={handleChange}>
            <input 
                type="text" 
                name='city' 
                placeholder="Write the name of the city"
            />
        </form>
    )
}
export default Search