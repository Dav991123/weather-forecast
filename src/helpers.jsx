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
